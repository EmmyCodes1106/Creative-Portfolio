import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/animation/reveal";
import { WorkList } from "@/components/projects/work-list";
import { featuredProjects, projectCount } from "@/data/projects";

export function SelectedWorks() {
  return (
    <section
      id="works"
      aria-labelledby="works-title"
      className="section section-rule"
    >
      <div className="container-shell">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-6">
            <p className="mono-label">02 / Selected works</p>
            <h2
              id="works-title"
              className="mt-4 font-display text-section font-medium text-ink"
            >
              Selected works.
            </h2>
          </div>

          <div className="lg:col-span-4">
            <p className="max-w-sm text-sm leading-relaxed text-muted-strong">
              A selection from the collection — a corporate site, a library
              platform, music discovery and a weather app.
            </p>
          </div>

          <div className="lg:col-span-2 lg:justify-self-end">
            <Link
              href="/projects"
              className="link-arrow font-mono text-[0.65rem] uppercase tracking-[0.13em]"
            >
              All projects
              <span className="text-muted">
                ({String(projectCount).padStart(2, "0")})
              </span>
              <ArrowUpRight
                className="size-4"
                strokeWidth={1.6}
                aria-hidden="true"
              />
            </Link>
          </div>
        </div>

        <div className="mt-14">
          <WorkList projects={featuredProjects} />
        </div>

        <Reveal className="mt-16 flex justify-center">
          <Link href="/projects" className="btn btn-ghost">
            Explore the complete collection
            <ArrowUpRight
              className="size-4"
              strokeWidth={1.6}
              aria-hidden="true"
            />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
