// @ts-nocheck
import type { PageServerLoad } from './$types';
import { getReportData } from '$lib/server/reports';

export const load = async ({ url }: Parameters<PageServerLoad>[0]) => {
  const desde = url.searchParams.get('desde');
  const hasta = url.searchParams.get('hasta');

  const reportes = await getReportData({ desde, hasta });

  return reportes;
};
