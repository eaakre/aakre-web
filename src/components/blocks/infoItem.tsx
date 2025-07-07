"use client";

import Image from "next/image";
import { urlForImage } from "@/lib/sanity";
import Link from "next/link";
import { buttonVariants } from "../ui/button";
import { InfoItemProps } from "@/types/cms";

export function InfoItem({
  image,
  heading,
  body,
  ctas,
  index = 0,
}: InfoItemProps) {
  return (
    <div
      className="bg-gray-200 p-6 text-center flex flex-col items-center rounded shadow-sm animate-fadeUp"
      style={{
        animationDelay: `${index * 100}ms`,
        animationFillMode: "forwards",
      }}
    >
      {image && (
        <div className="w-12 h-12 mb-4">
          <Image
            src={urlForImage(image).width(100).height(100).url()}
            alt={heading}
            width={48}
            height={48}
          />
        </div>
      )}
      <h2 className="uppercase font-bold text-lg mb-2">{heading}</h2>
      <p className="text-sm text-gray-700 mb-4">{body}</p>
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
  );
}
