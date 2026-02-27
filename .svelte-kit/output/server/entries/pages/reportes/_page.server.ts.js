import { g as getReportData } from "../../../chunks/reports.js";
const load = async ({ url }) => {
  const desde = url.searchParams.get("desde");
  const hasta = url.searchParams.get("hasta");
  const reportes = await getReportData({ desde, hasta });
  return reportes;
};
export {
  load
};
