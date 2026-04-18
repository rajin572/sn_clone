'use client';

import { useRef, useEffect, Children, useState } from 'react';
import { gsap, useGSAP } from '@/lib/gsap-util';

interface SectionSnapScrollProps {
    children: React.ReactNode;
}

export default function SectionSnapScroll({ children }: SectionSnapScrollProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const wrapperRef = useRef<HTMLDivElement>(null);
    const currentIndex = useRef(0);
    const isAnimating = useRef(false);
    const [activeIndex, setActiveIndex] = useState(0);

    const childrenArray = Children.toArray(children);
    const total = childrenArray.length;

    // GSAP context scoped to containerRef — tweens are auto-killed on unmount.
    // contextSafe wraps a function so any gsap.* calls inside it are tracked
    // by the context and properly reverted/cleaned up.
    const { contextSafe } = useGSAP({ scope: containerRef });

    // Store the latest context-safe snapTo in a ref so event listeners
    // never need to re-register (their useEffect can use empty deps).
    const snapToRef = useRef<(index: number) => void>(() => { });

    // Update the ref inside an effect — refs must not be mutated during render.
    // Runs once on mount (contextSafe and total are stable after mount).
    useEffect(() => {
        snapToRef.current = contextSafe((index: number) => {
            if (index < 0 || index >= total || isAnimating.current) return;

            isAnimating.current = true;
            currentIndex.current = index;
            setActiveIndex(index);

            gsap.to(wrapperRef.current, {
                y: -index * window.innerHeight,
                duration: 1,
                ease: 'power3.inOut',
                onComplete: () => {
                    isAnimating.current = false;
                },
            });
        });
    }, [contextSafe, total]);

    // Event listeners are not GSAP-specific — they stay in useEffect.
    // Empty deps: handlers always call through snapToRef so they're always fresh.
    useEffect(() => {
        document.body.style.overflow = 'hidden';

        const onWheel = (e: WheelEvent) => {
            e.preventDefault();
            if (isAnimating.current) return;
            snapToRef.current(currentIndex.current + (e.deltaY > 0 ? 1 : -1));
        };

        let touchStartY = 0;
        const onTouchStart = (e: TouchEvent) => {
            touchStartY = e.touches[0].clientY;
        };
        const onTouchEnd = (e: TouchEvent) => {
            const diff = touchStartY - e.changedTouches[0].clientY;
            if (Math.abs(diff) > 40) {
                snapToRef.current(currentIndex.current + (diff > 0 ? 1 : -1));
            }
        };

        const onKeyDown = (e: KeyboardEvent) => {
            if (isAnimating.current) return;
            if (e.key === 'ArrowDown' || e.key === 'PageDown') {
                e.preventDefault();
                snapToRef.current(currentIndex.current + 1);
            } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
                e.preventDefault();
                snapToRef.current(currentIndex.current - 1);
            }
        };

        window.addEventListener('wheel', onWheel, { passive: false });
        window.addEventListener('touchstart', onTouchStart, { passive: true });
        window.addEventListener('touchend', onTouchEnd, { passive: true });
        window.addEventListener('keydown', onKeyDown);

        return () => {
            document.body.style.overflow = '';
            window.removeEventListener('wheel', onWheel);
            window.removeEventListener('touchstart', onTouchStart);
            window.removeEventListener('touchend', onTouchEnd);
            window.removeEventListener('keydown', onKeyDown);
        };
    }, []);

    return (
        // containerRef scopes the GSAP context
        <div
            ref={containerRef}
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100vh',
                overflow: 'hidden',
            }}
        >
            {/* Vertically stacked sections — GSAP animates translateY here */}
            <div ref={wrapperRef} style={{ willChange: 'transform' }}>
                {childrenArray.map((child, i) => (
                    <div key={i} style={{ height: '100vh', width: '100%' }}>
                        {child}
                    </div>
                ))}
            </div>

            {/* Dot navigation */}
            <div
                style={{
                    position: 'fixed',
                    right: '24px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '12px',
                    zIndex: 9999,
                }}
            >
                {childrenArray.map((_, i) => (
                    <button
                        key={i}
                        onClick={() => snapToRef.current(i)}
                        aria-label={`Go to section ${i + 1}`}
                        style={{
                            width: activeIndex === i ? '12px' : '8px',
                            height: activeIndex === i ? '12px' : '8px',
                            borderRadius: '50%',
                            background: activeIndex === i ? '#0c3188' : '#aaa',
                            border: activeIndex === i ? '2px solid #0c3188' : '2px solid #aaa',
                            cursor: 'pointer',
                            padding: 0,
                            transition: 'all 0.3s ease',
                        }}
                    />
                ))}
            </div>
        </div>
    );
}


//  <SectionSnapScroll>
//             <Banner />
//             <About />
//             <Work />
//             <Testimonial />
//         </SectionSnapScroll>