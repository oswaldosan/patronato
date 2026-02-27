import { z } from 'zod';

// Donante
export const donanteSchema = z.object({
  nombre: z.string().min(2, 'El nombre debe tener al menos 2 caracteres').max(200),
  tipo: z.enum(['PERSONA', 'EMPRESA']),
  identificacion: z.string()
    .trim()
    .min(5, 'Ingresa un número de identificación válido')
    .max(25, 'La identificación es demasiado larga')
    .regex(/^[0-9A-Za-z\-\s]+$/, 'Solo números, letras y guiones'),
  nombreNegocio: z.string().max(200).optional().nullable(),
  telefono: z.string().max(20).optional().nullable(),
  email: z.string().email('Email inválido').optional().nullable().or(z.literal('')),
  direccion: z.string().max(500).optional().nullable(),
  notas: z.string().max(1000).optional().nullable(),
});

export const donanteUpdateSchema = donanteSchema.partial().extend({
  identificacion: donanteSchema.shape.identificacion,
});

// Rubro
export const rubroSchema = z.object({
  nombre: z.string().min(2, 'El nombre debe tener al menos 2 caracteres').max(100),
  descripcion: z.string().max(500).optional().nullable(),
  color: z.string().regex(/^#[0-9A-Fa-f]{6}$/, 'Color inválido').default('#1d4ed8'),
  icono: z.string().max(50).optional().nullable(),
  orden: z.number().int().min(0).default(0),
});

export const rubroUpdateSchema = rubroSchema.partial();

// Aporte
export const aporteSchema = z.object({
  donanteId: z.string().cuid('ID de donante inválido'),
  rubroId: z.string().cuid('ID de rubro inválido'),
  fecha: z.string().or(z.date()).transform((val) => new Date(val)),
  monto: z.number().positive('El monto debe ser mayor a 0').or(
    z.string().transform((val) => parseFloat(val))
  ),
  metodo: z.enum(['DEPOSITO', 'TRANSFERENCIA', 'EFECTIVO', 'CHEQUE', 'OTRO']),
  referencia: z.string().max(100).optional().nullable(),
  comentario: z.string().max(500).optional().nullable(),
  evidencia: z.string().url().optional().nullable(),
  estado: z.enum(['PENDIENTE', 'VERIFICADO', 'ANULADO']).default('PENDIENTE'),
});

export const aporteUpdateSchema = aporteSchema.partial();

// Egreso
export const egresoSchema = z.object({
  fecha: z.string().or(z.date()).transform((val) => new Date(val)),
  monto: z.number().positive('El monto debe ser mayor a 0').or(
    z.string().transform((val) => parseFloat(val))
  ),
  concepto: z.string().min(2, 'El concepto debe tener al menos 2 caracteres').max(300),
  rubroId: z.string().cuid('ID de rubro inválido'),
  proveedorId: z.string().cuid('ID de proveedor inválido').optional().nullable(),
  comprobante: z.string().url().optional().nullable(),
  referencia: z.string().max(100).optional().nullable(),
  notas: z.string().max(1000).optional().nullable(),
  estado: z.enum(['PENDIENTE', 'VERIFICADO', 'ANULADO']).default('PENDIENTE'),
});

export const egresoUpdateSchema = egresoSchema.partial();

// Login
export const loginSchema = z.object({
  email: z.string().email('Email inválido'),
  password: z.string().min(6, 'La contraseña debe tener al menos 6 caracteres'),
});

// Usuarios administrativos
export const userCreateSchema = z.object({
  name: z.string().min(2, 'El nombre debe tener al menos 2 caracteres').max(150),
  email: z.string().email('Email inválido'),
  password: z.string().min(8, 'La contraseña debe tener al menos 8 caracteres'),
  role: z.enum(['ADMIN', 'VIEWER']).default('ADMIN'),
});

export const userToggleSchema = z.object({
  id: z.string().cuid('ID de usuario inválido'),
});

export const userPasswordResetSchema = z.object({
  id: z.string().cuid('ID de usuario inválido'),
  password: z.string().min(8, 'La contraseña debe tener al menos 8 caracteres'),
});

// Búsqueda
export const searchSchema = z.object({
  query: z.string().min(1).max(200),
});

// Tipos inferidos
export type DonanteInput = z.infer<typeof donanteSchema>;
export type RubroInput = z.infer<typeof rubroSchema>;
export type AporteInput = z.infer<typeof aporteSchema>;
export type EgresoInput = z.infer<typeof egresoSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
export type UserCreateInput = z.infer<typeof userCreateSchema>;
