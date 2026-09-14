import Link from "next/link";
import type { Metadata } from "next";
import { getAllBlogPosts } from "@/lib/content";
import { PageHeading } from "@/components/PageHeading";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Container } from "@/components/Container";

export const metadata: Metadata = {
  title: "Blog",
  description: "Travel tips, route guides, and news from Albany Airport Taxi and Limo Service.",
  alternates: { canonical: "/blog" },
};

export default function BlogIndexPage() {
  const posts = getAllBlogPosts().sort((a, b) => (b.publishedAt ?? "").localeCompare(a.publishedAt ?? ""));
  return (
    <>
      <PageHeading eyebrow="Blog" title="News & Travel Tips" />
      <Breadcrumbs items={[{ name: "Home", path: "/" }, { name: "Blog", path: "/blog" }]} />
      <Container className="py-12">
        {posts.length === 0 ? (
          <p className="text-ink-muted">No posts yet — check back soon.</p>
        ) : (
          <ul className="space-y-6">
            {posts.map((post) => (
              <li key={post.slug} className="rounded-lg border border-border bg-surface p-6">
                <Link href={`/blog/${post.slug}`} className="text-xl font-semibold text-primary hover:underline">
                  {post.title}
                </Link>
                {post.mdesc && <p className="mt-2 text-sm text-ink-muted">{post.mdesc}</p>}
              </li>
            ))}
          </ul>
        )}
      </Container>
    </>
  );
}
