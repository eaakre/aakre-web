// lib/sanity.ts
import { createClient, groq } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";

export type FloorPlan = {
  _id: string;
  title: string;
  slug: {
    current: string;
  };
  type?: string;
  bedrooms?: number;
  bathrooms?: number;
  squareFeet?: number;
  images?: {
    _key: string;
    asset: any;
    alt?: string;
    url: string;
  }[];
  imageUrl?: string | null;
};

// Constants for reuse
export const projectId = "wrbmku53";
export const dataset = "production";

// Sanity client
export const client = createClient({
  projectId,
  dataset,
  apiVersion: "2024-06-01",
  useCdn: true,
});

// ✅ Image URL builder
const builder = imageUrlBuilder({ projectId, dataset });
export const urlForImage = (source: any) => builder.image(source);

// Get homepage (if still using it directly)
export async function getHomepageContent() {
  const query = groq`*[_type == "homepage"][0]{
    title,
    contentSlots[]{
      _type,
      ...
    }
  }`;
  return await client.fetch(query);
}

// Get a flexible page by slug (preferred long-term)
export async function getPageBySlug(slug: string) {
  const query = groq`
    *[_type == "page" && slug.current == $slug][0]{
      title,
      slug,
      heading,
      contentSlots[]{
        _type,
        ...
      }
    }`;
  return await client.fetch(query, { slug });
}

export async function getAllFloorPlans() {
  return await client
    .fetch(
      groq`
    *[_type == "floorPlan"] | order(title asc) {
      _id,
      title,
      slug,
      type,
      bedrooms,
      bathrooms,
      squareFeet,
      images,
    }
  `
    )
    .then((plans: FloorPlan[]) =>
      plans.map((plan) => ({
        ...plan,
        images:
          plan.images?.map((img: any) =>
            img
              ? { ...img, url: urlForImage(img).width(800).height(600).url() }
              : null
          ) ?? [],
      }))
    );
}

export async function getFloorPlanBySlug(slug: string) {
  return await client
    .fetch(
      groq`
    *[_type == "floorPlan" && slug.current == $slug][0] {
      title,
      type,
      bedrooms,
      bathrooms,
      squareFeet,
      images,
      description,
    }
  `,
      { slug }
    )
    .then((plan) =>
      plan
        ? {
            ...plan,
            images:
              plan.images?.map((img: any) =>
                img
                  ? {
                      ...img,
                      url: urlForImage(img).width(800).height(600).url(),
                    }
                  : null
              ) ?? [],
          }
        : null
    );
}
