import { getFloorPlanBySlug } from "@/lib/sanity";
import { notFound } from "next/navigation";
import { GalleryProduct } from "@/components/blocks/gallery-product";

type Props = {
  params: Promise<{ slug: string }>;
};

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const plan = await getFloorPlanBySlug(slug);

  const attributes = ["description", "squareFeet", "bedrooms", "bathrooms"];
  if (!plan) return notFound();

  return (
    <div className="max-w-screen-xl mx-auto px-4 py-12 space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2">
        {plan.images && <GalleryProduct images={plan.images} />}
        <div className="flex flex-col gap-2">
          <h1 className="text-4xl font-bold">{plan.title}</h1>
          <p className="text-muted-foreground">{plan.type}</p>
          {attributes.map((attr) =>
            plan[attr as keyof typeof plan] ? (
              <div key={attr}>
                <p className="font-semibold capitalize">
                  {attr}:{" "}
                  <span className="font-normal">
                    {plan[attr as keyof typeof plan]}
                  </span>
                </p>
              </div>
            ) : null
          )}
        </div>
      </div>
    </div>
  );
}
