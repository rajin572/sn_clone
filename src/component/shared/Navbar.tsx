"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { socials } from "../../../constants";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const NAV_SECTIONS = ["home", "services", "about", "work", "contact"] as const;

const Navbar = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const navRef = useRef<HTMLElement>(null);
    const navWrapperRef = useRef<HTMLDivElement>(null);
    const linksRef = useRef<(HTMLDivElement | null)[]>([]);
    const contactRef = useRef<HTMLDivElement>(null);
    const topLineRef = useRef<HTMLSpanElement>(null);
    const bottomLineRef = useRef<HTMLSpanElement>(null);

    const navTl = useRef<gsap.core.Timeline | null>(null);
    const iconTl = useRef<gsap.core.Timeline | null>(null);

    const [isOpen, setIsOpen] = useState(false);
    const [showBurger, setShowBurger] = useState(true);

    useGSAP(
        () => {
            gsap.set(navRef.current, { xPercent: 100 });
            gsap.set([linksRef.current, contactRef.current], {
                autoAlpha: 0,
                x: -20,
            });

            navTl.current = gsap
                .timeline({ paused: true })
                .to(navRef.current, {
                    xPercent: 0,
                    duration: 1,
                    ease: "power3.out",
                })
                .to(
                    linksRef.current,
                    {
                        autoAlpha: 1,
                        x: 0,
                        duration: 0.5,
                        stagger: 0.1,
                        ease: "power2.out",
                    },
                    "<"
                )
                .to(
                    contactRef.current,
                    {
                        autoAlpha: 1,
                        x: 0,
                        duration: 0.5,
                        ease: "power2.out",
                    },
                    "<+0.2"
                );

            iconTl.current = gsap
                .timeline({ paused: true })
                .to(topLineRef.current, {
                    rotate: 45,
                    y: 3.3,
                    duration: 0.3,
                    ease: "power3.inOut",
                })
                .to(
                    bottomLineRef.current,
                    {
                        rotate: -45,
                        y: -3.3,
                        duration: 0.3,
                        ease: "power3.inOut",
                    },
                    "<"
                );

            ScrollTrigger.create({
                start: "top top",
                end: "max",
                onUpdate: (self) => {
                    if (!isOpen && self.scroll() === 0 && self.direction === -1) {
                        setTimeout(() => setShowBurger(false), 1000);
                        return;
                    }
                    if (!isOpen && self.direction === 1) {
                        setTimeout(() => setShowBurger(false), 100);
                    } else {
                        setShowBurger(true);
                    }
                },
            });
        },
        { scope: containerRef }
    );

    const toggleMenu = () => {
        if (!navTl.current || !iconTl.current) return;

        if (isOpen) {
            navTl.current.reverse();
            iconTl.current.reverse();
        } else {
            navTl.current.play();
            iconTl.current.play();
        }
        setIsOpen((prev) => !prev);
    };


    useEffect(() => {
        if (!isOpen) return;

        const handlePointerDown = (event: PointerEvent) => {
            const target = event.target as Node;
            if (navRef.current?.contains(target)) return;
            if (navWrapperRef.current?.contains(target)) return;

            navTl.current?.reverse();
            iconTl.current?.reverse();
            setIsOpen(false);
        };

        document.addEventListener("pointerdown", handlePointerDown);
        return () => document.removeEventListener("pointerdown", handlePointerDown);
    }, [isOpen]);


    const clipPath = showBurger
        ? "circle(100% at 50% 50%)"
        : "circle(0% at 50% 50%)";

    return (
        <div ref={containerRef}>
            <nav
                ref={navRef}
                className="fixed z-50 flex flex-col justify-between w-full h-full px-6 md:px-10 uppercase bg-black text-white/80 py-28 gap-y-10 md:w-1/2 md:left-1/2"
            >
                <div className="flex flex-col text-4xl gap-y-2 md:text-5xl">
                    {NAV_SECTIONS.map((section, index) => (
                        <div
                            key={section}
                            ref={(el) => {
                                linksRef.current[index] = el;
                            }}
                        >
                            <Link
                                href={`/${section}`}
                                className="transition-all duration-700 cursor-pointer hover:text-white hover:tracking-[0.5rem] ease-in-out"
                            >
                                {section}
                            </Link>
                        </div>
                    ))}
                </div>

                <div
                    ref={contactRef}
                    className="flex flex-col flex-wrap justify-between gap-8 md:flex-row"
                >
                    <div className="font-light">
                        <p className="tracking-wider text-white/50">E-mail</p>
                        <p className="text-xl tracking-widest lowercase text-pretty">
                            dev.approxcoding@gmail.com
                        </p>
                    </div>

                    <div className="font-light">
                        <p className="tracking-wider text-white/50">Social Media</p>
                        <div className="flex flex-wrap gap-x-3">
                            {socials.map((social) => (
                                <a
                                    key={social.name}
                                    href={social.href}
                                    className="text-sm leading-loose tracking-widest uppercase hover:text-white transition-colors duration-300"
                                >
                                    {`[${social.name}]`}
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
            </nav>

            <div
                ref={navWrapperRef}
                className={`w-full fixed z-50 flex flex-row gap-5 justify-between px-4 md:px-10 pt-4 ${!showBurger && "pointer-events-none"} }`}            >
                <div
                    className="h-10 md:h-14 transition-[clip-path] duration-500 ease-in-out"
                    style={{ clipPath }}
                >
                    <Image
                        width={1000}
                        height={1000}
                        src="/assets/logo.png"
                        alt="Logo"
                        className="h-full w-auto"
                    />
                </div>

                <button
                    type="button"
                    aria-label={isOpen ? "Close menu" : "Open menu"}
                    aria-expanded={isOpen}
                    onClick={toggleMenu}
                    className="flex flex-col items-center justify-center gap-1 transition-[clip-path] duration-500 ease-in-out bg-black rounded-full cursor-pointer w-10 h-10 md:w-14 md:h-14"
                    style={{ clipPath }}
                >
                    <span
                        ref={topLineRef}
                        className="block w-6 md:w-8 h-0.5 bg-white rounded-full origin-center"
                    />
                    <span
                        ref={bottomLineRef}
                        className="block w-6 md:w-8 h-0.5 bg-white rounded-full origin-center"
                    />
                </button>
            </div>
        </div>
    );
};

export default Navbar;
