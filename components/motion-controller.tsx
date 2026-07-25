"use client";

import * as React from "react";

export function MotionController() {
  React.useEffect(() => {
    const root = document.documentElement;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const updateProgress = () => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      const progress = scrollable > 0 ? Math.min(1, Math.max(0, window.scrollY / scrollable)) : 0;
      root.style.setProperty("--page-progress", String(progress));
    };

    updateProgress();
    window.addEventListener("scroll", updateProgress, { passive: true });
    window.addEventListener("resize", updateProgress);

    if (reducedMotion) {
      document.querySelectorAll<HTMLElement>("[data-reveal]").forEach((element) => element.classList.add("is-visible"));
      return () => {
        window.removeEventListener("scroll", updateProgress);
        window.removeEventListener("resize", updateProgress);
      };
    }

    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          revealObserver.unobserve(entry.target);
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
    );

    document.querySelectorAll<HTMLElement>("[data-reveal]").forEach((element) => revealObserver.observe(element));

    const motionCards = Array.from(document.querySelectorAll<HTMLElement>("[data-motion-card]"));
    const removeCardListeners = motionCards.map((card) => {
      const onPointerMove = (event: PointerEvent) => {
        const rect = card.getBoundingClientRect();
        card.style.setProperty("--pointer-x", `${event.clientX - rect.left}px`);
        card.style.setProperty("--pointer-y", `${event.clientY - rect.top}px`);
      };
      card.addEventListener("pointermove", onPointerMove);
      return () => card.removeEventListener("pointermove", onPointerMove);
    });

    return () => {
      revealObserver.disconnect();
      removeCardListeners.forEach((remove) => remove());
      window.removeEventListener("scroll", updateProgress);
      window.removeEventListener("resize", updateProgress);
    };
  }, []);

  return null;
}
