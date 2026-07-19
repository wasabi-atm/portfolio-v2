"use client";

import { useEffect, useRef, useState } from "react";

function FullWidthImage({ src, alt = "", caption = "" }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -30px 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <figure
      ref={ref}
      className="my-12 md:my-16 not-prose -mx-6 sm:-mx-8 md:-mx-12 lg:-mx-24 xl:-mx-32"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "scale(1)" : "scale(0.98)",
        transition:
          "opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
      }}
    >
      <div className="overflow-hidden rounded-none md:rounded-2xl">
        <img
          src={src}
          alt={alt}
          className="w-full h-auto object-cover"
          loading="lazy"
        />
      </div>
      {caption && (
        <figcaption className="text-center text-sm text-zinc-400 dark:text-zinc-500 mt-4 px-6">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}

export { FullWidthImage };
