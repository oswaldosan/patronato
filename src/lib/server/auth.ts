import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { prisma } from './db';
import type { User } from '@prisma/client';

const JWT_SECRET = process.env.JWT_SECRET || 'default-secret-change-me';
const TOKEN_EXPIRY = '7d';

export interface JWTPayload {
  userId: string;
  email: string;
  role: string;
}

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 12);
}

export async function verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
  return bcrypt.compare(password, hashedPassword);
}

export function generateToken(user: User): string {
  const payload: JWTPayload = {
    userId: user.id,
    email: user.email,
    role: user.role,
  };
  return jwt.sign(payload, JWT_SECRET, { expiresIn: TOKEN_EXPIRY });
}

export function verifyToken(token: string): JWTPayload | null {
  try {
    return jwt.verify(token, JWT_SECRET) as JWTPayload;
  } catch {
    return null;
  }
}

export async function authenticateUser(email: string, password: string): Promise<User | null> {
  const user = await prisma.user.findUnique({ where: { email } });

  if (!user || !user.activo) return null;

  const isValid = await verifyPassword(password, user.password);

  if (!isValid) return null;

  return user;
}

export async function getUserFromToken(token: string): Promise<User | null> {
  const payload = verifyToken(token);

  if (!payload) return null;

  const user = await prisma.user.findUnique({ where: { id: payload.userId } });
  if (!user || !user.activo) return null;
  return user;
}

export async function createAdminUser(email: string, password: string, name: string): Promise<User> {
  const hashedPassword = await hashPassword(password);

  return prisma.user.upsert({
    where: { email },
    update: {},
    create: {
      email,
      password: hashedPassword,
      name,
      role: 'ADMIN',
      activo: true,
    },
  });
}
