// Formatear moneda (Pesos Mexicanos)
export function formatCurrency(amount: number | string | null | undefined): string {
  const num = typeof amount === 'string' ? parseFloat(amount) : amount;
  if (num === null || num === undefined || isNaN(num)) return '$0.00';

  return new Intl.NumberFormat('es-MX', {
    style: 'currency',
    currency: 'MXN',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(num);
}

// Formatear número con separadores
export function formatNumber(num: number | string | null | undefined): string {
  const n = typeof num === 'string' ? parseFloat(num) : num;
  if (n === null || n === undefined || isNaN(n)) return '0';

  return new Intl.NumberFormat('es-MX').format(n);
}

// Formatear fecha
export function formatDate(date: Date | string | null | undefined): string {
  if (!date) return '-';
  const d = typeof date === 'string' ? new Date(date) : date;

  return new Intl.DateTimeFormat('es-MX', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(d);
}

// Formatear fecha corta
export function formatDateShort(date: Date | string | null | undefined): string {
  if (!date) return '-';
  const d = typeof date === 'string' ? new Date(date) : date;

  return new Intl.DateTimeFormat('es-MX', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(d);
}

// Formatear fecha y hora
export function formatDateTime(date: Date | string | null | undefined): string {
  if (!date) return '-';
  const d = typeof date === 'string' ? new Date(date) : date;

  return new Intl.DateTimeFormat('es-MX', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(d);
}

// Calcular porcentaje
export function calculatePercentage(value: number, total: number): number {
  if (total === 0) return 0;
  return Math.round((value / total) * 100);
}

// Truncar texto
export function truncate(text: string | null | undefined, length: number = 50): string {
  if (!text) return '';
  if (text.length <= length) return text;
  return text.slice(0, length) + '...';
}

// Generar colores para gráficos
export function generateColors(count: number): string[] {
  const baseColors = [
    '#1d4ed8', // azul
    '#d97706', // dorado
    '#7c3aed', // violeta
    '#059669', // verde
    '#dc2626', // rojo
    '#0891b2', // cyan
    '#db2777', // rosa
    '#65a30d', // lima
    '#ea580c', // naranja
    '#6b7280', // gris
  ];

  const colors: string[] = [];
  for (let i = 0; i < count; i++) {
    colors.push(baseColors[i % baseColors.length]);
  }
  return colors;
}

// Labels para métodos de pago
export const metodoPagoLabels: Record<string, string> = {
  DEPOSITO: 'Depósito Bancario',
  TRANSFERENCIA: 'Transferencia',
  EFECTIVO: 'Efectivo',
  CHEQUE: 'Cheque',
  OTRO: 'Otro',
};

// Labels para estados de aporte
export const estadoAporteLabels: Record<string, string> = {
  PENDIENTE: 'Pendiente',
  VERIFICADO: 'Verificado',
  ANULADO: 'Anulado',
};

// Labels para estados de egreso
export const estadoEgresoLabels: Record<string, string> = {
  PENDIENTE: 'Pendiente',
  VERIFICADO: 'Verificado',
  ANULADO: 'Anulado',
};

// Labels para tipos de donante
export const tipDonanteLabels: Record<string, string> = {
  PERSONA: 'Persona',
  EMPRESA: 'Empresa',
};

// Colores por estado
export const estadoColors: Record<string, string> = {
  PENDIENTE: 'bg-yellow-100 text-yellow-800',
  VERIFICADO: 'bg-green-100 text-green-800',
  ANULADO: 'bg-red-100 text-red-800',
};
