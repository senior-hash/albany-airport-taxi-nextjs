import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbSchema } from "@/lib/schema";
import { Container } from "@/components/Container";

export function Breadcrumbs({ items }: { items: { name: string; path: string }[] }) {
  return (
    <nav aria-label="Breadcrumb" className="border-b border-border bg-background">
      <JsonLd data={breadcrumbSchema(items)} />
      <Container>
        <ol className="flex flex-wrap items-center gap-1 py-3 text-xs text-ink-muted">
          {items.map((item, i) => (
            <li key={item.path} className="flex items-center gap-1">
              {i > 0 && <span aria-hidden>/</span>}
              {i === items.length - 1 ? (
                <span className="text-ink">{item.name}</span>
              ) : (
                <Link href={item.path} className="hover:text-ink">
                  {item.name}
                </Link>
              )}
            </li>
          ))}
        </ol>
      </Container>
    </nav>
  );
}
