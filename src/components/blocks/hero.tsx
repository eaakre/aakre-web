"use client";

import Image from "next/image";
import { urlForImage } from "@/lib/sanity";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

type HeroProps = {
  heading: string;
  subheading?: string;
  backgroundType?: "image" | "video" | "color";
  backgroundImage?: any;
  backgroundVideoUrl?: string;
  backgroundColor?: string;
  fullWidth?: boolean;
  ctas?: Array<{
    text: string;
    url: string;
  }>;
  align?: "left" | "center" | "right";
};

export function Hero({
  heading,
  subheading,
  backgroundType = "image",
  backgroundImage,
  backgroundVideoUrl,
  backgroundColor = "#111827", // default bg-gray-900
  fullWidth = false,
  ctas = [],
  align = "center",
}: HeroProps) {
  const alignClass = {
    left: "items-start text-left",
    center: "items-center text-center",
    right: "items-end text-right",
  }[align];

  return (
    <section className="relative w-full h-[60vh] flex items-center justify-center overflow-hidden">
      {/* Backgrounds */}
      {backgroundType === "image" && backgroundImage && (
        <Image
          src={urlForImage(backgroundImage).width(1600).height(900).url()}
          alt={heading}
          fill
          priority
          className="object-cover w-full h-full"
        />
      )}
      {backgroundType === "video" && backgroundVideoUrl && (
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 object-cover w-full h-full"
        >
          <source src={backgroundVideoUrl} type="video/mp4" />
        </video>
      )}
      {backgroundType === "color" && (
        <div
          className={`absolute inset-0 ${backgroundColor.startsWith("bg-") ? backgroundColor : ""}`}
          style={{
            backgroundColor: backgroundColor.startsWith("#")
              ? backgroundColor
              : undefined,
          }}
        />
      )}

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50 z-10" />

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className={`relative z-20 px-6 text-white flex flex-col max-w-screen-xl w-full ${alignClass}`}
      >
        <div className="max-w-3xl space-y-6">
          <h2 className="text-4xl md:text-6xl font-bold leading-tight">
            {heading}
          </h2>
          {subheading && (
            <p className="text-lg md:text-xl text-gray-200">{subheading}</p>
          )}
          {ctas?.length > 0 && (
            <div className="flex gap-4 mt-4 flex-wrap justify-center">
              {ctas.map((cta, index) => (
                <Button
                  key={index}
                  asChild
                  variant={index === 0 ? "default" : "secondary"}
                >
                  <a href={cta.url}>{cta.text}</a>
                </Button>
              ))}
            </div>
          )}
        </div>
      </motion.div>
    </section>
  );
}
