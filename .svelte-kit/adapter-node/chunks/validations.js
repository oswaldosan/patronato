import { z } from "zod";
const donanteSchema = z.object({
  nombre: z.string().min(2, "El nombre debe tener al menos 2 caracteres").max(200),
  tipo: z.enum(["PERSONA", "EMPRESA"]),
  identificacion: z.string().trim().min(5, "Ingresa un número de identificación válido").max(25, "La identificación es demasiado larga").regex(/^[0-9A-Za-z\-\s]+$/, "Solo números, letras y guiones"),
  nombreNegocio: z.string().max(200).optional().nullable(),
  telefono: z.string().max(20).optional().nullable(),
  email: z.string().email("Email inválido").optional().nullable().or(z.literal("")),
  direccion: z.string().max(500).optional().nullable(),
  notas: z.string().max(1e3).optional().nullable()
});
const donanteUpdateSchema = donanteSchema.partial().extend({
  identificacion: donanteSchema.shape.identificacion
});
const rubroSchema = z.object({
  nombre: z.string().min(2, "El nombre debe tener al menos 2 caracteres").max(100),
  descripcion: z.string().max(500).optional().nullable(),
  color: z.string().regex(/^#[0-9A-Fa-f]{6}$/, "Color inválido").default("#1d4ed8"),
  icono: z.string().max(50).optional().nullable(),
  orden: z.number().int().min(0).default(0)
});
rubroSchema.partial();
const aporteSchema = z.object({
  donanteId: z.string().cuid("ID de donante inválido"),
  rubroId: z.string().cuid("ID de rubro inválido"),
  fecha: z.string().or(z.date()).transform((val) => new Date(val)),
  monto: z.number().positive("El monto debe ser mayor a 0").or(
    z.string().transform((val) => parseFloat(val))
  ),
  metodo: z.enum(["DEPOSITO", "TRANSFERENCIA", "EFECTIVO", "CHEQUE", "OTRO"]),
  referencia: z.string().max(100).optional().nullable(),
  comentario: z.string().max(500).optional().nullable(),
  evidencia: z.string().url().optional().nullable(),
  estado: z.enum(["PENDIENTE", "VERIFICADO", "ANULADO"]).default("PENDIENTE")
});
const aporteUpdateSchema = aporteSchema.partial();
const egresoSchema = z.object({
  fecha: z.string().or(z.date()).transform((val) => new Date(val)),
  monto: z.number().positive("El monto debe ser mayor a 0").or(
    z.string().transform((val) => parseFloat(val))
  ),
  concepto: z.string().min(2, "El concepto debe tener al menos 2 caracteres").max(300),
  rubroId: z.string().cuid("ID de rubro inválido"),
  proveedorId: z.string().cuid("ID de proveedor inválido").optional().nullable(),
  comprobante: z.string().url().optional().nullable(),
  referencia: z.string().max(100).optional().nullable(),
  notas: z.string().max(1e3).optional().nullable(),
  estado: z.enum(["PENDIENTE", "VERIFICADO", "ANULADO"]).default("PENDIENTE")
});
const egresoUpdateSchema = egresoSchema.partial();
const loginSchema = z.object({
  email: z.string().email("Email inválido"),
  password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres")
});
const userCreateSchema = z.object({
  name: z.string().min(2, "El nombre debe tener al menos 2 caracteres").max(150),
  email: z.string().email("Email inválido"),
  password: z.string().min(8, "La contraseña debe tener al menos 8 caracteres"),
  role: z.enum(["ADMIN", "VIEWER"]).default("ADMIN")
});
const userToggleSchema = z.object({
  id: z.string().cuid("ID de usuario inválido")
});
const userPasswordResetSchema = z.object({
  id: z.string().cuid("ID de usuario inválido"),
  password: z.string().min(8, "La contraseña debe tener al menos 8 caracteres")
});
z.object({
  query: z.string().min(1).max(200)
});
export {
  aporteUpdateSchema as a,
  aporteSchema as b,
  donanteSchema as c,
  donanteUpdateSchema as d,
  egresoUpdateSchema as e,
  egresoSchema as f,
  userToggleSchema as g,
  userCreateSchema as h,
  loginSchema as l,
  rubroSchema as r,
  userPasswordResetSchema as u
};
