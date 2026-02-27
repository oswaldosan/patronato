import type { PageServerLoad } from './$types';
import { getReportData } from '$lib/server/reports';

export const load: PageServerLoad = async ({ url }) => {
  const desde = url.searchParams.get('desde');
  const hasta = url.searchParams.get('hasta');

  const reportes = await getReportData({ desde, hasta });

  return reportes;
};
