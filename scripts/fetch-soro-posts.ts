// Pulls published posts from a headless WordPress instance (where the Soro
// WordPress plugin actually publishes to — Soro has no native Next.js/
// headless connector, only WordPress and Shopify integrations) and converts
// them into this project's BlogPost shape, written to content/blog/soro/.
//
// This site is a static export (no server, no live API), so a new Soro post
// only appears on the live site after this script runs and the site is
// rebuilt and redeployed. Run manually for now:
//
//   SORO_WORDPRESS_URL="https://content.example.com" npm run fetch-soro-posts
//
// Safe to run repeatedly — it fully replaces content/blog/soro/ each time,
// so WordPress is the source of truth (a post unpublished or deleted there
// disappears from the site on the next run+rebuild, same as a new one
// appearing).
import { writeFileSync, mkdirSync, readdirSync, unlinkSync, existsSync } from "fs";
import { join } from "path";
import { decode } from "he";
import { sanitizeDetailHtml, sanitizePlainText } from "./lib/sanitize";
import type { BlogPost } from "./lib/schemas";

const WORDPRESS_URL = process.env.SORO_WORDPRESS_URL;
const OUT_DIR = join(process.cwd(), "content", "blog", "soro");
const PER_PAGE = 100;

type WpYoastHead = { title?: string; description?: string };
type WpPost = {
  id: number;
  slug: string;
  date: string; // site-local time, e.g. "2026-10-12T09:00:00"
  title: { rendered: string };
  content: { rendered: string };
  excerpt: { rendered: string };
  yoast_head_json?: WpYoastHead;
};

function decodeAndStrip(html: string): string {
  return sanitizePlainText(decode(html)).trim();
}

async function fetchAllPosts(baseUrl: string): Promise<WpPost[]> {
  const posts: WpPost[] = [];
  let page = 1;
  for (;;) {
    const url = `${baseUrl.replace(/\/$/, "")}/wp-json/wp/v2/posts?per_page=${PER_PAGE}&page=${page}&status=publish&_embed=false`;
    const res = await fetch(url, { headers: { Accept: "application/json" } });
    if (res.status === 400 && page > 1) break; // WP returns 400 past the last page
    if (!res.ok) {
      throw new Error(`WordPress REST API request failed (${res.status}): ${url}`);
    }
    const batch = (await res.json()) as WpPost[];
    posts.push(...batch);
    const totalPages = Number(res.headers.get("X-WP-TotalPages") ?? "1");
    if (page >= totalPages || batch.length === 0) break;
    page += 1;
  }
  return posts;
}

function toBlogPost(wp: WpPost): BlogPost {
  const title = decodeAndStrip(wp.title.rendered);
  const yoast = wp.yoast_head_json;
  const mtitle = yoast?.title ? decodeAndStrip(yoast.title) : title;
  const mdesc = yoast?.description
    ? decodeAndStrip(yoast.description)
    : decodeAndStrip(wp.excerpt.rendered);

  return {
    id: `soro-${wp.id}`,
    slug: wp.slug,
    title,
    detailHtml: sanitizeDetailHtml(wp.content.rendered),
    mtitle,
    mdesc,
    mkey: "",
    publishedAt: wp.date.slice(0, 10), // "2026-10-12T09:00:00" -> "2026-10-12"
    source: "soro",
  };
}

function replaceOutputDir(posts: BlogPost[]) {
  mkdirSync(OUT_DIR, { recursive: true });
  const existing = existsSync(OUT_DIR) ? readdirSync(OUT_DIR).filter((f) => f.endsWith(".json")) : [];
  for (const file of existing) unlinkSync(join(OUT_DIR, file));

  for (const post of posts) {
    const outPath = join(OUT_DIR, `${post.slug}.json`);
    writeFileSync(outPath, JSON.stringify(post, null, 2) + "\n");
  }
}

async function main() {
  if (!WORDPRESS_URL) {
    console.log(
      "SORO_WORDPRESS_URL is not set — skipping. Set it to your headless WordPress site's " +
        "base URL once it's live, e.g.:\n" +
        '  SORO_WORDPRESS_URL="https://content.albanyairport.taxi" npm run fetch-soro-posts'
    );
    return;
  }

  console.log(`Fetching published posts from ${WORDPRESS_URL} ...`);
  const wpPosts = await fetchAllPosts(WORDPRESS_URL);
  console.log(`Found ${wpPosts.length} published post(s).`);

  const posts = wpPosts.map(toBlogPost);
  replaceOutputDir(posts);

  console.log(`Wrote ${posts.length} post(s) to ${OUT_DIR}`);
  if (posts.length > 0) {
    console.log("Remember: run `npm run build` and redeploy for these to go live.");
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
