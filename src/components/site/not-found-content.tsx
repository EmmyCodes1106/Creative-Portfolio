import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";

export function NotFoundContent() {
  return (
    <section className="container-shell flex min-h-[72vh] flex-col justify-center py-32">
      <p className="mono-label">Error 404</p>
      <h1 className="mt-4 max-w-3xl font-display text-display font-medium text-ink">
        This page slipped out of the build.
      </h1>
      <p className="mt-5 max-w-md text-sm leading-relaxed text-muted-strong sm:text-base">
        The page you were looking for does not exist. Head back home or browse
        the project collection instead.
      </p>
      <div className="mt-8 flex flex-wrap gap-3">
        <Link href="/" className="btn btn-solid">
          <ArrowLeft className="size-4" strokeWidth={1.6} aria-hidden="true" />
          Back home
        </Link>
        <Link href="/projects" className="btn btn-ghost">
          View projects
          <ArrowUpRight
            className="size-4"
            strokeWidth={1.6}
            aria-hidden="true"
          />
        </Link>
      </div>
    </section>
  );
}
