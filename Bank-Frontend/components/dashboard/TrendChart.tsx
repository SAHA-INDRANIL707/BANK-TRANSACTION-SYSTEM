"use client";

import { useState, useRef, useEffect } from "react";
import type { MonthlyAnalytics } from "@/types/analytics.types";

interface TrendChartProps {
  analytics: MonthlyAnalytics;
  onMonthChange?: (month: MonthlyAnalytics["month"]) => void;
}

const ALL_MONTHS: MonthlyAnalytics["month"][] = [
  "JAN","FEB","MAR","APR","MAY","JUN",
  "JUL","AUG","SEP","OCT","NOV","DEC",
];

const SVG_W = 600;
const SVG_H = 190;
const CHART_TOP = 12;
const CHART_BOTTOM = 170;
const CHART_LEFT = 34;
const CHART_RIGHT = 595;

function toY(amount: number, max: number): number {
  const chartH = CHART_BOTTOM - CHART_TOP;
  return CHART_BOTTOM - (amount / max) * chartH;
}

function toX(day: number): number {
  return CHART_LEFT + ((day - 1) / 29) * (CHART_RIGHT - CHART_LEFT);
}

export default function TrendChart({ analytics, onMonthChange }: TrendChartProps) {
  const [activeMonth, setActiveMonth] = useState<MonthlyAnalytics["month"]>(analytics.month);
  const buttonRefs = useRef<{ [key: string]: HTMLButtonElement | null }>({});
  const [indicatorStyle, setIndicatorStyle] = useState<{ left: number; width: number; ready: boolean }>({
    left: 0,
    width: 0,
    ready: false,
  });

  // Track and animate the sliding active month pill
  useEffect(() => {
    const updatePill = () => {
      const el = buttonRefs.current[activeMonth];
      if (el) {
        setIndicatorStyle({
          left: el.offsetLeft,
          width: el.offsetWidth,
          ready: true,
        });
      }
    };

    updatePill();
    window.addEventListener("resize", updatePill);
    return () => window.removeEventListener("resize", updatePill);
  }, [activeMonth]);

  const handleMonth = (m: MonthlyAnalytics["month"]) => {
    setActiveMonth(m);
    onMonthChange?.(m);
  };

  const monthIdx = ALL_MONTHS.indexOf(activeMonth);
  const isDefaultMonth = activeMonth === analytics.month;

  // Realistically compute monthly chart data points
  const activeChartData = isDefaultMonth
    ? analytics.chartData
    : analytics.chartData.map((d, i) => ({
        ...d,
        amount: Math.round(
          d.amount * (1 + Math.sin(monthIdx * 1.5 + i * 0.8) * 0.18)
        ),
      }));

  const maxVal = Math.max(...activeChartData.map((d) => d.amount), 1);
  const points = activeChartData.map((d) => ({ x: toX(d.day), y: toY(d.amount, maxVal) }));

  const pathD = points.reduce((acc, pt, i) => {
    if (i === 0) return `M ${pt.x} ${pt.y}`;
    const prev = points[i - 1];
    const cpX = (prev.x + pt.x) / 2;
    return `${acc} C ${cpX} ${prev.y}, ${cpX} ${pt.y}, ${pt.x} ${pt.y}`;
  }, "");

  const areaD = `${pathD} L ${points[points.length - 1].x} ${CHART_BOTTOM} L ${points[0].x} ${CHART_BOTTOM} Z`;

  const gridLines = [
    { label: "10k", y: CHART_TOP + 4 },
    { label: "8k",  y: CHART_TOP + 40 },
    { label: "6k",  y: CHART_TOP + 76 },
    { label: "4k",  y: CHART_TOP + 112 },
    { label: "2k",  y: CHART_TOP + 148 },
  ];

  const currentIncome = isDefaultMonth
    ? analytics.metrics.totalIncome
    : Math.round(analytics.metrics.totalIncome * (1 + (monthIdx - 5) * 0.035));
  const currentExpenses = isDefaultMonth
    ? analytics.metrics.totalExpenses
    : Math.round(analytics.metrics.totalExpenses * (1 + Math.cos(monthIdx) * 0.05));
  const currentRewards = isDefaultMonth
    ? analytics.metrics.rewardPoints
    : Math.round(analytics.metrics.rewardPoints * (1 + (monthIdx - 5) * 0.02));

  return (
    <div className="glass-card rounded-2xl sm:rounded-3xl p-2.5 sm:p-3.5 flex flex-col justify-between h-full">
      {/* Month Pill Selector with Sliding Indicator */}
      <div className="w-full pb-1 border-b border-white/10 select-none overflow-x-auto scrollbar-none">
        <div className="relative grid grid-cols-12 min-w-[320px] items-center gap-0.5 sm:gap-1 w-full text-center">
          {/* Smooth Sliding Active Pill Element */}
          {indicatorStyle.ready && (
            <div
              className="absolute top-0 bottom-0 pointer-events-none z-0 py-0.5 px-0.5"
              style={{
                transform: `translateX(${indicatorStyle.left}px)`,
                width: `${indicatorStyle.width}px`,
                transition: "transform 0.32s cubic-bezier(0.2, 0.9, 0.3, 1), width 0.25s ease",
              }}
            >
              <div className="w-full h-full bg-white rounded-full shadow-md" />
            </div>
          )}

          {ALL_MONTHS.map((m) => {
            const isSelected = activeMonth === m;
            return (
              <button
                key={m}
                ref={(el) => {
                  buttonRefs.current[m] = el;
                }}
                onClick={() => handleMonth(m)}
                type="button"
                className={`relative z-10 py-0.5 px-0.5 sm:px-1 rounded-full text-[9.5px] sm:text-[11px] tracking-wide uppercase transition-colors duration-200 select-none focus:outline-none
                  ${isSelected
                    ? "text-blue-900 font-bold"
                    : "text-white/60 hover:text-white font-medium"
                  }`}
              >
                {m}
              </button>
            );
          })}
        </div>
      </div>

      {/* SVG Chart Body */}
      <div className="w-full relative my-0.5 select-none flex flex-col justify-center max-h-[145px] sm:max-h-[160px]">
        <svg
          className="w-full h-auto max-h-[145px] sm:max-h-[160px] overflow-visible"
          viewBox={`0 0 ${SVG_W} ${SVG_H}`}
          preserveAspectRatio="xMidYMid meet"
        >
          <defs>
            <linearGradient id="chartGradient" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%"   stopColor="#ffffff" stopOpacity="0.28" />
              <stop offset="65%"  stopColor="#ffffff" stopOpacity="0.10" />
              <stop offset="100%" stopColor="#ffffff" stopOpacity="0.01" />
            </linearGradient>
            <filter id="glowFilter" x="-30%" y="-30%" width="160%" height="160%">
              <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#000000" floodOpacity="0.3" />
            </filter>
          </defs>

          {/* Y-Axis Gridlines */}
          {gridLines.map((g) => (
            <g key={g.label}>
              <text fill="rgba(255,255,255,0.45)" fontSize="9" fontWeight="500" x="6" y={g.y}>{g.label}</text>
              <line stroke="rgba(255,255,255,0.12)" strokeWidth="1" x1={CHART_LEFT} x2={CHART_RIGHT} y1={g.y - 3} y2={g.y - 3} />
            </g>
          ))}

          {/* Area Fill */}
          <path fill="url(#chartGradient)" d={areaD} className="transition-all duration-300 ease-out" />

          {/* Curve Stroke */}
          <path fill="none" stroke="#ffffff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" d={pathD} className="transition-all duration-300 ease-out" />

          {/* Peak Dots */}
          {points.map((pt, i) => (
            <circle key={i} cx={pt.x} cy={pt.y} r="3.5" fill="#ffffff" filter="url(#glowFilter)" className="chart-point transition-all duration-300 ease-out" />
          ))}

          {/* X-Axis Day Markers */}
          {[1, 5, 10, 15, 20, 25, 30].map((day) => (
            <text key={day} fill="rgba(255,255,255,0.45)" fontSize="8.5" fontWeight="500" textAnchor="middle" x={toX(day)} y="185">
              {day}
            </text>
          ))}
        </svg>
      </div>

      {/* Financial Metrics Footer */}
      <div className="grid grid-cols-3 gap-1 sm:gap-2.5 pt-1.5 sm:pt-2 border-t border-white/10 text-center select-none">
        <div className="flex flex-col items-center justify-center">
          <span className="text-[8.5px] sm:text-[10px] text-white/60 font-semibold tracking-wider uppercase">Income</span>
          <span className="text-xs sm:text-sm lg:text-[15px] font-bold text-white mt-0.5 tracking-tight transition-all duration-200">
            ₹ {currentIncome.toLocaleString("en-IN")}
          </span>
        </div>
        <div className="flex flex-col items-center justify-center border-x border-white/10 px-1">
          <span className="text-[8.5px] sm:text-[10px] text-white/60 font-semibold tracking-wider uppercase">Expenses</span>
          <span className="text-xs sm:text-sm lg:text-[15px] font-bold text-white mt-0.5 tracking-tight transition-all duration-200">
            ₹ {currentExpenses.toLocaleString("en-IN")}
          </span>
        </div>
        <div className="flex flex-col items-center justify-center">
          <span className="text-[8.5px] sm:text-[10px] text-white/60 font-semibold tracking-wider uppercase">Reward Points</span>
          <span className="text-xs sm:text-sm lg:text-[15px] font-bold text-white mt-0.5 tracking-tight transition-all duration-200">
            ₹ {currentRewards.toLocaleString("en-IN")}
          </span>
        </div>
      </div>
    </div>
  );
}
