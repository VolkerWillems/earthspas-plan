"use client";

import * as React from "react";

export function MotionController() {
  React.useEffect(() => {
    const root = document.documentElement;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const pointerCleanups = new Map<HTMLElement, () => void>();

    const updateProgress = () => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      const progress = scrollable > 0 ? Math.min(1, Math.max(0, window.scrollY / scrollable)) : 0;
      root.style.setProperty("--page-progress", String(progress));
    };

    const revealObserver = reducedMotion
      ? null
      : new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (!entry.isIntersecting) return;
              entry.target.classList.add("is-visible");
              revealObserver?.unobserve(entry.target);
            });
          },
          { rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
        );

    const prepareElement = (element: HTMLElement) => {
      if (element.matches("[data-reveal]")) {
        const delay = Number(element.dataset.revealDelay ?? 0);
        element.style.setProperty("--reveal-delay", String(Number.isFinite(delay) ? delay : 0));
        if (reducedMotion) element.classList.add("is-visible");
        else revealObserver?.observe(element);
      }

      if (element.matches("[data-motion-card]") && !pointerCleanups.has(element)) {
        const onPointerMove = (event: PointerEvent) => {
          const rect = element.getBoundingClientRect();
          element.style.setProperty("--pointer-x", `${event.clientX - rect.left}px`);
          element.style.setProperty("--pointer-y", `${event.clientY - rect.top}px`);
        };
        element.addEventListener("pointermove", onPointerMove);
        pointerCleanups.set(element, () => element.removeEventListener("pointermove", onPointerMove));
      }
    };

    const prepareTree = (rootElement: ParentNode) => {
      if (rootElement instanceof HTMLElement) prepareElement(rootElement);
      rootElement.querySelectorAll<HTMLElement>("[data-reveal], [data-motion-card]").forEach(prepareElement);
    };

    prepareTree(document);
    updateProgress();

    const mutationObserver = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (node instanceof HTMLElement) prepareTree(node);
        });
      });
      updateProgress();
    });

    mutationObserver.observe(document.body, { childList: true, subtree: true });
    window.addEventListener("scroll", updateProgress, { passive: true });
    window.addEventListener("resize", updateProgress);

    return () => {
      mutationObserver.disconnect();
      revealObserver?.disconnect();
      pointerCleanups.forEach((remove) => remove());
      window.removeEventListener("scroll", updateProgress);
      window.removeEventListener("resize", updateProgress);
    };
  }, []);

  return null;
}
