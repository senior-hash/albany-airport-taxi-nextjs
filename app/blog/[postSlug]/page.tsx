import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getAllBlogPosts, getBlogPostBySlug } from "@/lib/content";
import { PageHeading } from "@/components/PageHeading";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Container } from "@/components/Container";
import { ProseContent } from "@/components/ProseContent";

export function generateStaticParams() {
  return getAllBlogPosts().map((p) => ({ postSlug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ postSlug: string }>;
}): Promise<Metadata> {
  const { postSlug } = await params;
  const post = getBlogPostBySlug(postSlug);
  if (!post) return {};
  return {
    title: post.mtitle.trim() || post.title,
    description: post.mdesc.trim() || undefined,
    alternates: { canonical: `/blog/${post.slug}` },
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ postSlug: string }> }) {
  const { postSlug } = await params;
  const post = getBlogPostBySlug(postSlug);
  if (!post) notFound();

  return (
    <>
      <PageHeading eyebrow="Blog" title={post.title} />
      <Breadcrumbs
        items={[
          { name: "Home", path: "/" },
          { name: "Blog", path: "/blog" },
          { name: post.title, path: `/blog/${post.slug}` },
        ]}
      />
      <Container className="py-12">
        <ProseContent html={post.detailHtml} />
      </Container>
    </>
  );
}
