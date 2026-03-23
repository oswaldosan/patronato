import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Iniciando seed de la base de datos...');

  const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD || 'admin123456', 12);

  const adminUser = await prisma.user.upsert({
    where: { email: process.env.ADMIN_EMAIL || 'admin@patronato-monterrey.org' },
    update: {},
    create: {
      email: process.env.ADMIN_EMAIL || 'admin@patronato-monterrey.org',
      password: hashedPassword,
      name: 'Administrador',
      role: 'ADMIN',
      activo: true,
    },
  });
  console.log('✅ Usuario admin creado:', adminUser.email);

  const rubrosData = [
    { nombre: 'Industria', descripcion: 'Empresas industriales y manufactureras', color: '#1d4ed8', icono: '🏭', orden: 1 },
    { nombre: 'Comercio', descripcion: 'Negocios comerciales y tiendas', color: '#7c3aed', icono: '🏪', orden: 2 },
    { nombre: 'Servicios', descripcion: 'Empresas de servicios profesionales', color: '#0891b2', icono: '💼', orden: 3 },
    { nombre: 'Construcción', descripcion: 'Empresas constructoras e inmobiliarias', color: '#d97706', icono: '🏗️', orden: 4 },
    { nombre: 'Tecnología', descripcion: 'Empresas tecnológicas y startups', color: '#059669', icono: '💻', orden: 5 },
    { nombre: 'Educación', descripcion: 'Instituciones educativas y fundaciones', color: '#db2777', icono: '🎓', orden: 6 },
    { nombre: 'Salud', descripcion: 'Hospitales, clínicas y laboratorios', color: '#dc2626', icono: '🏥', orden: 7 },
    { nombre: 'Alimentos', descripcion: 'Industria alimentaria y restaurantes', color: '#65a30d', icono: '🍽️', orden: 8 },
    { nombre: 'Transporte', descripcion: 'Logística y transporte de carga', color: '#ea580c', icono: '🚛', orden: 9 },
    { nombre: 'Otros', descripcion: 'Otras aportaciones', color: '#6b7280', icono: '📦', orden: 10 },
  ];

  for (const rubro of rubrosData) {
    await prisma.rubro.upsert({
      where: { nombre: rubro.nombre },
      update: {},
      create: rubro,
    });
  }
  console.log('✅ Rubros creados:', rubrosData.length);

  await prisma.config.createMany({
    data: [
      {
        key: 'META_PROYECTO',
        value: process.env.PUBLIC_META_GOAL || '5000000',
      },
      {
        key: 'NOMBRE_PROYECTO',
        value: 'Patronato Pro Mejoramiento de Monterrey',
      },
    ],
    skipDuplicates: true,
  });
  console.log('✅ Configuración inicial creada');

  const proveedoresEjemplo = [
    { nombre: 'Constructora Regiomontana' },
    { nombre: 'Proveedora de Materiales MTY' },
    { nombre: 'Servicios Logísticos del Norte' },
    { nombre: 'Publicidad y Diseño Monterrey' },
  ];

  for (const proveedor of proveedoresEjemplo) {
    await prisma.proveedor.upsert({
      where: { nombre: proveedor.nombre },
      update: {},
      create: proveedor,
    });
  }
  console.log('✅ Proveedores de ejemplo creados');

  const donantesEjemplo = [
    { nombre: 'Roberto Garza Sada', tipo: 'PERSONA' as const, telefono: '81-1234-5678', identificacion: 'GASR800101MTY' },
    { nombre: 'Grupo Industrial ALFA', tipo: 'EMPRESA' as const, nombreNegocio: 'ALFA S.A.B. de C.V.', telefono: '81-8000-1234', identificacion: 'GIA900301MTY0' },
    { nombre: 'Constructora Norte', tipo: 'EMPRESA' as const, nombreNegocio: 'Constructora Norte S.A. de C.V.', telefono: '81-9876-5432', identificacion: 'CNO850601NL01' },
  ];

  for (const donante of donantesEjemplo) {
    const exists = await prisma.donante.findUnique({ where: { identificacion: donante.identificacion } });
    if (!exists) {
      await prisma.donante.create({ data: donante });
    }
  }
  console.log('✅ Donantes de ejemplo creados');

  console.log('');
  console.log('🎉 Seed completado exitosamente!');
  console.log('');
  console.log('📝 Credenciales de administrador:');
  console.log(`   Email: ${process.env.ADMIN_EMAIL || 'admin@patronato-monterrey.org'}`);
  console.log(`   Password: ${process.env.ADMIN_PASSWORD || 'admin123456'}`);
  console.log('');
}

main()
  .catch((e) => {
    console.error('❌ Error en el seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
