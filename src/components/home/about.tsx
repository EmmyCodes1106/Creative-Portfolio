import { Reveal } from "@/components/animation/reveal";
import { ScrollText } from "@/components/animation/scroll-text";

const ABOUT_PRIMARY =
  "I'm a web developer with a strong passion for development and creating solutions in the digital space. I enjoy turning ideas into functional products, exploring new technologies and finding creative ways to solve problems.";

const ABOUT_SECONDARY =
  "Alongside development, I have a keen interest in UI/UX design, which influences how I approach building digital products. I believe a great product should not only work well but also offer an intuitive and enjoyable user experience.";

export function About() {
  return (
    <section
      id="about"
      aria-labelledby="about-title"
      className="section section-rule"
    >
      <div className="container-shell">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-4">
            <Reveal className="lg:sticky lg:top-28">
              <p className="mono-label">01 / About</p>
              <h2
                id="about-title"
                className="mt-4 max-w-sm font-display text-section font-medium text-ink"
              >
                Development, with design in mind.
              </h2>
              <div className="mt-8 flex flex-wrap gap-2">
                <span className="border border-line px-2.5 py-1 font-mono text-[0.6rem] uppercase tracking-[0.1em] text-muted-strong">
                  Web development
                </span>
                <span className="border border-line px-2.5 py-1 font-mono text-[0.6rem] uppercase tracking-[0.1em] text-muted-strong">
                  UI/UX design
                </span>
              </div>
              <span
                aria-hidden="true"
                className="mt-10 block h-px w-16 bg-accent"
              />
            </Reveal>
          </div>

          <div className="lg:col-span-7 lg:col-start-6">
            <ScrollText
              text={ABOUT_PRIMARY}
              className="font-display text-[clamp(1.4rem,2.6vw,2.05rem)] font-normal leading-[1.35] tracking-[-0.025em] text-ink"
            />
            <ScrollText
              text={ABOUT_SECONDARY}
              className="mt-8 max-w-2xl text-base leading-relaxed text-muted-strong sm:text-lg"
            />

            <Reveal className="mt-10 border-l-2 border-accent py-1 pl-5">
              <p className="mono-label text-[0.56rem]">Guiding principle</p>
              <blockquote className="mt-3 max-w-xl font-display text-xl leading-snug tracking-[-0.02em] text-ink sm:text-2xl">
                &ldquo;A great product should not only work well but also offer
                an intuitive and enjoyable user experience.&rdquo;
              </blockquote>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
