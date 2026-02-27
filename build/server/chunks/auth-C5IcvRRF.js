import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { p as prisma } from './db-6tYg_p_L.js';

const JWT_SECRET = process.env.JWT_SECRET || "default-secret-change-me";
const TOKEN_EXPIRY = "7d";
async function hashPassword(password) {
  return bcrypt.hash(password, 12);
}
async function verifyPassword(password, hashedPassword) {
  return bcrypt.compare(password, hashedPassword);
}
function generateToken(user) {
  const payload = {
    userId: user.id,
    email: user.email,
    role: user.role
  };
  return jwt.sign(payload, JWT_SECRET, { expiresIn: TOKEN_EXPIRY });
}
function verifyToken(token) {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch {
    return null;
  }
}
async function authenticateUser(email, password) {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user || !user.activo) return null;
  const isValid = await verifyPassword(password, user.password);
  if (!isValid) return null;
  return user;
}
async function getUserFromToken(token) {
  const payload = verifyToken(token);
  if (!payload) return null;
  const user = await prisma.user.findUnique({ where: { id: payload.userId } });
  if (!user || !user.activo) return null;
  return user;
}

export { authenticateUser as a, generateToken as b, getUserFromToken as g, hashPassword as h };
//# sourceMappingURL=auth-C5IcvRRF.js.map
