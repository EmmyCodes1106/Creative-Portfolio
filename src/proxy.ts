import { NextResponse, type NextRequest } from "next/server";
import { projects } from "@/data/projects";

const projectSlugs = new Set(projects.map((project) => project.slug));

export function proxy(request: NextRequest) {
  const match = request.nextUrl.pathname.match(/^\/projects\/([^/]+)\/?$/);

  if (!match) {
    return NextResponse.next();
  }

  let slug = match[1];
  try {
    slug = decodeURIComponent(slug);
  } catch {
    return NextResponse.rewrite(new URL("/404", request.url), { status: 404 });
  }

  if (slug.includes(".")) {
    return NextResponse.next();
  }

  if (!projectSlugs.has(slug)) {
    return NextResponse.rewrite(new URL("/404", request.url), { status: 404 });
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/projects/:path*",
};
