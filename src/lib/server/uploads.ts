import { writeFile, mkdir, unlink } from 'node:fs/promises';
import { join } from 'node:path';
import { existsSync } from 'node:fs';

const UPLOAD_DIR = join(process.cwd(), 'uploads');

const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
const MAX_SIZE = 5 * 1024 * 1024; // 5MB

export async function saveUploadedFile(
  file: File,
  subfolder: string
): Promise<string> {
  if (!ALLOWED_TYPES.includes(file.type)) {
    throw new Error('Tipo de archivo no permitido. Solo imágenes JPG, PNG, WebP o GIF.');
  }

  if (file.size > MAX_SIZE) {
    throw new Error('El archivo excede el tamaño máximo de 5MB.');
  }

  const dir = join(UPLOAD_DIR, subfolder);
  if (!existsSync(dir)) {
    await mkdir(dir, { recursive: true });
  }

  const ext = file.name.split('.').pop()?.toLowerCase() || 'jpg';
  const uniqueName = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
  const filePath = join(dir, uniqueName);

  const buffer = Buffer.from(await file.arrayBuffer());
  await writeFile(filePath, buffer);

  return `/api/uploads/${subfolder}/${uniqueName}`;
}

export async function deleteUploadedFile(urlPath: string): Promise<void> {
  if (!urlPath.startsWith('/api/uploads/')) return;

  const relativePath = urlPath.replace('/api/uploads/', '');
  const filePath = join(UPLOAD_DIR, relativePath);

  try {
    if (existsSync(filePath)) {
      await unlink(filePath);
    }
  } catch {
    console.error('Error deleting file:', filePath);
  }
}
