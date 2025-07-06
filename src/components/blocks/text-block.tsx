"use client";

import Image from "next/image";
import { urlForImage } from "@/lib/sanity";
import Link from "next/link";
import { buttonVariants } from "../ui/button";
import { CTA, SanityImage } from "@/types/cms";

type TextBlockProps = {
  title?: string;
  text?: string;
  image?: SanityImage;
  imagePosition?: "left" | "right";
  ctas?: CTA[];
};

export function TextBlock({
  title,
  text,
  image,
  imagePosition = "left",
  ctas,
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
        {ctas && ctas?.length > 0 && (
          <div className="flex gap-2 flex-wrap justify-center">
            {ctas.map((cta, i) => (
              <Link
                key={i}
                href={cta.href}
                className={buttonVariants({
                  variant: cta.variant ?? "default",
                  size: cta.size ?? "default",
                })}
              >
                {cta.text}
              </Link>
            ))}
          </div>
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
