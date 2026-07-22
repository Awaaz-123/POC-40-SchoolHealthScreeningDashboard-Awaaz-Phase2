"use client";

import React, { useState, useMemo } from 'react';
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  flexRender,
  ColumnDef,
  SortingState
} from '@tanstack/react-table';
import { ArrowUpDown, Search, ShieldCheck, AlertTriangle, CheckCircle2, Clock } from 'lucide-react';

export interface SchoolRecord {
  id: string;
  school_name: string;
  region: string;
  country: string;
  enrolled_students: number;
  screening_completion: number;
  referral_rate: number;
  followup_completion: number;
  primary_flag_risk: string;
  status: string;
}

interface TableProps {
  data: SchoolRecord[];
}

export default function SchoolRankingTable({ data }: TableProps) {
  const [sorting, setSorting] = useState<SortingState>([
    { id: 'screening_completion', desc: true }
  ]);
  const [globalFilter, setGlobalFilter] = useState('');

  const columns = useMemo<ColumnDef<SchoolRecord>[]>(
    () => [
      {
        accessorKey: 'school_name',
        header: ({ column }) => (
          <button
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
            className="flex items-center gap-1 font-mono font-bold text-gray-300 hover:text-brand-primary"
          >
            SCHOOL NAME <ArrowUpDown className="w-3 h-3" />
          </button>
        ),
        cell: (info) => (
          <div>
            <div className="font-bold text-white text-xs">{info.getValue<string>()}</div>
            <div className="text-[10px] text-gray-500 font-mono">
              {info.row.original.region}, {info.row.original.country} ({info.row.original.enrolled_students.toLocaleString()} students)
            </div>
          </div>
        )
      },
      {
        accessorKey: 'screening_completion',
        header: ({ column }) => (
          <button
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
            className="flex items-center gap-1 font-mono font-bold text-gray-300 hover:text-brand-primary"
          >
            SCREENING COMPL. % <ArrowUpDown className="w-3 h-3" />
          </button>
        ),
        cell: (info) => {
          const val = info.getValue<number>();
          const color = val >= 95 ? 'text-emerald-400' : val >= 90 ? 'text-brand-primary' : 'text-amber-400';
          return (
            <div className="font-mono text-xs">
              <div className={`font-bold ${color}`}>{val.toFixed(1)}%</div>
              <div className="w-24 h-1.5 bg-brand-bg rounded-full overflow-hidden mt-1 border border-brand-border">
                <div
                  className={`h-full ${val >= 95 ? 'bg-emerald-500' : val >= 90 ? 'bg-brand-primary' : 'bg-amber-500'}`}
                  style={{ width: `${Math.min(100, val)}%` }}
                />
              </div>
            </div>
          );
        }
      },
      {
        accessorKey: 'referral_rate',
        header: ({ column }) => (
          <button
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
            className="flex items-center gap-1 font-mono font-bold text-gray-300 hover:text-brand-primary"
          >
            REFERRAL RATE % <ArrowUpDown className="w-3 h-3" />
          </button>
        ),
        cell: (info) => (
          <span className="font-mono text-xs font-semibold text-gray-300">
            {info.getValue<number>().toFixed(1)}%
          </span>
        )
      },
      {
        accessorKey: 'followup_completion',
        header: ({ column }) => (
          <button
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
            className="flex items-center gap-1 font-mono font-bold text-gray-300 hover:text-brand-primary"
          >
            FOLLOW-UP COMPL. % <ArrowUpDown className="w-3 h-3" />
          </button>
        ),
        cell: (info) => {
          const val = info.getValue<number>();
          const color = val >= 85 ? 'text-emerald-400' : val >= 70 ? 'text-brand-primary' : val >= 55 ? 'text-amber-400' : 'text-red-400';
          return (
            <span className={`font-mono text-xs font-bold ${color}`}>
              {val.toFixed(1)}%
            </span>
          );
        }
      },
      {
        accessorKey: 'primary_flag_risk',
        header: 'PRIMARY RISK',
        cell: (info) => (
          <span className="px-2 py-0.5 rounded bg-brand-surface border border-brand-border text-[10px] font-mono font-bold text-brand-secondary">
            {info.getValue<string>()}
          </span>
        )
      },
      {
        accessorKey: 'status',
        header: 'COMPLIANCE STATUS',
        cell: (info) => {
          const status = info.getValue<string>();
          let badgeClass = 'bg-brand-surface text-gray-400 border-brand-border';
          let icon = <Clock className="w-3 h-3" />;
          
          if (status === 'Exemplary') {
            badgeClass = 'bg-emerald-950/60 text-emerald-400 border-emerald-800/80';
            icon = <CheckCircle2 className="w-3 h-3 text-emerald-400" />;
          } else if (status === 'Target Met') {
            badgeClass = 'bg-brand-primary/10 text-brand-primary border-brand-primary/40';
            icon = <ShieldCheck className="w-3 h-3 text-brand-primary" />;
          } else if (status === 'Follow-Up Gap') {
            badgeClass = 'bg-amber-950/60 text-amber-400 border-amber-800/80';
            icon = <AlertTriangle className="w-3 h-3 text-amber-400" />;
          } else if (status === 'Action Required') {
            badgeClass = 'bg-red-950/60 text-red-400 border-red-800/80';
            icon = <AlertTriangle className="w-3 h-3 text-red-400" />;
          }

          return (
            <div className={`inline-flex items-center gap-1.5 px-2 py-1 rounded border font-mono text-[10px] font-bold ${badgeClass}`}>
              {icon}
              <span>{status}</span>
            </div>
          );
        }
      }
    ],
    []
  );

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      globalFilter
    },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel()
  });

  return (
    <div className="w-full flex flex-col h-full">
      {/* Search Header */}
      <div className="flex justify-between items-center mb-3">
        <span className="text-xs font-mono text-gray-400">
          Showing <span className="text-white font-bold">{table.getRowModel().rows.length}</span> schools
        </span>
        <div className="relative w-64">
          <Search className="w-3.5 h-3.5 absolute left-2.5 top-2 text-gray-500" />
          <input
            type="text"
            value={globalFilter ?? ''}
            onChange={(e) => setGlobalFilter(e.target.value)}
            placeholder="Search school or region..."
            className="w-full pl-8 pr-3 py-1 bg-brand-bg border border-brand-border rounded text-xs font-mono text-gray-200 focus:border-brand-primary cyan-glow"
          />
        </div>
      </div>

      {/* Table Container */}
      <div className="flex-1 overflow-auto border border-brand-border rounded-lg bg-brand-surface/50">
        <table className="w-full text-left border-collapse">
          <thead className="bg-brand-surface sticky top-0 z-10 border-b border-brand-border">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th key={header.id} className="p-3 text-[11px] font-mono text-gray-400">
                    {header.isPlaceholder
                      ? null
                      : flexRender(header.column.columnDef.header, header.getContext())}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody className="divide-y divide-brand-border/60">
            {table.getRowModel().rows.length === 0 ? (
              <tr>
                <td colSpan={columns.length} className="text-center p-6 text-xs font-mono text-gray-500">
                  No schools found matching search criteria.
                </td>
              </tr>
            ) : (
              table.getRowModel().rows.map((row) => (
                <tr key={row.id} className="hover:bg-brand-surface/80 transition-colors">
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className="p-3">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
