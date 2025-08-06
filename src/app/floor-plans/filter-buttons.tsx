"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { track } from "@vercel/analytics";

type Props = {
  types: string[];
  activeType?: string;
};

export function FloorPlanFilterButtons({ types, activeType }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleClick = (type: string | null) => {
    track("Filter", { type: type });
    const params = new URLSearchParams(searchParams?.toString());
    if (type) {
      params.set("type", type);
    } else {
      params.delete("type");
    }
    router.push(`?${params.toString()}`);
  };

  return (
    <div className="flex flex-wrap gap-2">
      <button
        onClick={() => handleClick(null)}
        className={`px-3 py-1 rounded border ${
          !activeType ? "bg-primary text-white" : "bg-white"
        }`}
      >
        All
      </button>
      {types.map((type) => (
        <button
          key={type}
          onClick={() => handleClick(type)}
          className={`px-3 py-1 rounded border cursor-pointer ${
            activeType === type ? "bg-primary text-white" : "bg-white"
          }`}
        >
          {type}
        </button>
      ))}
    </div>
  );
}
