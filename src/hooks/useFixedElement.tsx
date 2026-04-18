"use client";

import { useRef, useLayoutEffect } from "react";
import type { MutableRefObject } from "react";
import { ScrollSmoother } from "gsap/ScrollSmoother";

/**
 * useFixedElement
 *
 * Solves the "fixed element disappears / moves with scroll" bug in ScrollSmoother.
 *
 * Root cause:
 *   ScrollSmoother moves #smooth-content via transform: translateY().
 *   Any `position: fixed` child of that element is taken out of the
 *   transform stacking context by the browser — it visually flies off or
 *   disappears entirely.
 *
 * This hook applies data-speed="0.01" programmatically, which tells
 * ScrollSmoother to counter-translate the element on every frame,
 * keeping it visually pinned — exactly like position: fixed but
 * compatible with the transform context.
 *
 * Usage:
 *   const navRef = useFixedElement<HTMLDivElement>();
 *   <div ref={navRef} className="fixed top-0 left-0 w-full z-50">
 *     <Navbar />
 *   </div>
 *
 * Note: If the element lives OUTSIDE #smooth-wrapper (e.g. in layout.tsx
 * as a sibling), you do NOT need this hook — position: fixed works normally.
 * Only use this when the fixed element MUST be inside #smooth-content.
 */
const useFixedElement = <T extends HTMLElement>(): MutableRefObject<T | null> => {
    const ref = useRef<T | null>(null);

    useLayoutEffect(() => {
        const el = ref.current;
        if (!el) return;

        // data-speed="0.01" keeps the element virtually stationary.
        // Exactly 0 causes a known GSAP edge case — 0.01 is the safe floor.
        el.dataset.speed = "0.01";

        // If ScrollSmoother is already initialized, refresh effects
        // so it picks up the newly added data-speed attribute.
        const smoother = ScrollSmoother.get();
        if (smoother) {
            smoother.effects(el, { speed: 0.01 });
        }

        return () => {
            // Clean up the dataset attribute on unmount
            delete el.dataset.speed;
        };
    }, []);

    return ref;
};

export default useFixedElement;