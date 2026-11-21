export type PendingFeature = {
  label: string;
  note?: string;
};

export type Project = {
  slug: string;
  title: string;
  category: string;
  summary: string;
  overview: string[];
  purpose: string;
  role?: string;
  features: string[];
  featuresPending?: PendingFeature[];
  featuresPlaceholder?: string;
  stack: string[];
  decisions: string[];
  decisionsPlaceholder?: string;
  challenges?: string[];
  challengesPlaceholder?: string;
  notes?: string[];
  liveUrl: string | null;
  repoUrl: string | null;
  featured: boolean;
  hue: string;
  monogram: string;
  image?: string;
  screenshots: { caption: string; src?: string }[];
};

export const projects: Project[] = [
  {
    slug: "septa",
    title: "SEPTA",
    category: "Corporate website",
    summary:
      "A production marketing site for a Lagos-based IT company — glassmorphism design, motion-led sections and service pages, all driven by typed content registries.",
    overview: [
      "SEPTA is the production web platform for a software and IT company founded in May 2021 in Lagos. It presents five service lines — AI product development, workflow automation, digital transformation, observability and talent solutions — alongside case studies, field notes and careers.",
      "The design is built on a glassmorphism system defined as Tailwind CSS v4 tokens, with Framer Motion handling section reveals and counters, and Inter plus JetBrains Mono loaded through next/font.",
      "Every section reads from typed registries under data/ — services, stats, toolkit, cases, posts, jobs — so copy changes are data edits rather than component surgery.",
    ],
    purpose:
      "To give the company a credible, high-craft web presence that presents its service lines and proof points in one place.",
    role: "Design and development — end to end",
    features: [
      "Glassmorphism design system built on Tailwind CSS v4 tokens",
      "Five service sections with deliverables, process and toolkits",
      "Homepage modules: hero, stats, code showcase and services carousel",
      "Case studies, field notes and labelled-illustrative testimonials",
      "Careers section driven by typed job specifications",
      "Contact forms with shared client/server validators",
      "Command palette, theme toggle and preloader",
      "WCAG AA contrast, focus and ARIA handling",
      "prefers-reduced-motion fallbacks for reveals, marquees and counters",
    ],
    stack: [
      "Next.js 16",
      "React 19",
      "TypeScript",
      "Tailwind CSS 4",
      "Framer Motion",
      "next/font",
    ],
    decisions: [
      "All marketing copy lives in typed registries under data/, so sections are data-driven instead of hardcoded in JSX.",
      "Forms use a hand-built useForm hook, FormField component and shared validators rather than a form library.",
      "Motion earns its place section by section, and every transform, marquee loop and count-up degrades to a static state under prefers-reduced-motion.",
      "Company tenure is computed from the founding date (1 May 2021) instead of being typed as a fixed number.",
    ],
    challenges: [
      "Glassmorphism surfaces sit over photographic backdrops, so contrast had to be verified per surface rather than assumed from the palette.",
      "Scroll-driven motion and animated counters each needed an instant fallback path to meet the reduced-motion requirement.",
      "Designing the typed registries first meant defining each section's data shape before writing its markup.",
    ],
    liveUrl: "https://septa-website-sage.vercel.app/",
    repoUrl: null,
    featured: true,
    hue: "#2FB8A6",
    monogram: "SP",
    image: "/projects/septa-hero.png",
    screenshots: [
      {
        caption: "Homepage — hero and live demo panel",
        src: "/projects/septa-hero.png",
      },
    ],
  },
  {
    slug: "glorified-library",
    title: "Glorified Library",
    category: "Library platform",
    summary:
      "A library management platform covering catalogue, members, lending, fines and reports — with staff roles, email notifications and a member portal that reads EPUB copies online.",
    overview: [
      "Glorified Library runs the day-to-day work of a library: a catalogue with categories and cover art, member records, lending and returns, overdue fines and reports. Staff sign in to a role-based dashboard; members use a separate portal.",
      "Borrowing and returning trigger email notifications — confirmations, due reminders, overdue and suspension notices — sent over SMTP with each delivery recorded. A scheduled endpoint runs the daily reminder pass.",
      "Digital copies are supported end to end: staff attach an EPUB to a title, and members read it chapter by chapter in the browser while their loan is active.",
    ],
    purpose:
      "So a small library can run catalogue, circulation and member self-service from one system — staff working from a dashboard, members borrowing and reading online.",
    features: [
      "Catalogue with categories, covers and duplicate-ISBN protection",
      "Book lookup from Open Library, including bulk import",
      "Members, lending, returns and overdue fines",
      "Three staff roles with per-user permissions",
      "Session authentication with scrypt hashes and email verification codes",
      "Email notifications with delivery history",
      "Member portal for borrowing and reading EPUBs online",
      "Dashboard, reports and PDF exports",
      "Database-backed settings for lending limits, fines, membership and opening hours",
      "Audit log covering staff, book and email activity",
    ],
    stack: [
      "Next.js 16",
      "React 19",
      "TypeScript",
      "Tailwind CSS 4",
      "PostgreSQL",
      "Nodemailer",
      "Open Library API",
      "ExcelJS",
      "JSZip",
      "pdf-lib",
      "sanitize-html",
    ],
    decisions: [
      "Authentication is built in-house: scrypt-hashed passwords, opaque session tokens stored only as SHA-256 hashes, and permissions re-checked inside every server action rather than trusted from the UI.",
      "Notifications are stored before they are sent, each with a unique dedupe key, so repeated or concurrent scheduled runs cannot send the same reminder twice.",
      "Digital copies live outside the web root and stream one chapter at a time; every request re-checks an unreturned loan, so returning the book ends access without a separate revocation step.",
      "Library policy — loan length, fines, membership, opening hours — is stored in the database, so settings change everywhere without a redeploy.",
      "Bulk import is resumable: Open Library caps paging near 10,000 results per query, so the catalogue fills in recorded batches that can be stopped at any point.",
    ],
    challenges: [
      "Chapter HTML and images come from an untrusted EPUB, so each chapter route re-verifies the member's loan, sanitises the HTML on the server and marks responses no-store.",
      "Reminders had to stay idempotent across cron retries and overlapping runs, which is why every notification carries its own dedupe key.",
      "Free digital copies are limited by copyright rather than tooling: only public-domain works can be fetched from Project Gutenberg, and downloads that fail validation are discarded instead of guessed.",
    ],
    notes: [
      "Email is sent from a Gmail account over SMTP. When SMTP is not configured, notifications are still recorded with a skipped status.",
      "The online reader is not DRM — text already displayed can be copied by a determined member.",
    ],
    liveUrl: "https://glorified-library.vercel.app/",
    repoUrl: "https://github.com/EmmyCodes1106/glorified-library",
    featured: true,
    hue: "#159B75",
    monogram: "GL",
    image: "/projects/glorified-library-login.png",
    screenshots: [
      {
        caption: "Staff sign-in — catalogue, members and circulation",
        src: "/projects/glorified-library-login.png",
      },
    ],
  },
  {
    slug: "free-music-website",
    title: "LibreTune",
    category: "Music discovery",
    summary:
      "A free music discovery app for searching songs and artists, browsing genres, and playing short preview clips.",
    overview: [
      "LibreTune is a music discovery and preview-streaming application powered by an integrated music API.",
      "Playback is limited to the preview clips supplied by that API — around 30 seconds each. This is not an unrestricted, full-length streaming service.",
    ],
    purpose:
      "Make music discovery accessible without subscription restrictions. The original vision was full-length streaming, but API pricing made that unaffordable. You switched to Deezer’s public API, which provides 30-second previews, so the discovery and playback experience could still be built and demonstrated. Positioning: a music discovery and preview-streaming app with a vision for fully accessible streaming",
    features: [
      "Search songs and artists, with debounced input (400ms), live suggestions and grouped results (Tracks, Artists, Albums)",
      "Browse the Deezer chart, genres, Trending Now and Recently Played",
      "Play and pause previews from a persistent player bar with seek, volume, queue and autoplay-next",
      "Expanded Now Playing view with artwork, preview status, Deezer link and upcoming queue",
      "Favourites and custom playlists: create, rename, delete, reorder, Play All",
      "Dark and light themes with an instant toggle",
      "Responsive layout: desktop sidebar and mobile bottom navigation",
      "Offline banner and a link out to Deezer for each track",
    ],
    stack: [
      "React 18",
      "React Router v6",
      "TanStack Query v5",
      "Axios",
      "Zustand",
      "Tailwind CSS",
      "Lucide React",
      "Deezer public API",
      "Vercel",
    ],
    decisions: [
      "Deezer over a paid streaming API: it’s free and needs no API key, so the project stays free to run.",
      "TanStack Query for server data and Zustand for client state: this separates API caching from playlists, favourites and player state.",
      "A custom audio hook instead of a player library: it gives full control over queue, seek and OS media controls.",
      "Local storage instead of a backend: keeps it accountless, with the trade-off that data stays on one device.",
      "Serverless proxy: it solves CORS in production.",
      "Accessibility: 44px touch targets and visible focus rings (the README states WCAG AA, so only keep that claim if you’ve tested it).",
    ],
    challenges:[
      "Budget constraint: full-length streaming APIs were too expensive. You pivoted to Deezer previews and kept the core experience.",
      "CORS: the browser blocks direct Deezer calls. You solved it with a proxy in both development and production.",
      "Expiring preview URLs: saved tracks store metadata only, and a fresh preview URL is fetched when the track is played.",
      "Playback across navigation: the player state lives in a global store so audio continues between pages.",
    ],
    notes: [
      "Preview clips are approximately 30 seconds long. The app does not provide unrestricted full-length streaming.",
    ],
    liveUrl: "https://libretune.vercel.app/",
    repoUrl: "https://github.com/EmmyCodes1106/libretune",
    featured: true,
    hue: "#7C5CFF",
    monogram: "LT",
    image: "/projects/libretune-hero.png",
    screenshots: [
      {
        caption: "Home — browse genres and start listening",
        src: "/projects/libretune-hero.png",
      },
    ],
  },
  {
    slug: "weather-app",
    title: "EmmyCodes Weather App",
    category: "Weather application",
    summary:
      "A weather app with current conditions, city search, hourly and weekly forecasts — defaulting to Lagos.",
    overview: [
      "EmmyCodes Weather shows current weather conditions and forecasts using an integrated weather API.",
      "Lagos is the default location. Visitors search for a city manually; the app does not automatically track their live location.",
    ],
    purpose:
      "To give a quick, readable view of current conditions and the weather ahead for a chosen city.",
    features: [
      "Current weather information",
      "Search weather by city",
      "Temperature and weather conditions",
      "Humidity",
      "Wind speed",
      "Hourly forecasts",
      "Weekly forecasts",
      "Weather icons and condition-based backgrounds",
    ],
    stack: [],
    decisions: [
      "Lagos is set as the default location, with manual city search instead of automatic geolocation.",
    ],
    challengesPlaceholder:
      "Challenges and lessons for this project have not been documented yet.",
    notes: [
      "Lagos is the default location. The app does not automatically track a visitor's live location.",
    ],
    liveUrl: "https://emmycodes-weather-app.vercel.app/",
    repoUrl: "https://github.com/EmmyCodes1106/emmycodes-weather-app",
    featured: true,
    hue: "#2F7A3E",
    monogram: "EW",
    image: "/projects/weather-app-hero.png",
    screenshots: [
      {
        caption: "Current conditions for Lagos, with live weather data",
        src: "/projects/weather-app-hero.png",
      },
    ],
  },
  {
    slug: "secure-notes",
    title: "Secure Notes",
    category: "Web application",
    summary:
      "A private notes app with Supabase authentication — each signed-in user gets their own encrypted workspace to create, edit and manage personal notes.",
    overview: [
      "Secure Notes is a full-stack notes application built on Supabase. Users sign up, sign in and land in a private workspace where they can create, edit, delete and organise notes — each account's data is isolated behind row-level security.",
      "Authentication is handled entirely through Supabase Auth with server-side session management via @supabase/ssr, keeping tokens out of client-side JavaScript and validating every request on the server.",
    ],
    purpose:
      "To build a secure, authenticated note-taking workspace where every user's data is private by default — combining Supabase row-level security with server-side session handling.",
    features: [
      "User authentication with Supabase Auth (sign up, sign in, sign out)",
      "Server-side session management via @supabase/ssr",
      "Private note creation, editing and deletion",
      "Per-user data isolation with row-level security",
      "Responsive UI with Tailwind CSS",
    ],
    stack: [
      "Next.js 16",
      "React 19",
      "TypeScript",
      "Tailwind CSS 4",
      "Supabase",
    ],
    decisions: [
      "Authentication comes before note management, so private notes sit behind a signed-in session rather than an open page.",
      "Supabase Auth with @supabase/ssr keeps session tokens server-side, avoiding exposure in client bundles.",
      "Row-level security in the database enforces data isolation at the storage layer rather than relying only on application logic.",
    ],
    challengesPlaceholder:
      "Challenges and lessons for this project have not been documented yet.",
    liveUrl: "https://secure-notes-gamma-orcin.vercel.app/",
    repoUrl: "https://github.com/EmmyCodes1106/secure-notes",
    featured: false,
    hue: "#7257E8",
    monogram: "SN",
    screenshots: [
      { caption: "Screenshot placeholder — to be added" },
      { caption: "Screenshot placeholder — to be added" },
    ],
  },
  {
    slug: "markdown-notes",
    title: "Markdown Notes",
    category: "Notes application",
    summary: "A basic note management app with note creation, storage and tags.",
    overview: [
      "Markdown Notes is a basic note management application. It supports creating notes, storing them, and organising them with tags.",
      "Advanced Markdown editing and rendering are not claimed here; only the basics above are listed as verified.",
    ],
    purpose: "To provide a lightweight way to capture and organise notes.",
    features: ["Create notes", "Store notes", "Tag notes"],
    stack: [],
    decisions: [],
    decisionsPlaceholder:
      "Development decisions for this project have not been documented yet.",
    challengesPlaceholder:
      "Challenges and lessons for this project have not been documented yet.",
    liveUrl: "https://emmycodes-notetaker.vercel.app/",
    repoUrl: "https://github.com/EmmyCodes1106/notetaker",
    featured: false,
    hue: "#D65378",
    monogram: "MN",
    screenshots: [
      { caption: "Screenshot placeholder — to be added" },
      { caption: "Screenshot placeholder — to be added" },
    ],
  },
];

export const featuredProjects = projects.filter((project) => project.featured);

export function getProject(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}

export function getAdjacentProjects(slug: string) {
  const index = projects.findIndex((project) => project.slug === slug);
  if (index === -1) {
    return { previous: undefined, next: undefined };
  }

  const previous = projects[(index - 1 + projects.length) % projects.length];
  const next = projects[(index + 1) % projects.length];

  return { previous, next };
}

export const projectCount = projects.length;
