import prisma from './client.js';
import { encryptPassword } from '../utils/passwordHasher.js';
import { validateName, validatePhone, validateEmail, validatePassword, validateAddresses} from '../utils/validators.js';


export async function createUser(reqData, res) {
    const { firstName, lastName, phoneNumber, role, email, password, addresses } = reqData;

    if (!firstName || !email || !password) {
        return res.status(400).json({ error: 'First name and Email are required.' });
    }

    if (firstName || lastName) {
        if (!validateName(firstName, lastName)) {
            return res.status(400).json({ error: 'Name must not contain numbers.' });
        }
    }

    if (phoneNumber && !validatePhone(phoneNumber)) {
        return res.status(400).json({ error: 'Phone number must be a 10-digit number.' });
    };

    if (email && !validateEmail(email)) {
        return res.status(400).json({ error: 'Invalid email format.' });
    }

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
        return res.status(400).json({ error: 'Email already exists.' });
    }

    if (!validatePassword(password)) {
        return res.status(400).json({ error: 'Password must be at least 8 characters and include uppercase, lowercase, and a number.' });
    }

    if (addresses) {
        const addressValidation = validateAddresses(addresses);
        if (!addressValidation.valid) {
            return res.status(400).json({ error: `Invalid address at index ${addressValidation.index}: ${addressValidation.field} is required.` });
        }
    }

    const hashedPassword = await encryptPassword(password);

    try {
        const user = await prisma.user.create({
            data: {
                firstName,
                lastName,
                phoneNumber,
                email,
                role,
                password: hashedPassword,
                homeAddress: {
                    create: addresses
                }
            }
        });

        const userWithAddress = await prisma.user.findUnique({
            where: { id: user.id },
            include: { homeAddress: true }
        });

        res.status(201).json({
            message: 'Buyer user created',
            user: {
                ...userWithAddress,
                phoneNumber: userWithAddress.phoneNumber ? userWithAddress.phoneNumber.toString() : null
            } });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}