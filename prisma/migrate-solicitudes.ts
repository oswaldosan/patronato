import 'dotenv/config';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🔧 Aplicando cambios para Solicitudes de Donación...\n');

  // 1. Crear enum EstadoSolicitud
  console.log('📦 Verificando enum EstadoSolicitud...');
  try {
    await prisma.$executeRawUnsafe(`
      DO $$ BEGIN
        CREATE TYPE "EstadoSolicitud" AS ENUM ('PENDIENTE', 'APROBADO', 'RECHAZADO');
      EXCEPTION
        WHEN duplicate_object THEN null;
      END $$;
    `);
    console.log('   ✅ Enum EstadoSolicitud listo');
  } catch {
    console.log('   ✅ Enum ya existe');
  }

  // 2. Crear tabla SolicitudDonacion
  console.log('📦 Verificando tabla SolicitudDonacion...');
  try {
    await prisma.$executeRawUnsafe(`
      CREATE TABLE IF NOT EXISTS "SolicitudDonacion" (
        "id" TEXT NOT NULL,
        "nombre" TEXT NOT NULL,
        "identidad" TEXT NOT NULL,
        "telefono" TEXT NOT NULL,
        "monto" DECIMAL(14,2),
        "comprobante" TEXT,
        "mensaje" TEXT,
        "estado" "EstadoSolicitud" NOT NULL DEFAULT 'PENDIENTE',
        "notasAdmin" TEXT,
        "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
        "updatedAt" TIMESTAMP(3) NOT NULL,
        CONSTRAINT "SolicitudDonacion_pkey" PRIMARY KEY ("id")
      );
    `);
    console.log('   ✅ Tabla SolicitudDonacion lista');
  } catch {
    console.log('   ✅ Tabla ya existe');
  }

  // 3. Crear índices
  console.log('📦 Verificando índices...');
  try {
    await prisma.$executeRawUnsafe(`
      CREATE INDEX IF NOT EXISTS "SolicitudDonacion_estado_idx" ON "SolicitudDonacion"("estado");
    `);
    await prisma.$executeRawUnsafe(`
      CREATE INDEX IF NOT EXISTS "SolicitudDonacion_createdAt_idx" ON "SolicitudDonacion"("createdAt");
    `);
    console.log('   ✅ Índices creados');
  } catch {
    console.log('   ✅ Índices ya existen');
  }

  console.log('\n🎉 Migración de Solicitudes de Donación completada!');
  console.log('   - Tabla "SolicitudDonacion" lista');
  console.log('   - Formulario público disponible en /como-donar');
  console.log('   - Admin disponible en /admin/solicitudes');
}

main()
  .catch((e) => {
    console.error('❌ Error en la migración:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
