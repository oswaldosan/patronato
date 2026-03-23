import { error } from '@sveltejs/kit';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { existsSync } from 'node:fs';
import type { RequestHandler } from './$types';

const UPLOAD_DIR = join(process.cwd(), 'uploads');

const MIME_TYPES: Record<string, string> = {
  jpg: 'image/jpeg',
  jpeg: 'image/jpeg',
  png: 'image/png',
  gif: 'image/gif',
  webp: 'image/webp',
};

export const GET: RequestHandler = async ({ params }) => {
  const filePath = join(UPLOAD_DIR, params.path);

  if (filePath.includes('..') || !filePath.startsWith(UPLOAD_DIR)) {
    throw error(403, 'Acceso denegado');
  }

  if (!existsSync(filePath)) {
    throw error(404, 'Archivo no encontrado');
  }

  const ext = filePath.split('.').pop()?.toLowerCase() || '';
  const contentType = MIME_TYPES[ext] || 'application/octet-stream';

  const fileBuffer = await readFile(filePath);

  return new Response(fileBuffer, {
    headers: {
      'Content-Type': contentType,
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  });
};
