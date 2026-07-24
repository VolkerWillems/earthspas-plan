"use client";

import * as React from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import type { ColumnDef } from "@tanstack/react-table";

const tooltipStyle = {
  background: "#091017",
  border: "1px solid #294352",
  borderRadius: "6px",
  color: "#fff",
  fontFamily: "Barlow, sans-serif",
  fontWeight: 400,
};

export type DecisionRow = {
  item: string;
  month: string;
  year: string;
  result: string;
  highlight?: boolean;
};

export function TrafficSourceChart({ data }: { data: Array<{ label: string; value: number }> }) {
  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} layout="vertical" margin={{ top: 4, right: 22, bottom: 4, left: 6 }}>
          <CartesianGrid horizontal={false} stroke="var(--border)" strokeDasharray="3 3" />
          <XAxis type="number" stroke="rgba(255,255,255,.75)" tickLine={false} axisLine={false} />
          <YAxis dataKey="label" type="category" width={132} stroke="#fff" tickLine={false} axisLine={false} tick={{ fill: "#fff", fontSize: 14, fontWeight: 400 }} />
          <Tooltip contentStyle={tooltipStyle} cursor={{ fill: "rgba(55,163,191,.06)" }} />
          <Bar dataKey="value" fill="var(--primary)" radius={[0, 4, 4, 0]} maxBarSize={20} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export function BudgetChart({ data, total }: { data: Array<{ name: string; value: number }>; total: string }) {
  const fills = ["#37a3bf", "#2f8ea7", "#27788f", "#1f6377"];
  return (
    <div className="relative h-[290px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie data={data} dataKey="value" nameKey="name" innerRadius={72} outerRadius={112} paddingAngle={2} stroke="#091017" strokeWidth={3}>
            {data.map((entry, index) => <Cell key={entry.name} fill={fills[index % fills.length]} />)}
          </Pie>
          <Tooltip contentStyle={tooltipStyle} formatter={(value: unknown) => [`€${Number(value).toLocaleString("nl-NL")}`, "per maand"]} />
          <Legend verticalAlign="bottom" iconType="square" wrapperStyle={{ color: "#fff", fontSize: 14, fontWeight: 400 }} />
        </PieChart>
      </ResponsiveContainer>
      <div className="pointer-events-none absolute inset-0 grid place-items-center pb-10 text-center">
        <div><span className="block text-sm uppercase tracking-[0.14em] text-white/70">per maand</span><span className="mt-1 block text-2xl text-primary">{total}</span></div>
      </div>
    </div>
  );
}

export function RevenueScenarioChart({ data }: { data: Array<{ name: string; omzet: number }> }) {
  const fills = ["#5d5844", "#817653", "#a09368", "#c1b48c"];
  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 10, right: 8, left: 0, bottom: 8 }}>
          <CartesianGrid vertical={false} stroke="var(--border)" strokeDasharray="3 3" />
          <XAxis dataKey="name" tickLine={false} axisLine={false} tick={{ fill: "#fff", fontSize: 13, fontWeight: 400 }} />
          <YAxis tickLine={false} axisLine={false} tick={{ fill: "rgba(255,255,255,.75)", fontSize: 12, fontWeight: 400 }} tickFormatter={(value: unknown) => `€${Math.round(Number(value) / 1000)}k`} />
          <Tooltip contentStyle={tooltipStyle} formatter={(value: unknown) => [`€${Number(value).toLocaleString("nl-NL")}`, "omzet"]} />
          <Bar dataKey="omzet" radius={[4, 4, 0, 0]} maxBarSize={58}>
            {data.map((entry, index) => <Cell key={entry.name} fill={fills[index % fills.length]} />)}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export function SalesRampChart({ data }: { data: Array<{ maand: string; verkoop: number }> }) {
  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 12, right: 16, left: 0, bottom: 8 }}>
          <CartesianGrid vertical={false} stroke="var(--border)" strokeDasharray="3 3" />
          <XAxis dataKey="maand" tickLine={false} axisLine={false} tick={{ fill: "#fff", fontSize: 12, fontWeight: 400 }} />
          <YAxis tickLine={false} axisLine={false} tick={{ fill: "rgba(255,255,255,.75)", fontSize: 12, fontWeight: 400 }} />
          <Tooltip contentStyle={tooltipStyle} formatter={(value: unknown) => [Number(value).toLocaleString("nl-NL", { maximumFractionDigits: 1 }), "spa's"]} />
          <Line type="monotone" dataKey="verkoop" stroke="var(--primary)" strokeWidth={3} dot={{ r: 4, fill: "#091017", stroke: "var(--primary)", strokeWidth: 2 }} activeDot={{ r: 6 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

const columns: ColumnDef<DecisionRow>[] = [
  { accessorKey: "item", header: "Onderdeel" },
  { accessorKey: "month", header: "Maand" },
  { accessorKey: "year", header: "Jaar" },
  { accessorKey: "result", header: "Resultaat / afspraak" },
];

export function DecisionTable({ rows }: { rows: DecisionRow[] }) {
  const table = useReactTable({ data: rows, columns, getCoreRowModel: getCoreRowModel() });

  return (
    <>
      <div className="space-y-3 md:hidden">
        {rows.map((row) => (
          <article key={row.item} className={row.highlight ? "rounded-md border border-secondary/60 bg-secondary/10 p-5" : "rounded-md border border-border bg-card p-5"}>
            <h4 className={row.highlight ? "text-lg text-secondary" : "text-lg text-white"}>{row.item}</h4>
            <dl className="mt-4 grid grid-cols-2 gap-3 text-sm">
              <div><dt className="text-white/60">Per maand</dt><dd className="mt-1 text-white">{row.month}</dd></div>
              <div><dt className="text-white/60">Per jaar</dt><dd className="mt-1 text-white">{row.year}</dd></div>
            </dl>
            <p className="mt-4 border-t border-border pt-4 text-base leading-7 text-white/90">{row.result}</p>
          </article>
        ))}
      </div>
      <div className="hidden overflow-x-auto md:block">
        <table className="w-full min-w-[820px] border-collapse text-left text-base">
          <thead className="bg-accent text-sm uppercase tracking-[0.12em] text-white/80">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>{headerGroup.headers.map((header) => <th key={header.id} className="px-6 py-4">{flexRender(header.column.columnDef.header, header.getContext())}</th>)}</tr>
            ))}
          </thead>
          <tbody className="divide-y divide-border">
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id} className={row.original.highlight ? "bg-secondary/10" : ""}>
                {row.getVisibleCells().map((cell, index) => <td key={cell.id} className={index === 0 ? "px-6 py-4 text-white" : row.original.highlight ? "px-6 py-4 text-secondary" : "px-6 py-4 text-white/90"}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>)}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
