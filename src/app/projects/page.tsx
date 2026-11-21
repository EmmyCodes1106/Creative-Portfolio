import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/animation/reveal";
import { ProjectCard } from "@/components/projects/project-card";
import { projectCount, projects } from "@/data/projects";

const title = "All projects";
const description =
  "The complete project collection from Fadayomi Emmanuel — privacy tools, library management, music discovery, a corporate website and a weather app.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/projects" },
  openGraph: {
    title: `${title} — EmmyCodes`,
    description,
    url: "/projects",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${title} — EmmyCodes`,
    description,
  },
};

export default function ProjectsPage() {
  return (
    <>
      <section className="pb-14 pt-32 sm:pt-36 lg:pt-40">
        <div className="container-shell">
          <Link
            href="/"
            className="link-arrow font-mono text-[0.65rem] uppercase tracking-[0.13em] text-muted-strong"
          >
            <ArrowLeft className="size-4" strokeWidth={1.6} aria-hidden="true" />
            Back home
          </Link>

          <div className="mt-10 grid gap-8 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-7">
              <p className="mono-label">Project archive</p>
              <h1 className="mt-4 font-display text-display font-medium text-ink">
                All projects.
              </h1>
            </div>

            <div className="lg:col-span-5">
              <p className="max-w-md text-sm leading-relaxed text-muted-strong sm:text-base">
                Every project documented so far —{" "}
                {String(projectCount).padStart(2, "0")} in total. The gallery and
                the case studies read from one data source, so new work slots in
                without redesigning the page.
              </p>
              <p className="mt-5 border border-dashed border-line-strong px-4 py-3 text-xs leading-relaxed text-muted-strong">
                <span className="font-mono text-[0.6rem] uppercase tracking-[0.12em] text-accent-ink">
                  Note{" "}
                </span>
                Items marked &ldquo;to be confirmed&rdquo; are clearly
                identified placeholders waiting on verified project
                information.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section aria-label="Project collection" className="pb-24">
        <div className="container-shell">
          <Reveal
            stagger={0.08}
            className="grid gap-x-8 gap-y-14 md:grid-cols-2 xl:grid-cols-3"
          >
            {projects.map((project, index) => (
              <ProjectCard
                key={project.slug}
                project={project}
                index={index}
              />
            ))}
          </Reveal>

          <div className="mt-20 flex flex-col items-start justify-between gap-6 border-t border-line pt-8 sm:flex-row sm:items-center">
            <p className="text-sm text-muted-strong">
              Have a project or role in mind?
            </p>
            <Link href="/#contact" className="btn btn-ghost">
              Start a conversation
              <ArrowUpRight
                className="size-4"
                strokeWidth={1.6}
                aria-hidden="true"
              />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
