"use client";

import Image from "next/image";
import { useState } from "react";
import { urlForImage } from "@/lib/sanity";
import { ImageSlider } from "@/components/ui/image-slider";

type GalleryProps = {
  title?: string;
  images: Array<{
    _key: string;
    asset: any;
    alt?: string;
  }>;
};

export function Gallery({ title, images }: GalleryProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const close = () => setActiveIndex(null);
  const next = () =>
    setActiveIndex((i) => (i === null ? null : (i + 1) % images.length));
  const prev = () =>
    setActiveIndex((i) =>
      i === null ? null : (i - 1 + images.length) % images.length
    );

  if (!images?.length) return null;

  return (
    <section className="space-y-4 flex flex-col w-full items-center px-4">
      <div className="w-full max-w-screen-xl mx-auto px-4 py-12 space-y-8">
        {title && <h2 className="text-4xl font-bold">{title}</h2>}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {images.map((img, i) => (
            <div
              key={img._key}
              className="relative aspect-square cursor-pointer"
              onClick={() => setActiveIndex(i)}
            >
              <Image
                src={urlForImage(img).width(800).height(800).url()}
                alt={img.alt || ""}
                fill
                className="object-cover rounded-md"
              />
            </div>
          ))}
        </div>
      </div>

      {activeIndex !== null && (
        <ImageSlider
          images={images}
          activeIndex={activeIndex}
          onClose={close}
          onNext={next}
          onPrev={prev}
          onSelect={setActiveIndex}
        />
      )}
    </section>
  );
}
