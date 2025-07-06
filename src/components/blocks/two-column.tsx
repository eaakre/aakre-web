// components/blocks/two-column.tsx
"use client";

import Image from "next/image";
import { urlForImage } from "@/lib/sanity";
import Link from "next/link";
import { buttonVariants } from "../ui/button";
import { Column } from "@/types/cms";

type TwoColumnProps = {
  left?: Column;
  right?: Column;
};

export function TwoColumn({ left, right }: TwoColumnProps) {
  const renderColumn = (col: Column) => (
    <div className="relative aspect-[2/1] rounded overflow-hidden">
      {/* Background image */}
      {col.image && (
        <Image
          src={urlForImage(col.image).width(800).height(400).url()}
          alt={col.heading || ""}
          fill
          className="object-cover"
        />
      )}

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50" />

      {/* Content */}
      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center text-white px-4 space-y-3">
        {col.heading && (
          <h2 className="text-2xl font-semibold">{col.heading}</h2>
        )}
        {col.body && (
          <p className="text-sm md:text-base max-w-md">{col.body}</p>
        )}
        {/* {col.cta?.text && col.cta?.url && (
          <Button asChild variant="secondary">
            <a href={col.cta.url}>{col.cta.text}</a>
          </Button>
        )} */}
        {col.cta && (
          <div className="flex gap-2 flex-wrap justify-center">
            <Link
              href={col.cta.href}
              className={buttonVariants({
                variant: col.cta.variant ?? "default",
                size: col.cta.size ?? "default",
              })}
            >
              {col.cta.text}
            </Link>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <section className="px-4 py-12">
      <div className="max-w-screen-xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
        {left && renderColumn(left)}
        {right && renderColumn(right)}
      </div>
    </section>
  );
}
