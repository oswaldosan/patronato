function formatCurrency(amount) {
  const num = typeof amount === "string" ? parseFloat(amount) : amount;
  if (num === null || num === void 0 || isNaN(num)) return "$0.00";
  return new Intl.NumberFormat("es-MX", {
    style: "currency",
    currency: "MXN",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(num);
}
function formatNumber(num) {
  const n = typeof num === "string" ? parseFloat(num) : num;
  if (n === null || n === void 0 || isNaN(n)) return "0";
  return new Intl.NumberFormat("es-MX").format(n);
}
function formatDate(date) {
  if (!date) return "-";
  const d = typeof date === "string" ? new Date(date) : date;
  return new Intl.DateTimeFormat("es-MX", {
    year: "numeric",
    month: "long",
    day: "numeric"
  }).format(d);
}
function formatDateShort(date) {
  if (!date) return "-";
  const d = typeof date === "string" ? new Date(date) : date;
  return new Intl.DateTimeFormat("es-MX", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit"
  }).format(d);
}
function formatDateTime(date) {
  if (!date) return "-";
  const d = typeof date === "string" ? new Date(date) : date;
  return new Intl.DateTimeFormat("es-MX", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  }).format(d);
}
function calculatePercentage(value, total) {
  if (total === 0) return 0;
  return Math.round(value / total * 100);
}
const metodoPagoLabels = {
  DEPOSITO: "Depósito Bancario",
  TRANSFERENCIA: "Transferencia",
  EFECTIVO: "Efectivo",
  CHEQUE: "Cheque",
  OTRO: "Otro"
};
const estadoAporteLabels = {
  PENDIENTE: "Pendiente",
  VERIFICADO: "Verificado",
  ANULADO: "Anulado"
};
const estadoEgresoLabels = {
  PENDIENTE: "Pendiente",
  VERIFICADO: "Verificado",
  ANULADO: "Anulado"
};
const tipDonanteLabels = {
  PERSONA: "Persona",
  EMPRESA: "Empresa"
};

export { formatDate as a, formatDateShort as b, calculatePercentage as c, formatDateTime as d, estadoAporteLabels as e, formatCurrency as f, estadoEgresoLabels as g, formatNumber as h, metodoPagoLabels as m, tipDonanteLabels as t };
//# sourceMappingURL=format-OIrQpM7m.js.map
