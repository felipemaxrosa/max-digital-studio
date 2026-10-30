"use client";

import Link from "next/link";
import { GlassMockup, TechBadge } from "@/components/ui";
import { ArrowRightIcon } from "@/components/icons";
import { METRICS, type Project } from "@/lib/portfolio";
import { track, EVENTS } from "@/lib/analytics";

type Props = {
  project: Project;
  detailed?: boolean;
  priority?: boolean;
};

export function CaseCard({ project, detailed = false, priority = false }: Props) {
  const m = METRICS[project.slug];
  const hasMetrics = m && m.performance > 0;

  return (
    <div className="group flex h-full flex-col gap-5">
      <GlassMockup
        src={`/portfolio/${project.slug}-desktop.png`}
        alt={`Prévia do projeto ${project.name}`}
        priority={priority}
        className="transition-[transform,border-color] duration-300 group-hover:-translate-y-1.5 group-hover:border-[color:color-mix(in_srgb,var(--color-accent)_45%,var(--color-border-glass))]"
      />
      <div className="flex flex-1 flex-col gap-3 px-0.5">
        <TechBadge>{project.niche}</TechBadge>
        <h3 className="text-lg font-bold">{project.name}</h3>

        {detailed && (
          <p className="text-sm leading-relaxed text-[var(--color-muted)]">
            <span className="font-medium text-[var(--color-ink)]">Desafio: </span>
            {project.challenge}
          </p>
        )}
        <p className="text-sm leading-relaxed text-[var(--color-muted)]">
          <span className="font-medium text-[var(--color-ink)]">Solução: </span>
          {project.solution}
        </p>

        {hasMetrics && (
          <div className="flex flex-wrap gap-x-4 gap-y-1 pt-1 font-mono text-[0.7rem] tracking-wide text-[var(--color-muted)]">
            <span>
              <span className="text-[var(--color-cyan)]">PERF</span> {m.performance}
            </span>
            <span>
              <span className="text-[var(--color-cyan)]">A11Y</span> {m.accessibility}
            </span>
            <span>
              <span className="text-[var(--color-cyan)]">PRÁTICAS</span> {m.bestPractices}
            </span>
            <span>
              <span className="text-[var(--color-cyan)]">SEO</span> {m.seo}
            </span>
          </div>
        )}

        <Link
          href={project.url}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => track(EVENTS.portfolioView, { project: project.slug })}
          className="mt-auto inline-flex w-fit items-center gap-1.5 pt-2 text-sm font-medium text-[var(--color-cyan)] underline-offset-4 hover:underline"
        >
          Ver Demonstração Ao Vivo <ArrowRightIcon className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}
