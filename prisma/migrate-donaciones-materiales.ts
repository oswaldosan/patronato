import 'dotenv/config';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🔧 Aplicando cambios para módulo de Donaciones de Materiales...\n');

  // 1. Crear enum EstadoDonacionMaterial si no existe
  console.log('📦 Verificando enum EstadoDonacionMaterial...');
  try {
    await prisma.$executeRawUnsafe(`
      DO $$ BEGIN
        CREATE TYPE "EstadoDonacionMaterial" AS ENUM ('PENDIENTE', 'VERIFICADO', 'ANULADO');
      EXCEPTION
        WHEN duplicate_object THEN null;
      END $$;
    `);
    console.log('   ✅ Enum EstadoDonacionMaterial listo');
  } catch {
    console.log('   ✅ Enum ya existe');
  }

  // 2. Crear tabla DonacionMaterial si no existe
  console.log('📦 Verificando tabla DonacionMaterial...');
  try {
    await prisma.$executeRawUnsafe(`
      CREATE TABLE IF NOT EXISTS "DonacionMaterial" (
        "id" TEXT NOT NULL,
        "donanteId" TEXT NOT NULL,
        "descripcion" TEXT NOT NULL,
        "cantidad" TEXT,
        "valorEstimado" DECIMAL(14,2) NOT NULL,
        "fecha" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
        "estado" "EstadoDonacionMaterial" NOT NULL DEFAULT 'PENDIENTE',
        "notas" TEXT,
        "evidencia" TEXT,
        "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
        "updatedAt" TIMESTAMP(3) NOT NULL,
        CONSTRAINT "DonacionMaterial_pkey" PRIMARY KEY ("id")
      );
    `);
    console.log('   ✅ Tabla DonacionMaterial lista');
  } catch (e) {
    console.log('   ✅ Tabla DonacionMaterial ya existe');
  }

  // 3. Crear foreign key si no existe
  console.log('🔗 Verificando foreign key...');
  try {
    await prisma.$executeRawUnsafe(`
      DO $$ BEGIN
        ALTER TABLE "DonacionMaterial"
          ADD CONSTRAINT "DonacionMaterial_donanteId_fkey"
          FOREIGN KEY ("donanteId") REFERENCES "Donante"("id")
          ON DELETE RESTRICT ON UPDATE CASCADE;
      EXCEPTION
        WHEN duplicate_object THEN null;
      END $$;
    `);
    console.log('   ✅ Foreign key lista');
  } catch {
    console.log('   ✅ Foreign key ya existe');
  }

  // 4. Crear índices
  console.log('📦 Verificando índices...');
  try {
    await prisma.$executeRawUnsafe(`
      CREATE INDEX IF NOT EXISTS "DonacionMaterial_donanteId_idx" ON "DonacionMaterial"("donanteId");
    `);
    await prisma.$executeRawUnsafe(`
      CREATE INDEX IF NOT EXISTS "DonacionMaterial_fecha_idx" ON "DonacionMaterial"("fecha");
    `);
    await prisma.$executeRawUnsafe(`
      CREATE INDEX IF NOT EXISTS "DonacionMaterial_estado_idx" ON "DonacionMaterial"("estado");
    `);
    console.log('   ✅ Índices creados');
  } catch {
    console.log('   ✅ Índices ya existen');
  }

  console.log('\n🎉 Migración de Donaciones de Materiales completada exitosamente!');
  console.log('   - Tabla "DonacionMaterial" lista');
  console.log('   - El módulo está disponible en /admin/donaciones-materiales');
}

main()
  .catch((e) => {
    console.error('❌ Error en la migración:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
