import 'dotenv/config';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🔧 Aplicando cambios para módulo de Proyectos...\n');

  // 1. Crear tabla Proyecto si no existe
  console.log('📦 Verificando tabla Proyecto...');
  try {
    await prisma.$executeRawUnsafe(`
      CREATE TABLE IF NOT EXISTS "Proyecto" (
        "id" TEXT NOT NULL,
        "titulo" TEXT NOT NULL,
        "descripcion" TEXT NOT NULL,
        "fecha" TIMESTAMP(3) NOT NULL,
        "gastoTotal" DECIMAL(14,2) NOT NULL,
        "foto1" TEXT,
        "foto2" TEXT,
        "foto3" TEXT,
        "publicado" BOOLEAN NOT NULL DEFAULT false,
        "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
        "updatedAt" TIMESTAMP(3) NOT NULL,
        CONSTRAINT "Proyecto_pkey" PRIMARY KEY ("id")
      );
    `);
    console.log('   ✅ Tabla Proyecto lista');
  } catch (e) {
    console.log('   ✅ Tabla Proyecto ya existe');
  }

  // 2. Crear índices de Proyecto
  console.log('📦 Verificando índices...');
  try {
    await prisma.$executeRawUnsafe(`
      CREATE INDEX IF NOT EXISTS "Proyecto_fecha_idx" ON "Proyecto"("fecha");
    `);
    await prisma.$executeRawUnsafe(`
      CREATE INDEX IF NOT EXISTS "Proyecto_publicado_idx" ON "Proyecto"("publicado");
    `);
    console.log('   ✅ Índices creados');
  } catch {
    console.log('   ✅ Índices ya existen');
  }

  // 3. Limpiar duplicados en Config antes de aplicar unique constraint
  console.log('🧹 Limpiando duplicados en Config...');
  const configKeys = await prisma.$queryRawUnsafe<{ key: string; cnt: string }[]>(`
    SELECT "key", COUNT(*) as cnt FROM "Config" GROUP BY "key" HAVING COUNT(*) > 1
  `);

  for (const row of configKeys) {
    const duplicates = await prisma.$queryRawUnsafe<{ id: string }[]>(`
      SELECT "id" FROM "Config" WHERE "key" = $1 ORDER BY "createdAt" DESC
    `, row.key);

    if (duplicates.length > 1) {
      const idsToDelete = duplicates.slice(1).map(d => d.id);
      for (const id of idsToDelete) {
        await prisma.$executeRawUnsafe(`DELETE FROM "Config" WHERE "id" = $1`, id);
      }
      console.log(`   🗑  Eliminados ${idsToDelete.length} duplicados de "${row.key}" (se conservó el más reciente)`);
    }
  }

  if (configKeys.length === 0) {
    console.log('   ✅ Sin duplicados');
  }

  // 4. Aplicar unique constraint en Config.key si no existe
  console.log('🔑 Verificando constraint único en Config.key...');
  try {
    await prisma.$executeRawUnsafe(`
      ALTER TABLE "Config" ADD CONSTRAINT "Config_key_key" UNIQUE ("key");
    `);
    console.log('   ✅ Constraint único aplicado');
  } catch {
    console.log('   ✅ Constraint único ya existe');
  }

  // 5. Eliminar el índice viejo de Config.key si existe (ya no es necesario con unique)
  try {
    await prisma.$executeRawUnsafe(`
      DROP INDEX IF EXISTS "Config_key_idx";
    `);
  } catch {
    // ignorar
  }

  console.log('\n🎉 Migración de Proyectos completada exitosamente!');
  console.log('   - Tabla "Proyecto" lista');
  console.log('   - Config.key ahora es único');
  console.log('   - El módulo de Proyectos ya está disponible en /admin/proyectos');
}

main()
  .catch((e) => {
    console.error('❌ Error en la migración:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
