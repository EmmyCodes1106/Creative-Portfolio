import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/data/projects";
import { ProjectVisual } from "@/components/projects/project-visual";
import { cn } from "@/lib/utils";

type ProjectCardProps = {
  project: Project;
  index?: number;
  className?: string;
};

export function ProjectCard({ project, index = 0, className }: ProjectCardProps) {
  const titleId = `project-${project.slug}-title`;

  return (
    <article className={cn("project-card group relative h-full", className)}>
      <Link
        href={`/projects/${project.slug}`}
        aria-labelledby={titleId}
        data-cursor="view"
        data-cursor-label="View case study"
        className="flex h-full flex-col"
      >
        <div className="relative aspect-[4/3] overflow-hidden border border-line bg-surface-2">
          <div className="project-visual-inner h-full w-full">
            <ProjectVisual
              title={project.title}
              monogram={project.monogram}
              hue={project.hue}
              variant={index}
              src={project.image}
            />
          </div>
        </div>

        <div className="mt-5 flex items-start justify-between gap-6">
          <div>
            <p className="flex items-center gap-2 font-mono text-[0.62rem] uppercase tracking-[0.14em] text-muted-strong">
              <span
                aria-hidden="true"
                className="size-1 rounded-full bg-accent"
              />
              {project.category}
            </p>
            <h3
              id={titleId}
              className="mt-2 font-display text-title font-medium text-ink"
            >
              {project.title}
            </h3>
          </div>
          <ArrowUpRight
            className="project-card-arrow mt-1 size-5 shrink-0 text-muted"
            strokeWidth={1.5}
            aria-hidden="true"
          />
        </div>

        <p className="mt-3 line-clamp-3 min-h-[3.9rem] max-w-lg text-sm leading-relaxed text-muted-strong">
          {project.summary}
        </p>

        <div className="mt-4 flex flex-wrap gap-1.5">
          {project.stack.length > 0 ? (
            <>
              {project.stack.slice(0, 4).map((tech) => (
                <span
                  key={tech}
                  className="border border-line px-2 py-1 font-mono text-[0.6rem] uppercase tracking-[0.08em] text-muted-strong"
                >
                  {tech}
                </span>
              ))}
              {project.stack.length > 4 ? (
                <span className="border border-dashed border-line px-2 py-1 font-mono text-[0.6rem] uppercase tracking-[0.08em] text-muted">
                  +{project.stack.length - 4}
                </span>
              ) : null}
            </>
          ) : (
            <span className="placeholder-chip">Stack — to be confirmed</span>
          )}
        </div>

        <span className="mt-auto inline-flex items-center gap-2 pt-4 font-mono text-[0.63rem] uppercase tracking-[0.13em] text-accent-ink">
          View case study
          <span
            aria-hidden="true"
            className="h-px w-6 bg-current transition-all duration-300 group-hover:w-9"
          />
        </span>
      </Link>
    </article>
  );
}
