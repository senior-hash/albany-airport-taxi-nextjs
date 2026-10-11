import Link from "next/link";
import type { Metadata } from "next";
import { getCounties, getStates } from "@/lib/content";
import { PageHeading } from "@/components/PageHeading";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Container } from "@/components/Container";
import { ServiceAreaMap } from "@/components/ServiceAreaMap";
import { EmbedCodeBlock } from "@/components/EmbedCodeBlock";
import { SITE_URL } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Service Area",
  description:
    "A map of the 23-county area we serve across New York, Vermont, and Massachusetts, with free embed code for your own site.",
  alternates: { canonical: "/service-area" },
};

const EMBED_CODE = `<iframe
  src="${SITE_URL}/embed/service-area-map.html"
  title="Albany Airport Taxi & Limo — Service Area Map"
  width="100%"
  height="520"
  style="max-width: 640px; border: 0;"
  loading="lazy"
></iframe>`;

export default function ServiceAreaPage() {
  const states = getStates();
  const counties = getCounties();

  return (
    <>
      <PageHeading eyebrow="Service Area" title="Where We Serve" />
      <Breadcrumbs items={[{ name: "Home", path: "/" }, { name: "Service Area", path: "/service-area" }]} />
      <Container className="py-12">
        <div className="grid gap-12 lg:grid-cols-[3fr_2fr]">
          <div>
            <p className="max-w-2xl text-ink-muted">
              We provide door-to-door taxi and car service across 23 counties in New York,
              Vermont, and Massachusetts &mdash; from the Capital Region and Hudson Valley out
              to the Adirondacks, southern Vermont, and the Berkshires. The marker shows Albany
              International Airport, our home base.
            </p>
            <div className="mt-8 overflow-hidden rounded-xl border border-border bg-surface p-4">
              <ServiceAreaMap className="mx-auto w-full max-w-xl" />
            </div>

            <div className="mt-12">
              {states.map((state) => {
                const stateCounties = counties.filter((c) => c.stateId === state.id);
                if (stateCounties.length === 0) return null;
                return (
                  <div key={state.id} className="mt-8 first:mt-0">
                    <h2 className="text-xl font-semibold tracking-tight text-primary">{state.name}</h2>
                    <ul className="mt-3 grid grid-cols-2 gap-x-6 gap-y-2 sm:grid-cols-3">
                      {stateCounties.map((county) => (
                        <li key={county.id}>
                          <Link
                            href={`/airport-taxi/alb/${county.slug}`}
                            className="text-sm text-ink-muted hover:text-accent"
                          >
                            {county.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>
          </div>

          <aside>
            <div className="rounded-xl border border-border bg-surface p-6">
              <h2 className="text-lg font-semibold text-primary">Embed this map</h2>
              <p className="mt-2 text-sm text-ink-muted">
                Run a hotel, venue, or local business in our service area? Feel free to embed
                this map on your own site &mdash; it&rsquo;s a static image, no tracking, and
                loads instantly.
              </p>
              <div className="mt-4">
                <EmbedCodeBlock code={EMBED_CODE} />
              </div>
            </div>
          </aside>
        </div>
      </Container>
    </>
  );
}
