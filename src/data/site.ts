export const siteConfig = {
  name: "EmmyCodes",
  owner: "Fadayomi Emmanuel",
  role: "Software Developer & Creative Technologist",
  headline: "Turning ideas into functional and creative solutions.",
  intro:
    "I'm Fadayomi Emmanuel, a software developer passionate about building useful digital products.",
  email: "emmycodes1106@gmail.com",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://emmycodes.vercel.app",
  nav: [
    { label: "Home", href: "/#top" },
    { label: "About", href: "/#about" },
    { label: "Works", href: "/#works" },
    { label: "Skills", href: "/#skills" },
    { label: "Contact", href: "/#contact" },
  ],
  socials: [
    {
      label: "GitHub",
      handle: "@EmmyCodes1106",
      href: "https://github.com/EmmyCodes1106",
    },
    {
      label: "LinkedIn",
      handle: "in/emmanuel-fadayomi",
      href: "https://linkedin.com/in/emmanuel-fadayomi",
    },
    {
      label: "Instagram",
      handle: "@i_am_emmycodes",
      href: "https://instagram.com/i_am_emmycodes",
    },
  ],
} as const;
