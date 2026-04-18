"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const HorizontalScroll = () => {
    const h1Ref = useRef<HTMLHeadingElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Make sure we are in browser
        if (typeof window === "undefined") return;

        gsap.registerPlugin(ScrollTrigger);

        if (!h1Ref.current || !containerRef.current) return;

        // Use context for React cleanup
        const ctx = gsap.context(() => {
            gsap.to(h1Ref.current, {
                transform: "translateX(-260%)",
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top 0%",
                    end: "top -260%",
                    scrub: 2,
                    pin: true,
                    // markers: true, // optional for debugging
                },
            });
        }, containerRef);

        return () => {
            ctx.revert(); // cleanup
        };
    }, []);

    return (
        <div
            ref={containerRef}
            id="page3"
            className="bg-red-500 overflow-hidden p-12 h-screen"
        >
            <h1 className="whitespace-nowrap m-0 uppercase text-[40vw]" ref={h1Ref}>
                Animation
            </h1>
        </div>
    );
};

export default HorizontalScroll;