// Centralized API client for the PHP backend
// Reads base URL from NEXT_PUBLIC_API_BASE_URL or API_BASE_URL, falls back to local PHP server

export type HeroTile = {
  id: number;
  icon: string;
  title: string;
  content: string;
  sort_order: number;
};

export type HeroResponse = {
  main_title: string;
  tiles: HeroTile[];
};

export type OfferRow = {
  id: number;
  icon: string;
  title: string;
  content: string;
  sort_order?: number;
  created_at?: string;
};

export type ProjectRow = {
  id: number;
  image: string;
  title: string;
  description: string;
  link: string;
  sort_order?: number;
  created_at?: string;
};

export type BlogRow = {
  id: number;
  image: string;
  title: string;
  short_description: string;
  long_description: string;
  created_at?: string;
};

export type TeamRow = {
  id: number;
  image: string;
  full_name: string;
  role: string;
  fb_url?: string | null;
  linkedin_url?: string | null;
  sort_order?: number;
  created_at?: string;
};

const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE_URL ||
  process.env.API_BASE_URL ||
  "https://coolweb.com.pl/api/index.php/";

function buildUrl(path: string): string {
  if (!path.startsWith("/")) path = "/" + path;
  return API_BASE.replace(/\/$/, "") + path;
}

async function fetchJSON<T>(path: string): Promise<T> {
  const res = await fetch(buildUrl(path), {
    // Ensure fresh data from the PHP API
    cache: "no-store",
    // Disable ISR for these calls (App Router)
    next: { revalidate: 0 },
    headers: {
      Accept: "application/json",
    },
  });
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(
      `API ${path} failed: ${res.status} ${res.statusText} ${text}`
    );
  }
  return (await res.json()) as T;
}

export async function fetchHero(): Promise<HeroResponse> {
  return fetchJSON<HeroResponse>("/hero");
}

export async function fetchOffer(): Promise<OfferRow[]> {
  return fetchJSON<OfferRow[]>("/offer");
}

export async function fetchProjects(): Promise<ProjectRow[]> {
  return fetchJSON<ProjectRow[]>("/projects");
}

export async function fetchBlog(): Promise<BlogRow[]> {
  return fetchJSON<BlogRow[]>("/blog");
}

export async function fetchTeam(): Promise<TeamRow[]> {
  return fetchJSON<TeamRow[]>("/team");
}
