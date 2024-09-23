import dotenv from "dotenv";
import mongoose, { Document, Schema } from "mongoose";
const crypto = await import("node:crypto");

dotenv.config();
// const encryptionKey = process.env.ENCRYPTION_KEY;
const encryptionKey = "3fba941e3fd5e156c03b2309e800d6d6f5182b04026a4fb29fffd90a2b2e5979";
import { generateScryptKey, encryptText, hashPassword } from "../utils/encryptionUtils";

// Define the schema for the Agent
interface AgentSchema extends Document {
    symbol: string;
    faction: string;
    password: string;
    encryptedToken: string;
    salt: string;
    iv: Buffer;
}

const agentSchema = new Schema<AgentSchema>({
    symbol: { type: String, required: true },
    faction: { type: String, required: true },
    password: { type: String, required: true },
    encryptedToken: { type: String, required: true },
    salt: { type: String },
    iv: { type: Buffer },
});

// Hash the password before saving it to the database
agentSchema.pre<AgentSchema>("save", async function (next: (error?: any) => void) {
    try {
        if (this.isModified("password")) {
            const salt = crypto.randomBytes(16).toString("hex");
            this.salt = salt;
            const hashedPassword = await hashPassword(this.password, salt);
            this.password = hashedPassword;
        }
        if (this.isModified("encryptedToken")) {
            const key = await generateScryptKey(encryptionKey, this.salt);
            this.iv = crypto.randomBytes(16);

            this.encryptedToken = encryptText(this.encryptedToken, this.iv, key);
        }
        next();
    } catch (error: any) {
        // console.error("Error in pre-save hook:", error);
        next(error);
    }
});

// Create the Agent model
const Agent = mongoose.model<AgentSchema>("Agent", agentSchema);

export { Agent };
