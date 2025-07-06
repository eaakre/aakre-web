"use client";

import { InfoItem, InfoItemProps } from "./infoItem";

type InfoGridProps = {
  items: InfoItemProps[];
};

export function InfoGrid({ items }: InfoGridProps) {
  const colCount = items.length === 2 ? "md:grid-cols-2" : "md:grid-cols-3";

  return (
    <section className="bg-gray-100 py-12 px-4">
      <div
        className={`max-w-screen-xl mx-auto grid grid-cols-1 ${colCount} gap-6`}
      >
        {items.map((item, i) => (
          <InfoItem key={i} {...item} index={i} />
        ))}
      </div>
    </section>
  );
}
