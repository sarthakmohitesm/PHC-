import mongoose, { Schema, Document } from 'mongoose';
import crypto from 'crypto';

export interface IAdmin extends Document {
  username: string;
  passwordHash: string;
  role: string;
  createdAt: Date;
}

const AdminSchema = new Schema<IAdmin>({
  username: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
  role: { type: String, default: 'Administrator' },
}, { timestamps: true });

// Hash a password using SHA-256
export function hashPassword(password: string): string {
  return crypto.createHash('sha256').update(password).digest('hex');
}

// Verify a password against a hash
export function verifyPassword(password: string, hash: string): boolean {
  return hashPassword(password) === hash;
}

export const AdminModel = mongoose.models.Admin || mongoose.model<IAdmin>('Admin', AdminSchema);
