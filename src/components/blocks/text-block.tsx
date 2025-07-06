"use client";

import Image from "next/image";
import { urlForImage } from "@/lib/sanity";

type TextBlockProps = {
  title?: string;
  text?: string;
  image?: any;
  imagePosition?: "left" | "right";
  cta?: {
    label?: string;
    url?: string;
  };
};

export function TextBlock({
  title,
  text,
  image,
  imagePosition = "left",
  cta,
}: TextBlockProps) {
  return (
    <section className="max-w-screen-xl mx-auto px-4 py-12 flex flex-col md:flex-row items-center gap-8">
      {image && imagePosition === "left" && (
        <div className="relative w-full max-w-md h-64 md:h-80 flex-shrink-0">
          <Image
            src={urlForImage(image).width(640).height(480).url()}
            alt={image.alt || "Text Block Image"}
            fill
            className="object-cover rounded-lg"
          />
        </div>
      )}

      <div className="flex-1 text-center md:text-left">
        {title && <h2 className="text-3xl font-semibold mb-4">{title}</h2>}
        {text && <p className="text-lg mb-6 whitespace-pre-line">{text}</p>}
        {cta?.label && cta?.url && (
          <a
            href={cta.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition"
          >
            {cta.label}
          </a>
        )}
      </div>

      {image && imagePosition === "right" && (
        <div className="relative w-full max-w-md h-64 md:h-80 flex-shrink-0">
          <Image
            src={urlForImage(image).width(640).height(480).url()}
            alt={image.alt || "Text Block Image"}
            fill
            className="object-cover rounded-lg"
          />
        </div>
      )}
    </section>
  );
}
