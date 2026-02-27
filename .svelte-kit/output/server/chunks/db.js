import "dotenv/config";
import { PrismaClient } from "@prisma/client";
const globalForPrisma = globalThis;
function createPrismaClient() {
  return new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["error", "warn"] : ["error"]
  });
}
const prisma = globalForPrisma.prisma ?? createPrismaClient();
if (process.env.NODE_ENV === "development") globalForPrisma.prisma = prisma;
export {
  prisma as p
};
