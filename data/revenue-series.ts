export const revenueSeries = [
  { date: new Date("2026-01-01"), value: 42000 },
  { date: new Date("2026-02-01"), value: 43800 },
  { date: new Date("2026-03-01"), value: 45100 },
  { date: new Date("2026-04-01"), value: 46700 },
  { date: new Date("2026-05-01"), value: 48600 },
  { date: new Date("2026-06-01"), value: 50300 },
  { date: new Date("2026-07-01"), value: 52100 },
  { date: new Date("2026-08-01"), value: 53900 },
  { date: new Date("2026-09-01"), value: 55700 },
  { date: new Date("2026-10-01"), value: 57400 },
  { date: new Date("2026-11-01"), value: 59300 },
  { date: new Date("2026-12-01"), value: 61176 },
];

export const revenueStats = {
  average: revenueSeries.at(-1)?.value ?? 0,
  trend: 9.8,
};
