import type { Metadata } from "next";
import { Hero } from "@/components/home/hero";
import { About } from "@/components/home/about";
import { SelectedWorks } from "@/components/home/selected-works";
import { Skills } from "@/components/home/skills";
import { Contact } from "@/components/home/contact";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <About />
      <SelectedWorks />
      <Skills />
      <Contact />
    </>
  );
}
