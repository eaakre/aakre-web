"use client";

import Image from "next/image";
import { useState } from "react";
import { useSwipeable } from "react-swipeable";
import { urlForImage } from "@/lib/sanity";

type GalleryProps = {
  title?: string;
  images: Array<{
    _key: string;
    asset: {
      _ref?: string;
      _type?: string;
    };
    alt?: string;
  }>;
};

export function GalleryProduct({ title, images }: GalleryProps) {
  const [activeIndex, setActiveIndex] = useState<number>(0);

  const next = () => setActiveIndex((i) => (i + 1) % images.length);
  const prev = () =>
    setActiveIndex((i) => (i - 1 + images.length) % images.length);

  const swipeHandlers = useSwipeable({
    onSwipedLeft: next,
    onSwipedRight: prev,
    trackMouse: true,
  });

  if (!images?.length) return null;

  const activeImage = images[activeIndex];

  return (
    <section className="space-y-4 flex flex-col w-full items-center px-4">
      <div className="w-full max-w-screen-md">
        {title && <h2 className="text-xl font-semibold mb-4">{title}</h2>}

        {/* Featured image with swipe */}
        <div
          className="relative w-full aspect-square rounded overflow-hidden"
          {...swipeHandlers}
        >
          <Image
            src={urlForImage(activeImage).width(1200).height(1200).url()}
            alt={activeImage.alt || ""}
            fill
            className="object-cover"
          />
        </div>

        {/* Thumbnails */}
        <div className="flex gap-2 overflow-x-auto mt-4">
          {images.map((img, index) => (
            <button
              key={img._key}
              onClick={() => setActiveIndex(index)}
              className={`relative w-20 h-20 flex-shrink-0 border-2 rounded overflow-hidden ${
                index === activeIndex ? "border-primary" : "border-transparent"
              }`}
            >
              <Image
                src={urlForImage(img).width(160).height(160).url()}
                alt={img.alt || ""}
                fill
                className="object-cover"
              />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
