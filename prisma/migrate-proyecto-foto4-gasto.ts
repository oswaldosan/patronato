import 'dotenv/config';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🔧 Proyecto: foto4 + gastoTotal nullable (si aplica)...\n');

  try {
    await prisma.$executeRawUnsafe(`
      ALTER TABLE "Proyecto" ALTER COLUMN "gastoTotal" DROP NOT NULL;
    `);
    console.log('   ✅ gastoTotal admite NULL');
  } catch {
    console.log('   ℹ️  gastoTotal ya era nullable o columna distinta');
  }

  try {
    await prisma.$executeRawUnsafe(`
      ALTER TABLE "Proyecto" ADD COLUMN IF NOT EXISTS "foto4" TEXT;
    `);
    console.log('   ✅ Columna foto4 lista');
  } catch (e) {
    console.error('   ❌ foto4:', e);
    throw e;
  }

  console.log('\n🎉 Listo.');
}

main()
  .catch((e) => {
    console.error('❌ Error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
