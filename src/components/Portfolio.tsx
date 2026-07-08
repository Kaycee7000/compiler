import React, { useState } from "react";
import { Mail, Linkedin, ArrowRight, CheckCircle2, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { DynamicVisualizer } from "./DynamicVisualizer";
import portfolioData from "../data/portfolio.json";

export default function Portfolio() {
  const [activeProject, setActiveProject] = useState<any | null>(null);
  const [navOpen, setNavOpen] = useState(false);

  const { profile, projects, skills } = portfolioData;

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
            {projects.map((p) => (
              <button key={p.id} onClick={() => setActiveProject(p)} className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white text-left shadow-sm transition-all hover:-translate-y-1 hover:border-cyan-400 hover:shadow-lg cursor-pointer">
                <div className="aspect-[16/10] w-full overflow-hidden bg-slate-950">
                  <DynamicVisualizer type={p.visualType} variant={0} />
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="text-lg font-semibold text-slate-900">{p.title}</h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600">{p.short}</p>
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {p.tech.map((t) => (
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
            {skills.map((g) => (
              <div key={g.title} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <h3 className="text-sm font-semibold uppercase tracking-wider text-cyan-600">{g.title}</h3>
                <ul className="mt-4 space-y-2">
                  {g.items.map((s) => (
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
