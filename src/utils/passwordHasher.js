import bcrypt from 'bcrypt';

// Encrypt (hash) the password
export async function encryptPassword(plainPassword) {
    const saltRounds = 10;
    return await bcrypt.hash(plainPassword, saltRounds);
}

// Compare (decrypt) the password
export async function verifyPassword(plainPassword, hashedPassword) {
    return await bcrypt.compare(plainPassword, hashedPassword);
}