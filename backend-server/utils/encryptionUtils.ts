const crypto = await import("node:crypto");

async function generateScryptKey(password: string, salt: string): Promise<Buffer> {
    return new Promise<Buffer>((resolve, reject) => {
        crypto.scrypt(password, salt, 32, (err, derivedKey) => {
            if (err) {
                reject(err);
            } else {
                resolve(derivedKey);
            }
        });
    });
}

function encryptText(
    text: string,
    iv: Buffer,
    key: Buffer,
    algorithm: string = "aes-256-cbc"
): string {
    const cipher = crypto.createCipheriv(algorithm, key, iv);
    let encryptedText = cipher.update(text, "utf8", "hex");
    encryptedText += cipher.final("hex");
    return encryptedText;
}

function decryptText(
    text: string,
    iv: Buffer,
    key: Buffer,
    algorithm: string = "aes-256-cbc"
): string {
    const decipher = crypto.createDecipheriv(algorithm, key, iv);
    let decryptedText = decipher.update(text, "hex", "utf8");
    decryptedText += decipher.final("utf8");
    return decryptedText;
}

async function hashPassword(password: string, salt: string): Promise<string> {
    return new Promise<string>((resolve, reject) => {
        crypto.pbkdf2(password, salt, 10000, 64, "sha512", (err, derivedKey) => {
            if (err) {
                reject(err);
            } else {
                resolve(derivedKey.toString("hex"));
            }
        });
    });
}

export { generateScryptKey, encryptText, decryptText, hashPassword };
