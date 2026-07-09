import React, { useState } from "react";
import {
  ArrowRight, Clock, FileText, HeartPulse, MapPin, Menu,
  Music2, ShieldCheck, Sparkles, Zap, Mail, Linkedin, CheckCircle2, X
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { DynamicVisualizer } from "./DynamicVisualizer";

type Stat = { label: string; value: string | number };
type Item = { title: string; body: string; meta?: string };

const ButtonLink = ({ children }: { children: React.ReactNode }) => (
  <button className="inline-flex items-center gap-2 rounded-md bg-neutral-950 px-4 py-2 text-sm font-semibold text-white transition hover:bg-neutral-800">
    {children}
    <ArrowRight className="h-4 w-4" />
  </button>
);

const StatRow = ({ stats }: { stats: Stat[] }) => (
  <div className="grid gap-3 sm:grid-cols-3">
    {stats.map((stat) => (
      <div key={stat.label} className="border-t border-current/20 pt-4">
        <div className="text-2xl font-bold">{stat.value}</div>
        <div className="text-xs uppercase tracking-wide opacity-70">{stat.label}</div>
      </div>
    ))}
  </div>
);

const SectionHeading = ({ kicker, title }: { kicker: string; title: string }) => (
  <div className="max-w-2xl">
    <p className="text-xs font-bold uppercase tracking-[0.22em] text-current/55">{kicker}</p>
    <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">{title}</h2>
  </div>
);

const CardGrid = ({ items }: { items: Item[] }) => (
  <div className="grid gap-4 md:grid-cols-3">
    {items.map((item) => (
      <article key={item.title} className="rounded-lg border border-black/10 bg-white p-5 shadow-sm">
        {item.meta && <p className="text-xs font-semibold uppercase tracking-wide text-neutral-500">{item.meta}</p>}
        <h3 className="mt-2 text-lg font-bold text-neutral-950">{item.title}</h3>
        <p className="mt-2 text-sm leading-6 text-neutral-600">{item.body}</p>
      </article>
    ))}
  </div>
);

// Helper function to map Gemini JSON projects into the CardGrid format
const mapProjects = (projects: any[]): Item[] => {
  return projects.map((p) => ({
    title: p.title,
    body: p.short,
    meta: p.tech ? p.tech[0] : "Project",
  }));
};

// ============================================================================
// 1. YOUR ORIGINAL CLASSIC PORTFOLIO TEMPLATE (Now dynamically data-driven)
// ============================================================================
export function ClassicPortfolioTemplate({ data }: { data: any }) {
  const [activeProject, setActiveProject] = useState<any | null>(null);
  const [navOpen, setNavOpen] = useState(false);

  // Destructure from the database prop instead of local JSON
  const { profile, projects, skills } = data;

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    setNavOpen(false);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 antialiased">
      {/* Permanent, Un-removable Branding Watermark Banner */}
      <div className="sticky top-0 z-50 w-full bg-amber-400 text-slate-950 font-bold text-center py-2 text-xs tracking-wide shadow-sm flex items-center justify-center gap-2">
        <span>⚡ Built with Autopilot Ingestion Engine Prototype</span>
        <a href="/upgrade" className="underline hover:text-slate-800 transition-colors">Remove Watermark ($9.99)</a>
      </div>

      <header className="sticky top-8 z-40 border-b border-slate-200 bg-white/80 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
          <button onClick={() => scrollTo("hero")} className="text-sm font-bold tracking-tight text-slate-900 cursor-pointer">
            {profile.name}
          </button>
          <nav className="hidden gap-8 md:flex">
            {["about", "projects", "skills"].map((id) => (
              <button key={id} onClick={() => scrollTo(id)} className="text-sm font-medium text-slate-600 transition-colors hover:text-cyan-600 capitalize cursor-pointer">
                {id}
              </button>
            ))}
          </nav>
          <button className="md:hidden" onClick={() => setNavOpen(!navOpen)} aria-label="Toggle menu">
            {navOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </header>

      {/* Hero */}
      <section id="hero" className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-24 sm:py-32 lg:py-40">
        <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
          <div className="max-w-3xl">
            <p className="mb-4 inline-block rounded-full border border-cyan-400/30 bg-cyan-400/10 px-3 py-1 text-xs font-medium uppercase tracking-widest text-cyan-300">
              {profile.title}
            </p>
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">{profile.name}</h1>
            <p className="mt-4 text-lg font-medium text-cyan-300 sm:text-xl">{profile.headline}</p>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-slate-300 sm:text-lg">{profile.bio}</p>
          </div>
        </div>
      </section>

      {/* Projects Grid Section */}
      <section id="projects" className="bg-white py-20 sm:py-28">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">Featured Coursework</h2>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((p: any) => (
              <button key={p.id} onClick={() => setActiveProject(p)} className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white text-left shadow-sm transition-all hover:-translate-y-1 hover:border-cyan-400 hover:shadow-lg cursor-pointer">
                <div className="aspect-[16/10] w-full overflow-hidden bg-slate-950">
                  <DynamicVisualizer type={p.visualType} variant={0} />
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="text-lg font-semibold text-slate-900">{p.title}</h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600">{p.short}</p>
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {p.tech.map((t: string) => (
                      <span key={t} className="rounded-md bg-slate-100 px-2 py-1 text-xs font-medium text-slate-700">{t}</span>
                    ))}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Technical Skills Section */}
      <section id="skills" className="py-20 sm:py-28">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">Technical Skills</h2>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {skills.map((g: any) => (
              <div key={g.title} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <h3 className="text-sm font-semibold uppercase tracking-wider text-cyan-600">{g.title}</h3>
                <ul className="mt-4 space-y-2">
                  {g.items.map((s: string) => (
                    <li key={s} className="flex items-start gap-2 text-sm text-slate-700">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-500" />
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer Details */}
      <footer className="bg-slate-950 py-12 text-center text-sm text-slate-500">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© {new Date().getFullYear()} {profile.name}. All rights reserved.</p>
          <div className="flex gap-4">
            <a href={`mailto:${profile.email}`} className="hover:text-cyan-400 transition-colors">Email</a>
            <a href={`https://${profile.linkedin}`} target="_blank" rel="noopener noreferrer" className="hover:text-cyan-400 transition-colors">LinkedIn</a>
          </div>
        </div>
      </footer>

      {/* Context Dialogue Modal */}
      <Dialog open={!!activeProject} onOpenChange={(open) => !open && setActiveProject(null)}>
        <DialogContent className="max-h-[90vh] max-w-3xl overflow-y-auto bg-white p-6 rounded-xl">
          {activeProject && (
            <>
              <DialogHeader>
                <DialogTitle className="text-2xl font-bold">{activeProject.detailHeader}</DialogTitle>
                <DialogDescription className="flex flex-wrap gap-1.5 pt-2">
                  {activeProject.tech.map((t: string) => (
                    <span key={t} className="rounded-md bg-cyan-50 px-2 py-1 text-xs font-medium text-cyan-700">{t}</span>
                  ))}
                </DialogDescription>
              </DialogHeader>
              <div className="mt-4 overflow-hidden rounded-xl border border-slate-200 bg-slate-950 aspect-[16/9]">
                <DynamicVisualizer type={activeProject.visualType} variant={1} />
              </div>
              <p className="mt-5 leading-relaxed text-slate-700">{activeProject.full}</p>
              <div className="mt-6">
                <h4 className="text-sm font-semibold uppercase tracking-wider text-slate-900">Key Deliverables & Milestones</h4>
                <ul className="mt-3 space-y-2">
                  {activeProject.achievements.map((a: string) => (
                    <li key={a} className="flex items-start gap-2 text-sm text-slate-700">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-cyan-600" />
                      <span>{a}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

// ============================================================================
// 2. ADDITIONAL INDUSTRY TEMPLATES
// ============================================================================
export function ArchitectureStudioTemplate({ data }: { data: any }) {
  const projects = mapProjects(data.projects);
  return (
    <main className="min-h-screen bg-stone-100 text-stone-950">
      <header className="border-b border-stone-300 px-6 py-5">
        <nav className="mx-auto flex max-w-7xl items-center justify-between">
          <span className="font-mono text-sm uppercase tracking-[0.3em]">{data.profile.name}</span>
          <Menu className="h-5 w-5" />
        </nav>
      </header>
      <section className="mx-auto grid max-w-7xl gap-8 px-6 py-14 lg:grid-cols-[0.9fr_1.1fr] lg:py-20">
        <div className="flex flex-col justify-between gap-10">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.25em] text-stone-500">{data.profile.title}</p>
            <h1 className="mt-4 text-5xl font-bold leading-none tracking-tight sm:text-7xl">{data.profile.headline}</h1>
          </div>
          <StatRow stats={[{ value: data.projects.length, label: "Completed Projects" }, { value: data.skills.length, label: "Skill Domains" }, { value: "100%", label: "Delivery Rate" }]} />
        </div>
        <div className="min-h-[440px] overflow-hidden rounded-lg border border-stone-300 bg-stone-950">
          <DynamicVisualizer type="architecture" variant={1} density="dense" />
        </div>
      </section>
      <section className="mx-auto max-w-7xl px-6 pb-20">
        <SectionHeading kicker="Selected work" title={data.profile.bio} />
        <div className="mt-8">
          <CardGrid items={projects} />
        </div>
      </section>
    </main>
  );
}

export function MedicalClinicTemplate({ data }: { data: any }) {
  const services = mapProjects(data.projects);
  return (
    <main className="min-h-screen bg-sky-50 text-slate-950">
      <section className="grid min-h-screen lg:grid-cols-[0.85fr_1.15fr]">
        <aside className="flex flex-col justify-between bg-white px-6 py-8 lg:px-10">
          <div className="flex items-center gap-3 text-sm font-bold">
            <HeartPulse className="h-5 w-5 text-cyan-600" />
            {data.profile.name}
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-cyan-700">{data.profile.title}</p>
            <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-6xl">{data.profile.headline}</h1>
            <p className="mt-5 max-w-md leading-7 text-slate-600">{data.profile.bio}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink>Contact Me</ButtonLink>
              <button className="rounded-md border border-slate-300 px-4 py-2 text-sm font-semibold">LinkedIn</button>
            </div>
          </div>
          <StatRow stats={[{ value: data.projects.length, label: "Case Studies" }, { value: "4.9", label: "Quality Rating" }, { value: data.skills.length, label: "Core Competencies" }]} />
        </aside>
        <section className="px-6 py-8 lg:px-10">
          <div className="h-80 overflow-hidden rounded-lg bg-slate-950">
            <DynamicVisualizer type="clinical" variant={2} />
          </div>
          <div className="mt-6">
            <CardGrid items={services} />
          </div>
        </section>
      </section>
    </main>
  );
}

export function SaaSOperationsTemplate({ data }: { data: any }) {
  const features = mapProjects(data.projects);
  return (
    <main className="min-h-screen bg-zinc-100 text-zinc-950">
      <header className="border-b border-zinc-300 bg-white px-6 py-4">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <span className="font-bold">{data.profile.name}</span>
          <button className="rounded-md bg-zinc-950 px-3 py-2 text-sm font-semibold text-white">Contact Me</button>
        </div>
      </header>
      <section className="mx-auto grid max-w-7xl gap-6 px-6 py-10 lg:grid-cols-[0.7fr_1.3fr]">
        <div className="rounded-lg bg-white p-6 shadow-sm">
          <Zap className="h-8 w-8 text-blue-600" />
          <h1 className="mt-5 text-4xl font-bold tracking-tight sm:text-5xl">{data.profile.headline}</h1>
          <p className="mt-4 leading-7 text-zinc-600">{data.profile.bio}</p>
        </div>
        <div className="overflow-hidden rounded-lg bg-zinc-950">
          <DynamicVisualizer type="systems" variant={5} density="dense" />
        </div>
      </section>
      <section className="mx-auto max-w-7xl px-6 pb-20">
        <CardGrid items={features} />
      </section>
    </main>
  );
}

export function IndieGameStudioTemplate({ data }: { data: any }) {
  const updates = mapProjects(data.projects);
  return (
    <main className="min-h-screen bg-indigo-950 text-white">
      <section className="mx-auto max-w-7xl px-6 py-12">
        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="overflow-hidden rounded-lg bg-black">
            <DynamicVisualizer type="game" variant={10} density="dense" />
          </div>
          <div className="flex flex-col justify-center">
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-cyan-300">{data.profile.title}</p>
            <h1 className="mt-4 text-5xl font-black tracking-tight sm:text-7xl">{data.profile.name}</h1>
            <p className="mt-5 text-lg leading-8 text-indigo-100">{data.profile.headline}</p>
            <p className="mt-3 text-sm text-indigo-300">{data.profile.bio}</p>
          </div>
        </div>
      </section>
      <section className="mx-auto max-w-7xl px-6 pb-20 text-zinc-950">
        <CardGrid items={updates} />
      </section>
    </main>
  );
}

export function ClimateConsultancyTemplate({ data }: { data: any }) {
  const offers = mapProjects(data.projects);
  return (
    <main className="min-h-screen bg-teal-50 text-slate-950">
      <section className="mx-auto max-w-7xl px-6 py-12">
        <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="overflow-hidden rounded-lg bg-slate-950">
            <DynamicVisualizer type="climate" variant={14} density="dense" />
          </div>
          <div className="flex flex-col justify-center">
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-teal-700">{data.profile.name}</p>
            <h1 className="mt-4 text-5xl font-bold tracking-tight sm:text-6xl">{data.profile.headline}</h1>
            <p className="mt-5 leading-7 text-slate-700">{data.profile.bio}</p>
          </div>
        </div>
        <div className="mt-10">
          <StatRow stats={[{ value: data.projects.length, label: "Core Projects" }, { value: data.skills.length, label: "Technical Domains" }, { value: "100%", label: "Data Confidence" }]} />
        </div>
      </section>
      <section className="mx-auto max-w-7xl px-6 pb-20">
        <CardGrid items={offers} />
      </section>
    </main>
  );
}

// Fallback implementations for the remaining templates to ensure they compile.
export function RestaurantTemplate({ data }: { data: any }) {
  return <SaaSOperationsTemplate data={data} />;
}
export function NonprofitImpactTemplate({ data }: { data: any }) {
  return <ArchitectureStudioTemplate data={data} />;
}
export function EditorialMagazineTemplate({ data }: { data: any }) {
  return <SaaSOperationsTemplate data={data} />;
}
export function WeddingPlannerTemplate({ data }: { data: any }) {
  return <ClimateConsultancyTemplate data={data} />;
}
export function FitnessCoachTemplate({ data }: { data: any }) {
  return <IndieGameStudioTemplate data={data} />;
}
export function RealEstateAdvisorTemplate({ data }: { data: any }) {
  return <ArchitectureStudioTemplate data={data} />;
}
export function LegalPracticeTemplate({ data }: { data: any }) {
  return <SaaSOperationsTemplate data={data} />;
}
export function ResearchLabTemplate({ data }: { data: any }) {
  return <MedicalClinicTemplate data={data} />;
}
export function MusicProducerTemplate({ data }: { data: any }) {
  return <IndieGameStudioTemplate data={data} />;
}

// Ensure the export matches exactly what Astro will look for from Supabase
export const templateCatalog = [
  { name: "ClassicPortfolioTemplate", industry: "Technology", visualType: "default" },
  { name: "ArchitectureStudioTemplate", industry: "Architecture", visualType: "architecture" },
  { name: "MedicalClinicTemplate", industry: "Healthcare", visualType: "clinical" },
  { name: "RestaurantTemplate", industry: "Restaurant", visualType: "culinary" },
  { name: "NonprofitImpactTemplate", industry: "Nonprofit", visualType: "impact" },
  { name: "SaaSOperationsTemplate", industry: "SaaS", visualType: "systems" },
  { name: "EditorialMagazineTemplate", industry: "Publishing", visualType: "editorial" },
  { name: "WeddingPlannerTemplate", industry: "Events", visualType: "event" },
  { name: "FitnessCoachTemplate", industry: "Fitness", visualType: "cadence" },
  { name: "RealEstateAdvisorTemplate", industry: "Real estate", visualType: "property" },
  { name: "IndieGameStudioTemplate", industry: "Games", visualType: "game" },
  { name: "LegalPracticeTemplate", industry: "Legal", visualType: "legal" },
  { name: "ResearchLabTemplate", industry: "Research", visualType: "research" },
  { name: "MusicProducerTemplate", industry: "Music", visualType: "waveform" },
  { name: "ClimateConsultancyTemplate", industry: "Climate consulting", visualType: "climate" },
] as const;
