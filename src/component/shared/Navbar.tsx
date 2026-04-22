"use client";
import { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import ScrollTrigger from "gsap/ScrollTrigger";
import Image from "next/image";
import Link from "next/link";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText);

const NAV_SECTIONS = ["home", "services", "about", "contact", "lab"] as const;

const Navbar = () => {
    const containerRef = useRef<HTMLDivElement>(null);


    const [showNavbar, setShowNavbar] = useState(true);
    const [showMenu, setShowMenu] = useState(false);

    const menuTl = useRef<gsap.core.Timeline | null>(null);
    const iconTl = useRef<gsap.core.Timeline | null>(null);
    const topLineRef = useRef<HTMLSpanElement>(null);
    const bottomLineRef = useRef<HTMLSpanElement>(null);
    const scrollTriggerRef = useRef<{ enable?: () => void; disable?: () => void; kill?: () => void } | null>(null);



    useGSAP(
        () => {

            const textSplit = SplitText.create(".text", {
                type: "line words",
                mask: "words",
                autoSplit: true
            });

            gsap.set(textSplit.words, {
                yPercent: 100,
            });
            gsap.set(".menu", {
                yPercent: -100,
            });

            scrollTriggerRef.current = ScrollTrigger.create({
                onUpdate: (self) => {
                    if (self.scroll() < 10) {
                        setShowNavbar(true);
                        return;
                    }
                    setShowNavbar(self.direction !== 1);
                },
            });

            menuTl.current = gsap
                .timeline({ paused: true })
                .to(".menu", {
                    yPercent: 0,
                    duration: 0.5,
                    ease: "power1.inOut",
                })
                .to(textSplit.words, {
                    yPercent: 0,
                    ease: "power1.inOut",
                    stagger: 0.12
                }, "<+0.4");

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

            return () => {
                scrollTriggerRef.current?.kill?.();
            };



        },
        { scope: containerRef }
    );

    const troggle = () => {
        if (!menuTl.current) return;

        if (showMenu) {
            menuTl.current.reverse();
            iconTl.current?.reverse();
            scrollTriggerRef.current?.enable?.();
        } else {
            menuTl.current.play();
            iconTl.current?.play();
            scrollTriggerRef.current?.disable?.();
        }
        setShowMenu((prev) => !prev);
    }

    const clipPath = showMenu || showNavbar
        ? "circle(100% at 50% 50%)"
        : "circle(0% at 50% 50%)";



    return (
        <div ref={containerRef} className="relative">
            {/* Fixed One Which will be call the trigers on scroll and show the menu */}
            <div className={`w-full fixed z-50 flex flex-row gap-5 justify-between px-4 md:px-10 pt-4 ${showMenu || showNavbar ? "" : "pointer-events-none"}`}>
                <div
                    className="transition-[clip-path] duration-500 ease-in-out"
                    style={{ clipPath }}
                >
                    <Image
                        src="/assets/logo.png"
                        alt="logo"
                        className="size-10 sm:size-12 lg:size-14"
                        width={100}
                        height={100}
                        quality={100}
                        fetchPriority="high"
                        priority
                    />
                </div>

                <div
                    onClick={troggle}
                    className="flex flex-col justify-center items-center gap-1.5 bg-[#000202] size-9 sm:size-10 lg:size-12 rounded-full cursor-pointer transition-[clip-path] duration-500 ease-in-out"
                    style={{ clipPath }}
                >
                    <span ref={topLineRef} className="bg-white w-6 sm:w-7 lg:w-8 h-0.5 rounded-full origin-center"></span>
                    <span ref={bottomLineRef}
                        className="bg-white w-6 sm:w-7 lg:w-8 h-0.5 rounded-full origin-center"></span>
                </div>
            </div>

            <div className="menu h-screen fixed top-0 left-0 w-full bg-[#BCF93C] -z-50">
                <div className=" mt-[calc(100vh-90vh)] w-[90%] mx-auto">
                    <div className="w-[90%] ml-auto flex flex-col space-y-3 sm:space-y-4 lg:space-y-5">
                        {
                            NAV_SECTIONS.map((section, index) => (
                                <Link onClick={troggle} href={`/#${section}`} key={index} className="w-fit text text-3xl sm:text-4xl lg:text-5xl xl:text-6xl uppercase transition-all duration-700 cursor-pointer hover:tracking-[0.5rem] font-medium ease-in-out">
                                    {section}
                                </Link>
                            ))
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
