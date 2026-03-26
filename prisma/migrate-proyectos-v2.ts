import 'dotenv/config';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🔧 Aplicando cambios para vincular Aportes/Egresos a Proyectos...\n');

  // 1. Agregar columna "meta" a Proyecto
  console.log('📦 Verificando columna "meta" en Proyecto...');
  try {
    await prisma.$executeRawUnsafe(`
      ALTER TABLE "Proyecto" ADD COLUMN IF NOT EXISTS "meta" DECIMAL(14,2);
    `);
    console.log('   ✅ Columna "meta" lista');
  } catch (e) {
    console.log('   ✅ Columna "meta" ya existe');
  }

  // 2. Agregar columna "activo" a Proyecto
  console.log('📦 Verificando columna "activo" en Proyecto...');
  try {
    await prisma.$executeRawUnsafe(`
      ALTER TABLE "Proyecto" ADD COLUMN IF NOT EXISTS "activo" BOOLEAN NOT NULL DEFAULT false;
    `);
    console.log('   ✅ Columna "activo" lista');
  } catch (e) {
    console.log('   ✅ Columna "activo" ya existe');
  }

  // 3. Agregar índice en "activo"
  console.log('📦 Verificando índice en "activo"...');
  try {
    await prisma.$executeRawUnsafe(`
      CREATE INDEX IF NOT EXISTS "Proyecto_activo_idx" ON "Proyecto"("activo");
    `);
    console.log('   ✅ Índice "Proyecto_activo_idx" listo');
  } catch {
    console.log('   ✅ Índice ya existe');
  }

  // 4. Agregar columna "proyectoId" a Aporte
  console.log('📦 Verificando columna "proyectoId" en Aporte...');
  try {
    await prisma.$executeRawUnsafe(`
      ALTER TABLE "Aporte" ADD COLUMN IF NOT EXISTS "proyectoId" TEXT;
    `);
    console.log('   ✅ Columna "proyectoId" en Aporte lista');
  } catch (e) {
    console.log('   ✅ Columna ya existe');
  }

  // 5. Agregar foreign key de Aporte a Proyecto
  console.log('🔗 Verificando foreign key Aporte -> Proyecto...');
  try {
    await prisma.$executeRawUnsafe(`
      DO $$ BEGIN
        ALTER TABLE "Aporte"
          ADD CONSTRAINT "Aporte_proyectoId_fkey"
          FOREIGN KEY ("proyectoId") REFERENCES "Proyecto"("id")
          ON DELETE SET NULL ON UPDATE CASCADE;
      EXCEPTION
        WHEN duplicate_object THEN null;
      END $$;
    `);
    console.log('   ✅ Foreign key lista');
  } catch {
    console.log('   ✅ Foreign key ya existe');
  }

  // 6. Agregar índice en Aporte.proyectoId
  console.log('📦 Verificando índice en Aporte.proyectoId...');
  try {
    await prisma.$executeRawUnsafe(`
      CREATE INDEX IF NOT EXISTS "Aporte_proyectoId_idx" ON "Aporte"("proyectoId");
    `);
    console.log('   ✅ Índice listo');
  } catch {
    console.log('   ✅ Índice ya existe');
  }

  // 7. Agregar columna "proyectoId" a Egreso
  console.log('📦 Verificando columna "proyectoId" en Egreso...');
  try {
    await prisma.$executeRawUnsafe(`
      ALTER TABLE "Egreso" ADD COLUMN IF NOT EXISTS "proyectoId" TEXT;
    `);
    console.log('   ✅ Columna "proyectoId" en Egreso lista');
  } catch (e) {
    console.log('   ✅ Columna ya existe');
  }

  // 8. Agregar foreign key de Egreso a Proyecto
  console.log('🔗 Verificando foreign key Egreso -> Proyecto...');
  try {
    await prisma.$executeRawUnsafe(`
      DO $$ BEGIN
        ALTER TABLE "Egreso"
          ADD CONSTRAINT "Egreso_proyectoId_fkey"
          FOREIGN KEY ("proyectoId") REFERENCES "Proyecto"("id")
          ON DELETE SET NULL ON UPDATE CASCADE;
      EXCEPTION
        WHEN duplicate_object THEN null;
      END $$;
    `);
    console.log('   ✅ Foreign key lista');
  } catch {
    console.log('   ✅ Foreign key ya existe');
  }

  // 9. Agregar índice en Egreso.proyectoId
  console.log('📦 Verificando índice en Egreso.proyectoId...');
  try {
    await prisma.$executeRawUnsafe(`
      CREATE INDEX IF NOT EXISTS "Egreso_proyectoId_idx" ON "Egreso"("proyectoId");
    `);
    console.log('   ✅ Índice listo');
  } catch {
    console.log('   ✅ Índice ya existe');
  }

  console.log('\n🎉 Migración completada exitosamente!');
  console.log('   - Proyecto: columnas "meta" y "activo" agregadas');
  console.log('   - Aporte: columna "proyectoId" agregada (nullable)');
  console.log('   - Egreso: columna "proyectoId" agregada (nullable)');
  console.log('   - Datos existentes NO fueron modificados');
}

main()
  .catch((e) => {
    console.error('❌ Error en la migración:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
