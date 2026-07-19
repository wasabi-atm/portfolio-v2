"use client";

import { useEffect, useRef, useState } from "react";

function ImageText({ image, alt = "", position = "right", children }) {
  const ref = useRef(null);
  const imgRef = useRef(null);
  const [visible, setVisible] = useState(false);

  // Scroll-reveal
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
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Parallax effect on the image
  useEffect(() => {
    const img = imgRef.current;
    if (!img) return;

    const handleScroll = () => {
      const rect = img.getBoundingClientRect();
      const viewH = window.innerHeight;
      // Progress: 0 when entering bottom, 1 when leaving top
      const progress = 1 - (rect.top + rect.height) / (viewH + rect.height);
      const clampedProgress = Math.max(0, Math.min(1, progress));
      // Subtle parallax: -20px to +20px
      const offset = (clampedProgress - 0.5) * 40;
      img.style.transform = `translateY(${offset}px)`;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isLeft = position === "left";

  return (
    <div
      ref={ref}
      className="my-12 md:my-16 not-prose"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(24px)",
        transition:
          "opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1), transform 0.7s cubic-bezier(0.16, 1, 0.3, 1)",
      }}
    >
      <div
        className={`flex flex-col gap-8 md:gap-12 ${
          isLeft ? "md:flex-row" : "md:flex-row-reverse"
        } items-center`}
      >
        {/* Image */}
        <div className="w-full md:w-1/2 overflow-hidden rounded-2xl bg-zinc-100 dark:bg-zinc-800">
          <img
            ref={imgRef}
            src={image}
            alt={alt}
            className="w-full h-auto object-cover will-change-transform"
            loading="lazy"
          />
        </div>

        {/* Text */}
        <div className="w-full md:w-1/2">
          <div className="text-base md:text-lg text-zinc-600 dark:text-zinc-300 leading-relaxed space-y-4">
            {typeof children === "string" ? (
              children.split("\n\n").map((para, i) => <p key={i}>{para}</p>)
            ) : (
              children
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export { ImageText };
