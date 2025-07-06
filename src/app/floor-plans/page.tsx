import { getAllFloorPlans } from "@/lib/sanity";
import Link from "next/link";
import Image from "next/image";
import { FloorPlanFilterButtons } from "./filter-buttons";
import { generateSEOMetadata } from "@/lib/seo";

export const metadata = generateSEOMetadata({
  title: "Floor Plans | Solid Ground Homes",
  description:
    "Explore our wide range of floor plans for homes, including ramblers and two-story layouts built for comfort and efficiency.",
  canonicalUrl: "https://solidgroundhomes.com/floor-plans",
});

export default async function FloorPlansPage({
  searchParams,
}: {
  searchParams?: { type?: string };
}) {
  const allPlans = await getAllFloorPlans();

  const typeFilter = searchParams?.type;
  const filteredPlans = typeFilter
    ? allPlans.filter((plan) => plan.type === typeFilter)
    : allPlans;

  const types = Array.from(
    new Set(allPlans.map((plan) => plan.type).filter((t): t is string => !!t))
  );

  return (
    <div className="max-w-screen-xl mx-auto px-4 py-12 space-y-8">
      <h1 className="text-4xl font-bold">Floor Plans</h1>

      <FloorPlanFilterButtons types={types} activeType={typeFilter} />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filteredPlans.map((plan) => (
          <Link key={plan._id} href={`/floor-plans/${plan.slug.current}`}>
            <div className="border rounded-lg overflow-hidden shadow hover:shadow-md transition">
              {plan.images?.[0]?.url && (
                <div className="relative aspect-video">
                  <Image
                    src={plan.images[0].url}
                    alt={plan.images[0].alt || plan.title}
                    fill
                    className="object-cover rounded-t"
                  />
                </div>
              )}

              <div className="p-4 space-y-1">
                <h2 className="text-lg font-semibold">{plan.title}</h2>
                <p className="text-sm text-muted-foreground">{plan.type}</p>
                <p className="text-sm text-muted-foreground">
                  {plan.bedrooms} bed · {plan.bathrooms} bath ·{" "}
                  {plan.squareFeet} sqft
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
