import * as XLSX from 'xlsx';

const ALLOWED_TYPES = [
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  'application/vnd.ms-excel',
];
const ALLOWED_EXTENSIONS = ['xlsx', 'xls'];
const MAX_SIZE = 5 * 1024 * 1024; // 5MB
const MAX_ROWS = 1000;
const MAX_COLS = 50;
const MAX_SHEETS = 30;
const MAX_JSON_BYTES = 1_000_000; // 1MB serialized

export interface ExcelSheet {
  nombre: string;
  filas: string[][];
}

export interface ExcelParsed {
  sheets: ExcelSheet[];
}

export async function parseExcelFile(file: File): Promise<ExcelParsed> {
  const ext = file.name.split('.').pop()?.toLowerCase() ?? '';
  if (!ALLOWED_TYPES.includes(file.type) && !ALLOWED_EXTENSIONS.includes(ext)) {
    throw new Error('Tipo de archivo no permitido. Solo archivos Excel (.xlsx, .xls).');
  }

  if (file.size > MAX_SIZE) {
    throw new Error('El archivo excede el tamaño máximo de 5MB.');
  }

  let workbook: XLSX.WorkBook;
  try {
    const buffer = Buffer.from(await file.arrayBuffer());
    workbook = XLSX.read(buffer);
  } catch {
    throw new Error('No se pudo leer el archivo Excel. Verifica que no esté dañado.');
  }

  if (workbook.SheetNames.length > MAX_SHEETS) {
    throw new Error(`El archivo Excel tiene demasiadas hojas. Máximo ${MAX_SHEETS}.`);
  }

  const sheets: ExcelSheet[] = [];

  for (const nombre of workbook.SheetNames) {
    const ws = workbook.Sheets[nombre];
    if (!ws) continue;

    let filas = XLSX.utils.sheet_to_json<string[]>(ws, {
      header: 1,
      raw: false,
      defval: '',
    }) as string[][];

    filas = filas.map((fila) => fila.slice(0, MAX_COLS).map((celda) => String(celda ?? '')));

    // Trim trailing empty rows
    while (filas.length > 0 && filas[filas.length - 1].every((celda) => celda.trim() === '')) {
      filas.pop();
    }

    if (filas.length === 0) continue;

    // Trim leading and trailing columns that are empty across all rows
    const maxCols = Math.max(...filas.map((fila) => fila.length));
    let firstCol = 0;
    while (
      firstCol < maxCols &&
      filas.every((fila) => (fila[firstCol] ?? '').trim() === '')
    ) {
      firstCol++;
    }
    let lastCol = maxCols - 1;
    while (
      lastCol >= firstCol &&
      filas.every((fila) => (fila[lastCol] ?? '').trim() === '')
    ) {
      lastCol--;
    }
    if (firstCol > lastCol) continue;

    filas = filas
      .slice(0, MAX_ROWS)
      .map((fila) =>
        Array.from({ length: lastCol - firstCol + 1 }, (_, i) => fila[firstCol + i] ?? '')
      );

    sheets.push({ nombre, filas });
  }

  if (sheets.length === 0) {
    throw new Error('El archivo Excel no contiene datos.');
  }

  if (Buffer.byteLength(JSON.stringify({ sheets })) > MAX_JSON_BYTES) {
    throw new Error('El contenido del Excel es demasiado grande. Reduce la cantidad de datos.');
  }

  return { sheets };
}
