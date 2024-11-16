export const UPPERCASE_ENGLISH_LETTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

export function generateRandomString(length = 10, charset = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789") {
    let result = "";
    const charsetLength = charset.length;
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * charsetLength);
        result += charset[randomIndex];
    }
    return result;
}