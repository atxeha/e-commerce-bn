export function validateName(firstName, lastName) {
    const hasNumbers = /\d/;
    return !(hasNumbers.test(firstName) || hasNumbers.test(lastName)); // true = valid
}

export function validatePhone(phoneNumber) {
    return /^\d{10}$/.test(phoneNumber);
}


export function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

export function validatePassword(password) {
    // At least 8 characters, one uppercase, one lowercase, one number
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    return passwordRegex.test(password);
}

export function validateAddresses(addresses) {
    if (addresses && Array.isArray(addresses)) {
        for (const [i, addr] of addresses.entries()) {
            const requiredFields = ['barangay', 'city', 'province', 'zipCode', 'addressType'];
            for (const field of requiredFields) {
                if (!addr[field] || addr[field].toString().trim() === '') {
                    return { valid: false, index: i, field, reason: 'Addresses should be an array' };
                }
            }
        }
    }
    return { valid: true };
}

export function convertBigInt(obj) {
    return JSON.parse(JSON.stringify(obj, (key, value) =>
        typeof value === 'bigint' ? value.toString() : value
    ));
}