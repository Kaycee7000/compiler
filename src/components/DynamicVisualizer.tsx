import React, { useMemo } from "react";

interface DynamicVisualizerProps {
  type?: string;
  variant?: number;
  density?: "quiet" | "normal" | "dense";
  className?: string;
}

type Palette = {
  bg: string;
  ink: string;
  soft: string;
  accent: string;
  accent2: string;
  warm: string;
};

const palettes: [Palette, ...Palette[]] = [
  { bg: "#111827", ink: "#f8fafc", soft: "#334155", accent: "#2dd4bf", accent2: "#f59e0b", warm: "#f97316" },
  { bg: "#18221f", ink: "#f7f4ea", soft: "#40524a", accent: "#84cc16", accent2: "#38bdf8", warm: "#fbbf24" },
  { bg: "#201a2f", ink: "#faf5ff", soft: "#4c3b63", accent: "#fb7185", accent2: "#22d3ee", warm: "#facc15" },
  { bg: "#221915", ink: "#fff7ed", soft: "#574338", accent: "#f97316", accent2: "#14b8a6", warm: "#eab308" },
  { bg: "#0f1f2e", ink: "#eff6ff", soft: "#29435c", accent: "#60a5fa", accent2: "#a3e635", warm: "#f472b6" },
  { bg: "#20231b", ink: "#fafaf9", soft: "#4b5542", accent: "#d9f99d", accent2: "#fb923c", warm: "#fde047" },
];

const modeAliases: Record<string, string> = {
  architecture: "blueprint",
  architect: "blueprint",
  clinic: "clinical",
  medical: "clinical",
  restaurant: "culinary",
  food: "culinary",
  nonprofit: "impact",
  charity: "impact",
  saas: "systems",
  operations: "systems",
  magazine: "editorial",
  editorial: "editorial",
  wedding: "event",
  event: "event",
  fitness: "cadence",
  wellness: "cadence",
  realestate: "property",
  property: "property",
  game: "game",
  legal: "brief",
  lab: "research",
  research: "research",
  music: "waveform",
  audio: "waveform",
  climate: "terrain",
  energy: "terrain",
  cicd: "systems",
  ml: "research",
  database: "systems",
  cyber: "network",
};

function hash(input: string) {
  let value = 2166136261;
  for (let i = 0; i < input.length; i += 1) {
    value ^= input.charCodeAt(i);
    value = Math.imul(value, 16777619);
  }
  return value >>> 0;
}

function randomSeries(seed: number, count: number, min = 0, max = 1) {
  let state = seed || 1;
  return Array.from({ length: count }, () => {
    state = Math.imul(1664525, state) + 1013904223;
    const normalized = ((state >>> 0) % 10000) / 10000;
    return min + normalized * (max - min);
  });
}

function pathFromPoints(points: Array<[number, number]>, close = false) {
  const [first, ...rest] = points;
  if (!first) return "";
  return `M ${first[0].toFixed(1)} ${first[1].toFixed(1)} ${rest
    .map(([x, y]) => `L ${x.toFixed(1)} ${y.toFixed(1)}`)
    .join(" ")}${close ? " Z" : ""}`;
}

function useVisualModel(type = "systems", variant = 0, density: DynamicVisualizerProps["density"] = "normal") {
  return useMemo(() => {
    const normalized = modeAliases[type.toLowerCase().replace(/[^a-z]/g, "")] ?? type.toLowerCase();
    const seed = hash(`${normalized}:${variant}:${density}`);
    const count = density === "dense" ? 22 : density === "quiet" ? 9 : 15;
    const palette = palettes[(seed + variant) % palettes.length];
    return {
      mode: normalized,
      seed,
      count,
      palette,
      values: randomSeries(seed, count, 0, 1),
      altValues: randomSeries(seed ^ 0x9e3779b9, count, 0, 1),
    };
  }, [type, variant, density]);
}

function Background({ palette }: { palette: Palette }) {
  return (
    <>
      <rect width="640" height="400" fill={palette.bg} />
      <path d="M0 310 C120 250 200 360 320 300 C450 230 520 320 640 250 L640 400 L0 400 Z" fill={palette.soft} opacity="0.32" />
      <g opacity="0.14">
        {Array.from({ length: 12 }, (_, index) => (
          <line key={index} x1={index * 58} y1="0" x2={index * 58 - 120} y2="400" stroke={palette.ink} strokeWidth="1" />
        ))}
      </g>
    </>
  );
}

function Blueprint({ values, palette }: ReturnType<typeof useVisualModel>) {
  return (
    <g>
      <rect x="92" y="56" width="428" height="258" fill="none" stroke={palette.accent} strokeWidth="4" />
      <rect x="136" y="96" width="122" height="78" fill="none" stroke={palette.ink} strokeWidth="2" opacity="0.75" />
      <rect x="302" y="96" width="148" height="142" fill="none" stroke={palette.ink} strokeWidth="2" opacity="0.75" />
      <path d="M258 134 H302 M202 174 V238 H450" fill="none" stroke={palette.accent2} strokeWidth="3" />
      {values.slice(0, 8).map((value, index) => (
        <circle key={index} cx={118 + index * 58} cy={330} r={4 + value * 8} fill={palette.warm} opacity="0.8" />
      ))}
    </g>
  );
}

function Clinical({ values, palette }: ReturnType<typeof useVisualModel>) {
  const points = values.map((value, index) => [70 + index * 36, 204 - value * 96] as [number, number]);
  return (
    <g>
      <rect x="74" y="70" width="492" height="246" rx="20" fill={palette.ink} opacity="0.08" stroke={palette.accent} />
      <path d={pathFromPoints(points)} fill="none" stroke={palette.accent} strokeWidth="5" strokeLinecap="round" />
      <path d="M292 122 H348 M320 94 V150" stroke={palette.accent2} strokeWidth="14" strokeLinecap="round" />
      {values.slice(0, 10).map((value, index) => (
        <rect key={index} x={102 + index * 44} y={246 - value * 52} width="24" height={20 + value * 52} rx="6" fill={index % 2 ? palette.warm : palette.soft} />
      ))}
    </g>
  );
}

function Culinary({ values, palette }: ReturnType<typeof useVisualModel>) {
  return (
    <g>
      <circle cx="320" cy="200" r="118" fill={palette.ink} opacity="0.12" stroke={palette.accent} strokeWidth="4" />
      <circle cx="320" cy="200" r="72" fill={palette.bg} stroke={palette.ink} opacity="0.9" />
      {values.slice(0, 12).map((value, index) => {
        const angle = (Math.PI * 2 * index) / 12;
        return <circle key={index} cx={320 + Math.cos(angle) * (92 + value * 18)} cy={200 + Math.sin(angle) * (92 + value * 18)} r={6 + value * 10} fill={index % 3 === 0 ? palette.warm : index % 3 === 1 ? palette.accent : palette.accent2} />;
      })}
      <path d="M188 96 C210 122 210 152 188 178 M452 96 C430 122 430 152 452 178" stroke={palette.ink} strokeWidth="5" opacity="0.55" fill="none" />
    </g>
  );
}

function Impact({ values, palette }: ReturnType<typeof useVisualModel>) {
  return (
    <g>
      {values.slice(0, 9).map((value, index) => (
        <circle key={index} cx={150 + (index % 3) * 170} cy={104 + Math.floor(index / 3) * 94} r={24 + value * 28} fill={index % 2 ? palette.accent2 : palette.accent} opacity="0.76" />
      ))}
      <path d="M150 104 L320 198 L490 104 M150 292 L320 198 L490 292 M150 104 V292 M490 104 V292" stroke={palette.ink} strokeWidth="3" opacity="0.32" />
    </g>
  );
}

function Systems({ values, palette }: ReturnType<typeof useVisualModel>) {
  return (
    <g>
      {values.slice(0, 8).map((value, index) => (
        <g key={index}>
          <rect x={76 + index * 64} y={92 + (index % 2) * 80} width="48" height="48" rx="10" fill={palette.soft} stroke={index % 2 ? palette.accent2 : palette.accent} strokeWidth="3" />
          {index < 7 && <path d={`M${124 + index * 64} ${116 + (index % 2) * 80} C${152 + index * 64} ${value * 180 + 80}, ${164 + index * 64} ${240 - value * 120}, ${188 + index * 64} ${196 - (index % 2) * 80}`} fill="none" stroke={palette.ink} strokeWidth="2" opacity="0.5" />}
        </g>
      ))}
      <rect x="148" y="292" width="344" height="28" rx="14" fill={palette.accent} opacity="0.85" />
    </g>
  );
}

function Editorial({ values, palette }: ReturnType<typeof useVisualModel>) {
  return (
    <g>
      <rect x="92" y="58" width="456" height="284" fill={palette.ink} opacity="0.1" stroke={palette.ink} strokeWidth="2" />
      <rect x="124" y="92" width="176" height="216" fill={palette.accent} opacity="0.85" />
      {values.slice(0, 8).map((value, index) => (
        <rect key={index} x="328" y={94 + index * 25} width={92 + value * 128} height="9" rx="4" fill={index === 0 ? palette.warm : palette.ink} opacity={index === 0 ? 0.95 : 0.55} />
      ))}
      <circle cx="212" cy="200" r="48" fill={palette.bg} opacity="0.86" />
    </g>
  );
}

function Event({ values, palette }: ReturnType<typeof useVisualModel>) {
  return (
    <g>
      <path d="M126 308 C220 92 420 92 514 308" fill="none" stroke={palette.accent} strokeWidth="8" />
      <path d="M168 310 C246 156 394 156 472 310" fill="none" stroke={palette.ink} strokeWidth="2" opacity="0.55" />
      {values.slice(0, 14).map((value, index) => (
        <circle key={index} cx={120 + index * 31} cy={120 + Math.sin(index * 0.9) * 38 + value * 24} r={5 + value * 9} fill={index % 2 ? palette.warm : palette.accent2} />
      ))}
    </g>
  );
}

function Cadence({ values, palette }: ReturnType<typeof useVisualModel>) {
  const bars = values.slice(0, 14);
  return (
    <g>
      <path d="M78 220 C170 100 220 294 312 176 S482 90 562 218" fill="none" stroke={palette.accent} strokeWidth="8" strokeLinecap="round" />
      {bars.map((value, index) => (
        <rect key={index} x={88 + index * 34} y={250 - value * 128} width="16" height={54 + value * 128} rx="8" fill={index % 3 === 0 ? palette.warm : palette.ink} opacity="0.72" />
      ))}
      <circle cx="320" cy="178" r="34" fill={palette.accent2} opacity="0.9" />
    </g>
  );
}

function Property({ values, palette }: ReturnType<typeof useVisualModel>) {
  return (
    <g>
      {[0, 1, 2, 3].map((index) => (
        <g key={index} transform={`translate(${96 + index * 118} ${112 + (index % 2) * 44})`}>
          <path d="M0 54 L48 12 L96 54 V144 H0 Z" fill={palette.soft} stroke={index % 2 ? palette.accent2 : palette.accent} strokeWidth="3" />
          <rect x="18" y="76" width="22" height="28" fill={palette.ink} opacity="0.42" />
          <rect x="58" y="76" width="22" height="28" fill={palette.ink} opacity="0.42" />
        </g>
      ))}
      <path d={pathFromPoints(values.slice(0, 8).map((value, index) => [92 + index * 68, 330 - value * 72] as [number, number]))} fill="none" stroke={palette.warm} strokeWidth="5" />
    </g>
  );
}

function Game({ values, palette }: ReturnType<typeof useVisualModel>) {
  return (
    <g>
      <rect x="112" y="70" width="416" height="260" rx="18" fill={palette.ink} opacity="0.12" stroke={palette.accent2} strokeWidth="4" />
      {values.slice(0, 18).map((value, index) => (
        <rect key={index} x={132 + (index % 6) * 62} y={96 + Math.floor(index / 6) * 66} width={30 + value * 22} height={30 + value * 22} rx="6" fill={index % 4 === 0 ? palette.warm : index % 4 === 1 ? palette.accent : palette.soft} />
      ))}
      <path d="M218 264 H302 M260 222 V306 M398 244 h.1 M438 284 h.1" stroke={palette.ink} strokeWidth="12" strokeLinecap="round" />
    </g>
  );
}

function Brief({ values, palette }: ReturnType<typeof useVisualModel>) {
  return (
    <g>
      <rect x="136" y="74" width="368" height="252" rx="10" fill={palette.ink} opacity="0.1" stroke={palette.accent} strokeWidth="3" />
      <path d="M188 136 H452 M188 178 H452 M188 220 H390" stroke={palette.ink} strokeWidth="10" strokeLinecap="round" opacity="0.58" />
      <path d="M280 276 H360 M320 142 V276" stroke={palette.warm} strokeWidth="5" />
      {values.slice(0, 5).map((value, index) => (
        <circle key={index} cx={174 + index * 74} cy={104} r={5 + value * 7} fill={palette.accent2} />
      ))}
    </g>
  );
}

function Research({ values, palette }: ReturnType<typeof useVisualModel>) {
  return (
    <g>
      {values.slice(0, 11).map((value, index) => {
        const x = 110 + (index % 4) * 130 + value * 18;
        const y = 82 + Math.floor(index / 4) * 92 + value * 24;
        return <circle key={index} cx={x} cy={y} r={14 + value * 18} fill="none" stroke={index % 2 ? palette.accent2 : palette.accent} strokeWidth="4" />;
      })}
      <path d="M192 154 C238 116 298 130 322 182 S428 252 506 190" fill="none" stroke={palette.ink} strokeWidth="3" opacity="0.6" />
      <rect x="108" y="292" width="424" height="28" rx="14" fill={palette.soft} />
    </g>
  );
}

function Waveform({ values, palette }: ReturnType<typeof useVisualModel>) {
  const center = 200;
  return (
    <g>
      {values.map((value, index) => (
        <rect key={index} x={74 + index * 32} y={center - value * 116} width="16" height={value * 232} rx="8" fill={index % 4 === 0 ? palette.warm : index % 4 === 1 ? palette.accent2 : palette.accent} opacity="0.86" />
      ))}
      <circle cx="320" cy="200" r="54" fill={palette.bg} stroke={palette.ink} strokeWidth="5" opacity="0.92" />
      <circle cx="320" cy="200" r="12" fill={palette.ink} />
    </g>
  );
}

function Terrain({ values, altValues, palette }: ReturnType<typeof useVisualModel>) {
  const ridge = values.map((value, index) => [40 + index * 42, 252 - value * 126] as [number, number]);
  const lower = altValues.map((value, index) => [40 + index * 42, 318 - value * 72] as [number, number]);
  return (
    <g>
      <path d={`${pathFromPoints(ridge)} L640 400 L0 400 Z`} fill={palette.accent} opacity="0.64" />
      <path d={`${pathFromPoints(lower)} L640 400 L0 400 Z`} fill={palette.accent2} opacity="0.46" />
      <path d={pathFromPoints(ridge)} fill="none" stroke={palette.ink} strokeWidth="3" opacity="0.7" />
      <circle cx="514" cy="94" r="36" fill={palette.warm} opacity="0.9" />
    </g>
  );
}

function Network({ values, palette }: ReturnType<typeof useVisualModel>) {
  const nodes = values.slice(0, 12).map((value, index) => {
    const angle = (Math.PI * 2 * index) / 12;
    return [320 + Math.cos(angle) * (96 + value * 92), 200 + Math.sin(angle) * (64 + value * 78), value] as const;
  });
  return (
    <g>
      {nodes.map(([x, y], index) => nodes.slice(index + 1, index + 4).map(([x2, y2], subIndex) => <line key={`${index}-${subIndex}`} x1={x} y1={y} x2={x2} y2={y2} stroke={palette.ink} strokeWidth="2" opacity="0.18" />))}
      {nodes.map(([x, y, value], index) => (
        <circle key={index} cx={x} cy={y} r={10 + value * 15} fill={index % 3 === 0 ? palette.accent2 : palette.accent} />
      ))}
      <circle cx="320" cy="200" r="32" fill={palette.warm} />
    </g>
  );
}

export function DynamicVisualizer({ type = "systems", variant = 0, density = "normal", className = "" }: DynamicVisualizerProps) {
  const model = useVisualModel(type, variant, density);
  const renderers: Record<string, React.ReactNode> = {
    blueprint: <Blueprint {...model} />,
    clinical: <Clinical {...model} />,
    culinary: <Culinary {...model} />,
    impact: <Impact {...model} />,
    systems: <Systems {...model} />,
    editorial: <Editorial {...model} />,
    event: <Event {...model} />,
    cadence: <Cadence {...model} />,
    property: <Property {...model} />,
    game: <Game {...model} />,
    brief: <Brief {...model} />,
    research: <Research {...model} />,
    waveform: <Waveform {...model} />,
    terrain: <Terrain {...model} />,
    network: <Network {...model} />,
  };
  const render = renderers[model.mode] ?? <Network {...model} />;

  return (
    <svg viewBox="0 0 640 400" className={`h-full w-full ${className}`} preserveAspectRatio="xMidYMid slice" role="img" aria-label={`${model.mode} generated visual`}>
      <Background palette={model.palette} />
      {render}
    </svg>
  );
}

export default DynamicVisualizer;
