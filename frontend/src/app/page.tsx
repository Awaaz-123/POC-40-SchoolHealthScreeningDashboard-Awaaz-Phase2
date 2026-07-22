"use client";

import React, { useEffect, useState, useMemo } from 'react';
import { 
  Activity, 
  Download, 
  Sliders, 
  Building, 
  RefreshCw, 
  Info,
  CheckCircle2,
  Stethoscope,
  TrendingUp,
  Award,
  Filter
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as ChartTooltip,
  ResponsiveContainer,
  Legend,
  Cell
} from 'recharts';

import SchoolRankingTable, { SchoolRecord } from '@/components/SchoolRankingTable';

interface RegionSummary {
  region: string;
  country: string;
  total_schools: number;
  target_students: number;
  screened_students: number;
  completion_rate: number;
  why_it_matters: string;
  power_dynamics: string;
}

interface FunnelStage {
  stage: string;
  count: number;
  percentage: number;
  fill: string;
}

interface ScreeningSummaryData {
  target_students: number;
  screened_students: number;
  completion_rate: number;
  why_it_matters: string;
  power_dynamics: string;
  funnel_stages: FunnelStage[];
}

interface FlagRateRecord {
  grade: string;
  age: number;
  vision_flag: number;
  hearing_flag: number;
  dental_flag: number;
  bmi_flag: number;
}

interface BmiTrendRecord {
  age: number;
  underweight: number;
  normal: number;
  overweight: number;
  obese: number;
}

// Fallback datasets for offline mode
const MOCK_REGIONS: RegionSummary[] = [
  { region: "Dubai", country: "UAE", total_schools: 220, target_students: 310000, screened_students: 288300, completion_rate: 93.0, why_it_matters: "High-density private and public school network with mandated annual screening; tracking follow-through ensures early detection of refractive vision errors and childhood caries before academic performance suffers.", power_dynamics: "Joint oversight between Dubai Health Authority (DHA) and Knowledge and Human Development Authority (KHDA) requires aligned protocols between health regulators and private school operators." },
  { region: "Abu Dhabi", country: "UAE", total_schools: 260, target_students: 380000, screened_students: 349600, completion_rate: 92.0, why_it_matters: "Extensive screening across urban centers and Al Ain / Al Dhafra regions; critical for detecting early hearing deficits and metabolic risks in younger cohorts.", power_dynamics: "Department of Health Abu Dhabi (DoH) mandates strict EMR integration for school clinics, placing compliance responsibility directly on licensed school nurses." },
  { region: "Sharjah", country: "UAE", total_schools: 140, target_students: 185000, screened_students: 160950, completion_rate: 87.0, why_it_matters: "Rapidly growing student population; identifying referral drop-offs between primary school screenings and secondary care prevents irreversible vision loss.", power_dynamics: "Ministry of Health and Prevention (MOHAP) coordinates screening alongside Sharjah Private Education Authority (SPEA)." },
  { region: "Riyadh", country: "Saudi Arabia", total_schools: 480, target_students: 620000, screened_students: 545600, completion_rate: 88.0, why_it_matters: "Massive student volume; early BMI screening and dental interventions address rising childhood obesity and oral health burdens across the central region.", power_dynamics: "Saudi Ministry of Health (MOH) and Ministry of Education (MOE) co-manage the National School Health Program, navigating cross-ministerial referral pipelines." },
  { region: "Makkah & Jeddah", country: "Saudi Arabia", total_schools: 410, target_students: 540000, screened_students: 459000, completion_rate: 85.0, why_it_matters: "Diverse socio-demographic student body; robust vision screening catches amblyopia early when corrective intervention is most cost-effective.", power_dynamics: "Regional Health Clusters drive clinical referrals while school principals control access to physical screening days." },
  { region: "Eastern Province", country: "Saudi Arabia", total_schools: 310, target_students: 410000, screened_students: 364900, completion_rate: 89.0, why_it_matters: "Industrial and coastal corridor; tracking referral-to-treatment loops guarantees students flagged for hearing loss receive specialized audiometry.", power_dynamics: "School health units rely on primary healthcare center (PHCC) capacity to process student referrals promptly." }
];

const MOCK_FUNNEL: FunnelStage[] = [
  { stage: "Target Students", count: 2445000, percentage: 100.0, fill: "#38BDF8" },
  { stage: "Screened", count: 2168350, percentage: 88.7, fill: "#818CF8" },
  { stage: "Flagged Risk", count: 390300, percentage: 18.0, fill: "#F59E0B" },
  { stage: "Referred", count: 321500, percentage: 82.4, fill: "#EC4899" },
  { stage: "Treated", count: 218620, percentage: 68.0, fill: "#10B981" }
];

const MOCK_FLAG_RATES: FlagRateRecord[] = [
  { grade: "Grade 1", age: 6, vision_flag: 6.2, hearing_flag: 3.1, dental_flag: 24.5, bmi_flag: 14.2 },
  { grade: "Grade 2", age: 7, vision_flag: 7.4, hearing_flag: 2.8, dental_flag: 26.1, bmi_flag: 15.8 },
  { grade: "Grade 3", age: 8, vision_flag: 8.9, hearing_flag: 2.5, dental_flag: 28.4, bmi_flag: 17.5 },
  { grade: "Grade 4", age: 9, vision_flag: 10.5, hearing_flag: 2.3, dental_flag: 30.2, bmi_flag: 19.1 },
  { grade: "Grade 5", age: 10, vision_flag: 12.1, hearing_flag: 2.1, dental_flag: 31.8, bmi_flag: 21.4 },
  { grade: "Grade 6", age: 11, vision_flag: 13.8, hearing_flag: 2.0, dental_flag: 29.5, bmi_flag: 23.8 },
  { grade: "Grade 7", age: 12, vision_flag: 15.6, hearing_flag: 1.9, dental_flag: 27.2, bmi_flag: 25.6 },
  { grade: "Grade 8", age: 13, vision_flag: 17.2, hearing_flag: 1.8, dental_flag: 25.0, bmi_flag: 27.2 },
  { grade: "Grade 9", age: 14, vision_flag: 18.9, hearing_flag: 1.7, dental_flag: 23.4, bmi_flag: 28.9 },
  { grade: "Grade 10", age: 15, vision_flag: 20.4, hearing_flag: 1.6, dental_flag: 22.1, bmi_flag: 30.1 },
  { grade: "Grade 11", age: 16, vision_flag: 21.8, hearing_flag: 1.5, dental_flag: 20.8, bmi_flag: 31.5 },
  { grade: "Grade 12", age: 17, vision_flag: 23.1, hearing_flag: 1.4, dental_flag: 19.5, bmi_flag: 32.8 }
];

const MOCK_BMI_TRENDS: BmiTrendRecord[] = [
  { age: 6, underweight: 8.5, normal: 77.3, overweight: 9.8, obese: 4.4 },
  { age: 7, underweight: 7.9, normal: 76.3, overweight: 10.6, obese: 5.2 },
  { age: 8, underweight: 7.2, normal: 75.3, overweight: 11.5, obese: 6.0 },
  { age: 9, underweight: 6.6, normal: 74.3, overweight: 12.4, obese: 6.7 },
  { age: 10, underweight: 6.0, normal: 72.6, overweight: 13.8, obese: 7.6 },
  { age: 11, underweight: 5.5, normal: 70.7, overweight: 15.1, obese: 8.7 },
  { age: 12, underweight: 5.1, normal: 69.3, overweight: 16.2, obese: 9.4 },
  { age: 13, underweight: 4.8, normal: 68.0, overweight: 17.0, obese: 10.2 },
  { age: 14, underweight: 4.5, normal: 66.6, overweight: 17.9, obese: 11.0 },
  { age: 15, underweight: 4.2, normal: 65.7, overweight: 18.5, obese: 11.6 },
  { age: 16, underweight: 4.0, normal: 64.5, overweight: 19.2, obese: 12.3 },
  { age: 17, underweight: 3.8, normal: 63.4, overweight: 19.9, obese: 12.9 }
];

const MOCK_SCHOOL_RANKINGS: SchoolRecord[] = [
  { id: "SCH-101", school_name: "Dubai International Academy", region: "Dubai", country: "UAE", enrolled_students: 2450, screening_completion: 98.4, referral_rate: 14.2, followup_completion: 91.5, primary_flag_risk: "Vision", status: "Exemplary" },
  { id: "SCH-102", school_name: "Al Yasmina Academy", region: "Abu Dhabi", country: "UAE", enrolled_students: 1980, screening_completion: 96.2, referral_rate: 16.8, followup_completion: 88.0, primary_flag_risk: "BMI", status: "Exemplary" },
  { id: "SCH-103", school_name: "Riyadh Educational Complex", region: "Riyadh", country: "Saudi Arabia", enrolled_students: 3200, screening_completion: 94.1, referral_rate: 19.5, followup_completion: 74.2, primary_flag_risk: "Dental", status: "Target Met" },
  { id: "SCH-104", school_name: "Sharjah Model School", region: "Sharjah", country: "UAE", enrolled_students: 1450, screening_completion: 91.0, referral_rate: 18.0, followup_completion: 69.5, primary_flag_risk: "Dental", status: "Target Met" },
  { id: "SCH-105", school_name: "Jeddah Knowledge International", region: "Makkah & Jeddah", country: "Saudi Arabia", enrolled_students: 2100, screening_completion: 89.5, referral_rate: 21.4, followup_completion: 62.0, primary_flag_risk: "Vision", status: "Follow-Up Gap" },
  { id: "SCH-106", school_name: "Dhahran Ahliyyah Schools", region: "Eastern Province", country: "Saudi Arabia", enrolled_students: 2800, screening_completion: 95.8, referral_rate: 15.3, followup_completion: 84.6, primary_flag_risk: "Hearing", status: "Exemplary" },
  { id: "SCH-107", school_name: "Emirates National School", region: "Abu Dhabi", country: "UAE", enrolled_students: 3100, screening_completion: 93.5, referral_rate: 17.1, followup_completion: 81.2, primary_flag_risk: "BMI", status: "Target Met" },
  { id: "SCH-108", school_name: "Al Khobar Secondary Academy", region: "Eastern Province", country: "Saudi Arabia", enrolled_students: 1650, screening_completion: 86.4, referral_rate: 22.8, followup_completion: 58.4, primary_flag_risk: "Vision", status: "Follow-Up Gap" },
  { id: "SCH-109", school_name: "GEMS World Academy", region: "Dubai", country: "UAE", enrolled_students: 2300, screening_completion: 97.1, referral_rate: 13.9, followup_completion: 94.0, primary_flag_risk: "Vision", status: "Exemplary" },
  { id: "SCH-110", school_name: "Al Falah Secondary School", region: "Makkah & Jeddah", country: "Saudi Arabia", enrolled_students: 1890, screening_completion: 81.2, referral_rate: 24.5, followup_completion: 51.0, primary_flag_risk: "Dental", status: "Action Required" }
];

export default function Home() {
  const [regions, setRegions] = useState<RegionSummary[]>([]);
  const [summaryData, setSummaryData] = useState<ScreeningSummaryData | null>(null);
  const [flagRates, setFlagRates] = useState<FlagRateRecord[]>([]);
  const [schoolRankings, setSchoolRankings] = useState<SchoolRecord[]>([]);
  
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);
  const [minCompletionFilter, setMinCompletionFilter] = useState<number>(0);
  const [backendStatus, setBackendStatus] = useState<'online' | 'fallback'>('fallback');
  const [loading, setLoading] = useState<boolean>(true);

  const API_BASE = "http://localhost:8082/api";

  useEffect(() => {
    async function loadDashboardData() {
      setLoading(true);
      try {
        const healthRes = await fetch(`${API_BASE}/health`, { mode: 'cors' });
        if (healthRes.ok) {
          setBackendStatus('online');
          
          const [regRes, sumRes, flagRes, rankRes] = await Promise.all([
            fetch(`${API_BASE}/regions`, { mode: 'cors' }),
            fetch(`${API_BASE}/screening-summary${selectedRegion ? `?region=${encodeURIComponent(selectedRegion)}` : ''}`, { mode: 'cors' }),
            fetch(`${API_BASE}/flag-rates`, { mode: 'cors' }),
            fetch(`${API_BASE}/school-rankings${selectedRegion ? `?region=${encodeURIComponent(selectedRegion)}` : ''}`, { mode: 'cors' })
          ]);

          const regionsData = await regRes.json();
          const summaryJson = await sumRes.json();
          const flagJson = await flagRes.json();
          const rankJson = await rankRes.json();

          setRegions(regionsData);
          setSummaryData(summaryJson);
          setFlagRates(flagJson);
          setSchoolRankings(rankJson);
        } else {
          throw new Error("Backend not healthy");
        }
      } catch (err) {
        console.warn("Backend API offline. Using local frontend fallback mode.", err);
        setBackendStatus('fallback');
        setRegions(MOCK_REGIONS);
        setFlagRates(MOCK_FLAG_RATES);
        setSchoolRankings(MOCK_SCHOOL_RANKINGS);
        setSummaryData({
          target_students: 2445000,
          screened_students: 2168350,
          completion_rate: 88.7,
          why_it_matters: "School screening is the earliest, cheapest point to catch treatable conditions — this shows education and health ministries where coverage and follow-through are breaking down.",
          power_dynamics: "Joint governance between Ministries of Education (access to schools) and Ministries of Health (clinical protocols and referral pathways) creates bureaucratic friction, determining whether identified student health conditions lead to timely clinical care or die in referral backlogs.",
          funnel_stages: MOCK_FUNNEL
        });
      } finally {
        setLoading(false);
      }
    }

    loadDashboardData();
  }, [selectedRegion]);

  // Filter school rankings by minCompletionFilter
  const filteredSchoolRankings = useMemo(() => {
    let result = schoolRankings;
    if (selectedRegion) {
      result = result.filter(s => s.region === selectedRegion);
    }
    return result.filter(s => s.screening_completion >= minCompletionFilter);
  }, [schoolRankings, selectedRegion, minCompletionFilter]);

  // Active region details
  const activeRegionMeta = useMemo(() => {
    if (selectedRegion && regions.length > 0) {
      return regions.find(r => r.region === selectedRegion) || null;
    }
    return null;
  }, [regions, selectedRegion]);

  // Handle Download CSV/JSON
  const handleDownload = (format: 'csv' | 'json') => {
    if (backendStatus === 'online') {
      window.open(`${API_BASE}/download?format=${format}`);
    } else {
      const content = format === 'csv'
        ? [
            ["School ID", "School Name", "Region", "Country", "Students Enrolled", "Screening %", "Referral %", "Followup %", "Primary Risk", "Status"].join(','),
            ...schoolRankings.map(s => [s.id, `"${s.school_name}"`, s.region, s.country, s.enrolled_students, s.screening_completion, s.referral_rate, s.followup_completion, s.primary_flag_risk, s.status].join(','))
          ].join('\n')
        : JSON.stringify(schoolRankings, null, 2);

      const blob = new Blob([content], { type: format === 'csv' ? 'text/csv' : 'application/json' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `school_health_screening_data.${format}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-brand-bg text-gray-200 font-sans">
      
      {/* ========================================================================= */}
      {/* 30% SIDEBAR: High Level Metrics, Context, Filters & Exporter */}
      {/* ========================================================================= */}
      <aside className="w-[30%] h-full flex flex-col border-r border-brand-border bg-brand-surface/40 backdrop-blur-md p-6 overflow-y-auto z-20">
        
        {/* Header Title */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-1">
            <span className="text-[10px] tracking-[0.25em] font-mono text-brand-primary uppercase font-bold">
              Real Rails PoC #40
            </span>
            <div className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-brand-bg border border-brand-border text-[10px] font-mono">
              <span className={`w-1.5 h-1.5 rounded-full ${backendStatus === 'online' ? 'bg-emerald-500' : 'bg-amber-500 animate-pulse'}`} />
              <span className="text-gray-400 capitalize">{backendStatus} mode</span>
            </div>
          </div>
          <h1 className="text-xl font-black tracking-tight text-white uppercase leading-tight font-sans">
            School Health Screening Dashboard
          </h1>
          <p className="text-[11px] text-gray-400 font-mono mt-1">
            Rail: School Health (Vision, Hearing, Dental & BMI)
          </p>

          {/* High-Level Metric Card */}
          <div className="mt-4 p-4 rounded bg-brand-surface/80 border border-brand-border relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-24 h-24 bg-brand-primary/5 rounded-full blur-2xl group-hover:bg-brand-primary/10 transition-all duration-300" />
            <span className="text-[10px] tracking-wider font-mono text-gray-400 uppercase">
              {selectedRegion ? `REGION: ${selectedRegion.toUpperCase()}` : 'ALL GULF REGIONS OVERALL'}
            </span>
            <div className="flex items-baseline justify-between mt-1">
              <span className="text-2xl font-black font-mono text-brand-primary">
                {summaryData?.completion_rate || 88.7}%
              </span>
              <span className="text-xs font-mono text-emerald-400 font-bold flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> Target Met
              </span>
            </div>
            <div className="grid grid-cols-2 gap-3 mt-3 pt-3 border-t border-brand-border/60 text-xs">
              <div>
                <span className="text-[10px] text-gray-400 font-mono uppercase block">Target Students</span>
                <span className="font-mono font-bold text-white">
                  {(summaryData?.target_students || 2445000).toLocaleString()}
                </span>
              </div>
              <div>
                <span className="text-[10px] text-gray-400 font-mono uppercase block">Screened Students</span>
                <span className="font-mono font-bold text-brand-secondary">
                  {(summaryData?.screened_students || 2168350).toLocaleString()}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Section B: Why This Matters */}
        <section className="mb-5 p-4 rounded bg-brand-surface/30 border border-brand-border">
          <h2 className="text-xs font-bold tracking-wider text-brand-primary uppercase mb-1.5 flex items-center gap-1.5">
            <Info className="w-3.5 h-3.5" /> WHY THIS MATTERS
          </h2>
          <p className="text-xs text-gray-300 leading-relaxed font-sans">
            {activeRegionMeta?.why_it_matters || summaryData?.why_it_matters}
          </p>
        </section>

        {/* Section C: Who Controls the Rail */}
        <section className="mb-5 p-4 rounded bg-brand-surface/30 border border-brand-border">
          <h2 className="text-xs font-bold tracking-wider text-brand-secondary uppercase mb-1.5 flex items-center gap-1.5">
            <Building className="w-3.5 h-3.5" /> WHO CONTROLS THE RAIL
          </h2>
          <p className="text-xs text-gray-300 leading-relaxed font-sans">
            {activeRegionMeta?.power_dynamics || summaryData?.power_dynamics}
          </p>
        </section>

        {/* Section D: Dynamic Filters */}
        <section className="mb-6 flex-1 flex flex-col gap-4">
          <div>
            <h3 className="text-xs font-bold tracking-wider text-white uppercase mb-2 flex items-center gap-1.5">
              <Filter className="w-3.5 h-3.5 text-brand-primary" /> Filter by Region / Emirate
            </h3>
            <div className="grid grid-cols-2 gap-1.5 text-[10px] font-mono">
              <button
                onClick={() => setSelectedRegion(null)}
                className={`py-1.5 px-2 rounded border text-left font-bold transition-all ${
                  selectedRegion === null
                    ? 'bg-brand-primary/10 border-brand-primary text-brand-primary'
                    : 'bg-brand-surface border-brand-border text-gray-400 hover:border-gray-700'
                }`}
              >
                ALL REGIONS
              </button>
              {regions.map(r => (
                <button
                  key={r.region}
                  onClick={() => setSelectedRegion(r.region)}
                  className={`py-1.5 px-2 rounded border text-left font-bold transition-all truncate ${
                    selectedRegion === r.region
                      ? 'bg-brand-primary/10 border-brand-primary text-brand-primary'
                      : 'bg-brand-surface border-brand-border text-gray-400 hover:border-gray-700'
                  }`}
                >
                  {r.region.toUpperCase()}
                </button>
              ))}
            </div>
          </div>

          {/* Min Completion Threshold Filter */}
          <div>
            <div className="flex justify-between items-center mb-1">
              <h3 className="text-xs font-bold tracking-wider text-white uppercase flex items-center gap-1.5">
                <Sliders className="w-3.5 h-3.5 text-brand-secondary" /> Min Completion Rate
              </h3>
              <span className="text-[10px] font-mono text-brand-secondary font-bold">
                {minCompletionFilter}%
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="95"
              step="5"
              value={minCompletionFilter}
              onChange={(e) => setMinCompletionFilter(Number(e.target.value))}
              className="w-full h-1 bg-brand-border rounded-lg appearance-none cursor-pointer accent-brand-secondary focus:outline-none"
            />
          </div>
        </section>

        {/* Section E: Download Sample Data */}
        <div className="mt-auto pt-4 border-t border-brand-border flex gap-2">
          <button
            onClick={() => handleDownload('csv')}
            className="flex-1 py-2 px-3 bg-brand-primary text-brand-bg hover:bg-brand-primary/90 border border-brand-primary text-xs font-bold font-mono rounded flex items-center justify-center gap-1.5 transition-colors"
          >
            <Download className="w-3.5 h-3.5" /> CSV DATA
          </button>
          <button
            onClick={() => handleDownload('json')}
            className="flex-1 py-2 px-3 bg-brand-surface hover:bg-brand-border border border-brand-border text-gray-300 hover:text-white text-xs font-bold font-mono rounded flex items-center justify-center gap-1.5 transition-colors"
          >
            <Download className="w-3.5 h-3.5 text-brand-secondary" /> JSON DATA
          </button>
        </div>

      </aside>

      {/* ========================================================================= */}
      {/* 70% MAIN STAGE: Completion Gauges, Referral Funnel, Flag Bars & Rankings */}
      {/* ========================================================================= */}
      <main className="w-[70%] h-full flex flex-col p-6 gap-5 overflow-hidden">
        
        {/* Top Section: Regional Screening Gauges */}
        <div className="flex flex-col gap-2">
          <div className="flex justify-between items-center">
            <h2 className="text-xs font-bold tracking-wider text-white uppercase font-mono flex items-center gap-1.5">
              <Award className="w-4 h-4 text-brand-primary" /> Regional Screening-Coverage Completion Gauges
            </h2>
            <span className="text-[10px] font-mono text-gray-500">WHO & Gulf MOE Benchmarks</span>
          </div>

          <div className="grid grid-cols-6 gap-3">
            {regions.map((reg) => {
              const isSelected = selectedRegion === reg.region;
              return (
                <div
                  key={reg.region}
                  onClick={() => setSelectedRegion(isSelected ? null : reg.region)}
                  className={`p-3 rounded-lg border cursor-pointer transition-all duration-200 flex flex-col justify-between ${
                    isSelected
                      ? 'bg-brand-primary/10 border-brand-primary shadow-[0_0_12px_rgba(56,189,248,0.25)]'
                      : 'bg-brand-surface/60 border-brand-border hover:border-gray-600'
                  }`}
                >
                  <div className="text-[10px] font-mono text-gray-400 font-bold truncate">{reg.region}</div>
                  <div className="text-xl font-black font-mono text-white mt-1">
                    {reg.completion_rate}%
                  </div>
                  <div className="w-full h-1.5 bg-brand-bg rounded-full overflow-hidden mt-2 border border-brand-border">
                    <div
                      className={`h-full ${reg.completion_rate >= 90 ? 'bg-emerald-500' : 'bg-brand-primary'}`}
                      style={{ width: `${reg.completion_rate}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Middle Section: Referral Funnel (Left) + BMI Trends & Flag-Rates (Right) */}
        <div className="h-[42%] w-full flex gap-5 overflow-hidden">
          
          {/* Referral-to-Treatment Funnel */}
          <div className="w-1/2 h-full bg-brand-surface/30 border border-brand-border rounded-lg p-4 flex flex-col">
            <div className="flex items-center justify-between mb-2 border-b border-brand-border pb-2">
              <h3 className="text-xs font-bold text-white uppercase tracking-wider font-mono flex items-center gap-1.5">
                <Stethoscope className="w-4 h-4 text-brand-primary" /> Referral-to-Treatment Funnel
              </h3>
              <span className="text-[9px] font-mono text-gray-400">Identification → Clinical Care</span>
            </div>

            <div className="flex-1 w-full text-[10px] font-mono">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={summaryData?.funnel_stages || MOCK_FUNNEL} layout="vertical" margin={{ left: 10, right: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1F2937" opacity={0.4} />
                  <XAxis type="number" stroke="#9CA3AF" />
                  <YAxis dataKey="stage" type="category" stroke="#9CA3AF" width={110} />
                  <ChartTooltip
                    contentStyle={{ backgroundColor: '#0B1117', borderColor: '#1F2937' }}
                    itemStyle={{ color: '#f3f4f6' }}
                    formatter={(value: unknown) => [`${Number(value).toLocaleString()} students`, 'Volume']}
                  />
                  <Bar dataKey="count" radius={[0, 4, 4, 0]}>
                    {(summaryData?.funnel_stages || MOCK_FUNNEL).map((entry, index) => (
                      <Cell key={`funnel-cell-${index}`} fill={entry.fill} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Vision/Hearing Flag Rates by Grade */}
          <div className="w-1/2 h-full bg-brand-surface/30 border border-brand-border rounded-lg p-4 flex flex-col">
            <div className="flex items-center justify-between mb-2 border-b border-brand-border pb-2">
              <h3 className="text-xs font-bold text-white uppercase tracking-wider font-mono flex items-center gap-1.5">
                <TrendingUp className="w-4 h-4 text-brand-secondary" /> Vision vs Dental Flag-Rate by Grade
              </h3>
              <span className="text-[9px] font-mono text-gray-400">% Identified</span>
            </div>

            <div className="flex-1 w-full text-[10px] font-mono">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={flagRates}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1F2937" opacity={0.4} />
                  <XAxis dataKey="grade" stroke="#9CA3AF" />
                  <YAxis stroke="#9CA3AF" />
                  <ChartTooltip
                    contentStyle={{ backgroundColor: '#0B1117', borderColor: '#1F2937' }}
                    itemStyle={{ color: '#f3f4f6' }}
                  />
                  <Legend verticalAlign="top" height={24} />
                  <Bar dataKey="vision_flag" name="Vision Flag %" fill="#38BDF8" radius={[2, 2, 0, 0]} />
                  <Bar dataKey="dental_flag" name="Dental Flag %" fill="#818CF8" radius={[2, 2, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>

          </div>

        </div>

        {/* Bottom Section: TanStack School Ranking Table */}
        <div className="flex-1 w-full bg-brand-surface/20 border border-brand-border rounded-lg p-4 flex flex-col overflow-hidden">
          <div className="flex items-center justify-between mb-2 pb-2 border-b border-brand-border">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider font-mono flex items-center gap-1.5">
              <Activity className="w-4 h-4 text-brand-primary" /> School-Level Screening Completion & Follow-up Rankings
            </h3>
            <span className="text-[9px] font-mono text-gray-400">Interactive Sorting & Filtering</span>
          </div>

          <div className="flex-1 overflow-hidden">
            {loading ? (
              <div className="w-full h-full flex flex-col items-center justify-center bg-brand-surface/40">
                <RefreshCw className="w-8 h-8 text-brand-primary animate-spin mb-2" />
                <span className="text-sm font-mono text-gray-400">Loading School Performance Data...</span>
              </div>
            ) : (
              <SchoolRankingTable data={filteredSchoolRankings} />
            )}
          </div>
        </div>

      </main>

    </div>
  );
}
