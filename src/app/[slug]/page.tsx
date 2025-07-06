import { getPageBySlug } from "@/lib/sanity";
import { Hero } from "@/components/blocks/hero";
import { Gallery } from "@/components/blocks/gallery";
import { notFound } from "next/navigation";
import { TextBlock } from "@/components/blocks/text-block";
import { TwoColumn } from "@/components/blocks/two-column";
import { InfoGrid } from "@/components/blocks/infoGrid";
import { GoogleMap } from "@/components/ui/google-map-embed";
import { generateSEOMetadata } from "@/lib/seo";

type PageProps = {
  params: {
    slug: string;
  };
};

// 🧠 SEO: Generate <title>, <meta name="description">, etc.
export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}) {
  const page = await getPageBySlug(params.slug);
  if (!page) return notFound();

  return generateSEOMetadata({
    title: `${page.title}`,
    description: page.description || "Browse modular homes and learn more.",
    canonicalUrl: `https://solidgroundhomes.com/${params.slug}`,
    ogImage: page.ogImage
      ? page.ogImageUrl
      : "https://solidgroundhomes.com/default-og.jpg",
  });
}

export default async function Page({ params }: PageProps) {
  const page = await getPageBySlug(params.slug);

  if (!page) return notFound();

  return (
    <section className="space-y-8 pb-10">
      {page.heading && <h1 className="sr-only">{page.heading}</h1>}
      {page.contentSlots?.map((slot: any, index: number) => {
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
