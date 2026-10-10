import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPageBySlug } from "@/lib/content";
import { PageHeading } from "@/components/PageHeading";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Container } from "@/components/Container";
import { ProseContent } from "@/components/ProseContent";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about Albany Airport Taxi and Limo Service (US Limo and Taxi) — 24/7 taxi, car, and limo service across the Capital Region, Hudson Valley, Adirondacks, and Berkshires.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  const page = getPageBySlug("about");
  if (!page) notFound();
  return (
    <>
      <PageHeading title={page.title} />
      <Breadcrumbs items={[{ name: "Home", path: "/" }, { name: "About", path: "/about" }]} />
      <Container className="py-12">
        <ProseContent html={page.detailHtml} />
      </Container>
    </>
  );
}
