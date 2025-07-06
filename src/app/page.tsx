import { getHomepageContent } from "@/lib/sanity";
import { getPageBySlug } from "@/lib/sanity";
import { Hero } from "@/components/blocks/hero";
import { Gallery } from "@/components/blocks/gallery";
import { notFound } from "next/navigation";
import { TextBlock } from "@/components/blocks/text-block";
import { TwoColumn } from "@/components/blocks/two-column";
import { InfoGrid } from "@/components/blocks/infoGrid";
import { GoogleMap } from "@/components/ui/google-map-embed";
import { generateSEOMetadata } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}) {
  const page = await getPageBySlug("Homepage");
  if (!page) return notFound();

  return generateSEOMetadata({
    title: page.title || "Solid Ground Homes",
    description: page.description || "Browse  homes and learn more.",
    canonicalUrl: `https://solidgroundhomes.com/`,
    ogImage: page.ogImage
      ? page.ogImageUrl
      : "https://solidgroundhomes.com/default-og.jpg",
  });
}

export default async function HomePage() {
  const homepage = await getPageBySlug("Homepage");

  if (!homepage) return notFound();

  return (
    <section className="space-y-8">
      {homepage.contentSlots?.map((slot: any, index: number) => {
        switch (slot._type) {
          case "hero":
            return <Hero key={index} {...slot} />;
          case "gallery":
            return <Gallery key={index} {...slot} />;
          case "textBlock":
            return <TextBlock key={index} {...slot} />;
          case "twoColumn":
            return <TwoColumn key={index} {...slot} />;
          case "infoGrid":
            return <InfoGrid key={index} {...slot} />;
          case "googleMap":
            return <GoogleMap key={index} {...slot} />;
          default:
            return (
              <div key={index} className="border p-4 rounded">
                <pre>{JSON.stringify(slot, null, 2)}</pre>
              </div>
            );
        }
      })}
    </section>
  );
}
