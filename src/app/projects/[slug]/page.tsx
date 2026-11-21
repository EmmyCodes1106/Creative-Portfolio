import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Clock,
  ExternalLink,
} from "lucide-react";
import { ProjectVisual } from "@/components/projects/project-visual";
import { CaseToc } from "@/components/projects/case-toc";
import {
  getAdjacentProjects,
  getProject,
  projects,
} from "@/data/projects";

type ProjectPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) {
    notFound();
  }

  return {
    title: project.title,
    description: project.summary,
    alternates: { canonical: `/projects/${project.slug}` },
    openGraph: {
      type: "article",
      title: `${project.title} — EmmyCodes`,
      description: project.summary,
      url: `/projects/${project.slug}`,
    },
    twitter: {
      card: "summary_large_image",
      title: `${project.title} — EmmyCodes`,
      description: project.summary,
    },
  };
}

function CaseSection({
  id,
  label,
  title,
  children,
}: {
  id: string;
  label: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      className="scroll-mt-28 border-t border-line pt-8"
    >
      <p className="mono-label">{label}</p>
      <h2
        id={`${id}-title`}
        className="mt-2 font-display text-2xl font-medium tracking-[-0.03em] text-ink sm:text-3xl"
      >
        {title}
      </h2>
      <div className="mt-5">{children}</div>
    </section>
  );
}

function PlaceholderPanel({ children }: { children: ReactNode }) {
  return (
    <div className="border border-dashed border-line-strong p-5">
      <span className="placeholder-chip">To be confirmed</span>
      <div className="mt-3 text-sm leading-relaxed text-muted-strong">
        {children}
      </div>
    </div>
  );
}

function LinkCard({
  label,
  href,
  placeholder,
}: {
  label: string;
  href: string | null;
  placeholder: string;
}) {
  if (href) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="group flex flex-col justify-between gap-6 border border-line bg-surface p-5 transition-colors hover:border-line-strong"
      >
        <p className="mono-label">{label}</p>
        <span className="flex items-center justify-between gap-4 text-sm text-ink">
          Open link
          <ExternalLink
            className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            strokeWidth={1.5}
            aria-hidden="true"
          />
        </span>
      </a>
    );
  }

  return (
    <div className="flex flex-col justify-between gap-6 border border-dashed border-line-strong p-5">
      <div>
        <p className="mono-label">{label}</p>
        <p className="mt-2 text-sm leading-relaxed text-muted-strong">
          {placeholder}
        </p>
      </div>
      <span className="placeholder-chip w-fit">Not provided</span>
    </div>
  );
}

const SECTIONS = [
  ["overview", "Overview"],
  ["purpose", "Purpose"],
  ["features", "Features"],
  ["stack", "Stack"],
  ["decisions", "Decisions"],
  ["screenshots", "Screenshots"],
  ["challenges", "Challenges"],
  ["links", "Links"],
] as const;

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) {
    notFound();
  }

  const { previous, next } = getAdjacentProjects(project.slug);
  const hasChallenges =
    (project.challenges?.length ?? 0) > 0 ||
    Boolean(project.challengesPlaceholder);
  const sections = SECTIONS.filter(
    ([id]) => id !== "challenges" || hasChallenges,
  ).map(([id, label]) => ({ id, label }));

  return (
    <>
      <section className="pb-12 pt-32 sm:pt-36 lg:pt-40">
        <div className="container-shell">
          <Link
            href="/projects"
            className="link-arrow font-mono text-[0.65rem] uppercase tracking-[0.13em] text-muted-strong"
          >
            <ArrowLeft className="size-4" strokeWidth={1.6} aria-hidden="true" />
            All projects
          </Link>

          <div className="mt-10 grid gap-8 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-8">
              <p className="flex items-center gap-2 font-mono text-[0.65rem] uppercase tracking-[0.14em] text-muted-strong">
                <span
                  aria-hidden="true"
                  className="size-1 rounded-full bg-accent"
                />
                {project.category}
              </p>
              <h1 className="mt-4 font-display text-display font-medium text-ink">
                {project.title}
              </h1>
              <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-strong sm:text-lg">
                {project.summary}
              </p>
            </div>

            <dl className="grid grid-cols-2 gap-5 border-t border-line pt-5 lg:col-span-4 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0">
              <div>
                <dt className="mono-label text-[0.55rem]">Category</dt>
                <dd className="mt-1 text-sm text-ink">{project.category}</dd>
              </div>
              <div>
                <dt className="mono-label text-[0.55rem]">Role</dt>
                <dd className="mt-1 text-sm text-ink">
                  {project.role ?? "Project owner"}
                </dd>
              </div>
              <div>
                <dt className="mono-label text-[0.55rem]">Stack</dt>
                <dd className="mt-1 text-sm text-ink">
                  {project.stack.length > 0 ? (
                    project.stack.join(", ")
                  ) : (
                    <span className="text-muted">To be confirmed</span>
                  )}
                </dd>
              </div>
              <div>
                <dt className="mono-label text-[0.55rem]">Live site</dt>
                <dd className="mt-1 text-sm text-ink">
                  {project.liveUrl ? (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-accent-ink underline underline-offset-4"
                    >
                      Visit
                      <ExternalLink
                        className="size-3"
                        strokeWidth={1.5}
                        aria-hidden="true"
                      />
                    </a>
                  ) : (
                    <span className="text-muted">Not provided</span>
                  )}
                </dd>
              </div>
            </dl>
          </div>
        </div>

        <div className="container-shell mt-12">
          <div className="aspect-[16/9] overflow-hidden border border-line">
            <ProjectVisual
              title={project.title}
              monogram={project.monogram}
              hue={project.hue}
              label="Cover screenshot placeholder"
              src={project.image}
              sizes="(min-width: 1280px) 1200px, 100vw"
            />
          </div>
          <p className="mt-2 flex flex-wrap items-center justify-between gap-2 font-mono text-[0.56rem] uppercase tracking-[0.12em] text-muted">
            <span>
              {project.image
                ? "Cover — captured from the live site"
                : "Cover — screenshot placeholder"}
            </span>
            <span>
              {project.image
                ? "Live project screenshot"
                : "A real screenshot will replace this"}
            </span>
          </p>
        </div>
      </section>

      <section className="pb-24">
        <div className="container-shell">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
            <aside className="lg:col-span-3">
              <div className="space-y-8 lg:sticky lg:top-28">
                <CaseToc sections={sections} />

                <div className="border border-dashed border-line-strong p-4">
                  <p className="mono-label text-[0.54rem]">Placeholder policy</p>
                  <p className="mt-2 text-xs leading-relaxed text-muted-strong">
                    Nothing here is invented. Unverified features, links and
                    stack details are labelled instead of being presented as
                    complete.
                  </p>
                </div>
              </div>
            </aside>

            <div className="space-y-12 lg:col-span-9">
              <CaseSection id="overview" label="01 / Overview" title="Overview">
                <div className="space-y-4">
                  {project.overview.map((paragraph) => (
                    <p
                      key={paragraph}
                      className="max-w-2xl text-sm leading-relaxed text-muted-strong sm:text-base"
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>
              </CaseSection>

              <CaseSection
                id="purpose"
                label="02 / Purpose & problem"
                title="Why it exists"
              >
                <p className="max-w-2xl text-sm leading-relaxed text-muted-strong sm:text-base">
                  {project.purpose}
                </p>
                {project.notes?.length ? (
                  <div className="mt-5 space-y-3">
                    {project.notes.map((note) => (
                      <p
                        key={note}
                        className="max-w-2xl border-l-2 border-accent bg-accent-soft/60 px-4 py-3 text-sm leading-relaxed text-ink"
                      >
                        {note}
                      </p>
                    ))}
                  </div>
                ) : null}
              </CaseSection>

              <CaseSection
                id="features"
                label="03 / Completed features"
                title="What is implemented"
              >
                {project.features.length > 0 ? (
                  <ul className="grid gap-3 sm:grid-cols-2">
                    {project.features.map((feature) => (
                      <li
                        key={feature}
                        className="flex items-start gap-3 border border-line bg-surface p-4 text-sm leading-relaxed text-ink"
                      >
                        <Check
                          className="mt-0.5 size-4 shrink-0 text-accent-ink"
                          strokeWidth={1.8}
                          aria-hidden="true"
                        />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                ) : null}

                {project.featuresPlaceholder ? (
                  <PlaceholderPanel>
                    {project.featuresPlaceholder}
                  </PlaceholderPanel>
                ) : null}

                {project.featuresPending?.length ? (
                  <div className="mt-5 border border-dashed border-line-strong p-5">
                    <p className="flex items-center gap-2 font-mono text-[0.6rem] uppercase tracking-[0.12em] text-muted-strong">
                      <Clock
                        className="size-3.5"
                        strokeWidth={1.5}
                        aria-hidden="true"
                      />
                      Pending verification
                    </p>
                    <ul className="mt-4 space-y-3">
                      {project.featuresPending.map((feature) => (
                        <li key={feature.label}>
                          <p className="text-sm text-ink">{feature.label}</p>
                          {feature.note ? (
                            <p className="mt-1 text-xs leading-relaxed text-muted">
                              {feature.note}
                            </p>
                          ) : null}
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : null}
              </CaseSection>

              <CaseSection
                id="stack"
                label="04 / Technology stack"
                title="Built with"
              >
                {project.stack.length > 0 ? (
                  <ul className="flex flex-wrap gap-2">
                    {project.stack.map((tech) => (
                      <li
                        key={tech}
                        className="border border-line px-3 py-1.5 font-mono text-[0.62rem] uppercase tracking-[0.08em] text-muted-strong"
                      >
                        {tech}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <PlaceholderPanel>
                    The technology stack for this project has not been verified
                    yet. It will be listed once confirmed — nothing is assumed
                    here.
                  </PlaceholderPanel>
                )}
              </CaseSection>

              <CaseSection
                id="decisions"
                label="05 / Development decisions"
                title="How it was approached"
              >
                {project.decisions.length > 0 ? (
                  <ol className="space-y-4">
                    {project.decisions.map((decision, index) => (
                      <li
                        key={decision}
                        className="flex gap-4 border-b border-line pb-4"
                      >
                        <span className="font-mono text-[0.6rem] tracking-[0.1em] text-muted">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <p className="max-w-2xl text-sm leading-relaxed text-muted-strong">
                          {decision}
                        </p>
                      </li>
                    ))}
                  </ol>
                ) : (
                  <PlaceholderPanel>
                    {project.decisionsPlaceholder ??
                      "Development decisions for this project have not been documented yet."}
                  </PlaceholderPanel>
                )}
              </CaseSection>

              <CaseSection
                id="screenshots"
                label="06 / Screenshots"
                title="Project screens"
              >
                <div className="grid gap-5 sm:grid-cols-2">
                  {project.screenshots.map((shot, index) => (
                    <figure
                      key={`${shot.caption}-${index}`}
                      className={
                        project.screenshots.length === 1 ? "sm:col-span-2" : undefined
                      }
                    >
                      <div className="aspect-[4/3] overflow-hidden border border-line">
                        <ProjectVisual
                          title={project.title}
                          monogram={project.monogram}
                          hue={project.hue}
                          variant={index + 1}
                          label="Screenshot placeholder"
                          src={shot.src}
                          sizes={
                            project.screenshots.length === 1
                              ? "100vw"
                              : "(min-width: 640px) 50vw, 100vw"
                          }
                        />
                      </div>
                      <figcaption className="mt-2 font-mono text-[0.56rem] uppercase tracking-[0.12em] text-muted">
                        {shot.caption}
                      </figcaption>
                    </figure>
                  ))}
                </div>
              </CaseSection>

              {hasChallenges ? (
                <CaseSection
                  id="challenges"
                  label="07 / Challenges & lessons"
                  title="What was learned"
                >
                  {project.challenges?.length ? (
                    <ul className="space-y-3">
                      {project.challenges.map((challenge) => (
                        <li
                          key={challenge}
                          className="flex gap-3 text-sm leading-relaxed text-muted-strong"
                        >
                          <span
                            aria-hidden="true"
                            className="mt-2 size-1 shrink-0 rounded-full bg-accent"
                          />
                          {challenge}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <PlaceholderPanel>
                      {project.challengesPlaceholder ??
                        "Challenges and lessons for this project have not been documented yet."}
                    </PlaceholderPanel>
                  )}
                </CaseSection>
              ) : null}

              <CaseSection id="links" label="08 / Links" title="See it in the wild">
                <div className="grid gap-4 sm:grid-cols-2">
                  <LinkCard
                    label="Live website"
                    href={project.liveUrl}
                    placeholder="A live project URL has not been supplied for this case study yet."
                  />
                  <LinkCard
                    label="Repository"
                    href={project.repoUrl}
                    placeholder="No public repository has been supplied for this project yet."
                  />
                </div>
              </CaseSection>

              <nav
                aria-label="Project navigation"
                className="grid gap-4 border-t border-line pt-8 sm:grid-cols-2"
              >
                {previous ? (
                  <Link
                    href={`/projects/${previous.slug}`}
                    className="group border border-line p-5 transition-colors hover:bg-surface"
                  >
                    <span className="flex items-center gap-2 font-mono text-[0.58rem] uppercase tracking-[0.12em] text-muted">
                      <ArrowLeft
                        className="size-3.5"
                        strokeWidth={1.5}
                        aria-hidden="true"
                      />
                      Previous project
                    </span>
                    <span className="mt-2 block font-display text-xl tracking-[-0.02em] text-ink group-hover:text-accent-ink">
                      {previous.title}
                    </span>
                  </Link>
                ) : (
                  <span />
                )}

                {next ? (
                  <Link
                    href={`/projects/${next.slug}`}
                    className="group border border-line p-5 text-left transition-colors hover:bg-surface sm:text-right"
                  >
                    <span className="flex items-center gap-2 font-mono text-[0.58rem] uppercase tracking-[0.12em] text-muted sm:justify-end">
                      Next project
                      <ArrowRight
                        className="size-3.5"
                        strokeWidth={1.5}
                        aria-hidden="true"
                      />
                    </span>
                    <span className="mt-2 block font-display text-xl tracking-[-0.02em] text-ink group-hover:text-accent-ink">
                      {next.title}
                    </span>
                  </Link>
                ) : (
                  <span />
                )}
              </nav>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
