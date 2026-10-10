import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPageBySlug } from "@/lib/content";
import { PageHeading } from "@/components/PageHeading";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Container } from "@/components/Container";
import { ProseContent } from "@/components/ProseContent";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How Albany Airport Taxi and Limo Service collects, uses, and protects your information, including our contact form and reCAPTCHA spam protection.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  const page = getPageBySlug("privacy");
  if (!page) notFound();
  return (
    <>
      <PageHeading title={page.title} />
      <Breadcrumbs items={[{ name: "Home", path: "/" }, { name: "Privacy Policy", path: "/privacy" }]} />
      <Container className="py-12">
        <ProseContent html={page.detailHtml} />
      </Container>
    </>
  );
}
