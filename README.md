"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { socials } from "../../../constants";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Navbar = () => {
const navWrapperRef = useRef(null);
const navRef = useRef(null);
const linksRef = useRef<(HTMLDivElement | null)[]>([]);
const contactRef = useRef(null);
const topLineRef = useRef(null);
const bottomLineRef = useRef(null);
const tl = useRef<gsap.core.Timeline | null>(null);
const iconT1 = useRef<gsap.core.Timeline | null>(null);
const [isOpen, setIsOpen] = useState(false);
const [showBurger, setShowBurger] = useState(true);

    useGSAP(() => {

        ScrollTrigger.create({
            trigger: navWrapperRef.current,
            start: "top top",
            end: "max",
            pin: false,
            onUpdate: (self) => {
                if (self.scroll() === 0 && self.direction === -1) {
                    setTimeout(() => setShowBurger(false), 1000);
                    return;
                }
                if (self.direction === 1) {
                    setTimeout(() => setShowBurger(false), 100);
                } else {
                    setShowBurger(true);
                }
            },
        });

        gsap.set(navRef.current, { xPercent: 100 });

        gsap.set([linksRef.current, contactRef.current], {
            autoAlpha: 0,
            x: -20
        })

        tl.current = gsap.timeline({
            paused: true,
        })
            .to(navRef.current, {
                xPercent: 0,
                duration: 1,
                ease: "power3.out",
            })
            .to(linksRef.current, {
                autoAlpha: 1,
                x: 0,
                duration: 0.5,
                stagger: 0.1,
                ease: "power3.out",
            },
                "<"
            )
            .to(contactRef.current, {
                autoAlpha: 1,
                x: 0,
                duration: 0.5,
                ease: "power3.out",
            },
                "<+0.2"
            )

        iconT1.current = gsap.timeline({
            paused: true,
        })
            .to(topLineRef.current, {
                rotate: 45,
                y: 3.3,
                duration: 0.3,
                ease: "power3.inout",
            })
            .to(bottomLineRef.current, {
                rotate: -45,
                y: -3.3,
                duration: 0.3,
                ease: "power3.inout",
            },
                "<"
            )

    }, { scope: ".maincontainer" })

    const handleClick = () => {
        if (isOpen) {
            tl.current?.reverse();
            iconT1.current?.reverse();
        } else {
            tl.current?.play();
            iconT1.current?.play();
        }
        setIsOpen(!isOpen);
    };


    return (
        <div className="maincontainer">
            <nav
                ref={navRef}
                className="fixed z-50 flex flex-col justify-between w-full h-full px-6 md:px-10 uppercase bg-black text-white/80 py-28 gap-y-10 md:w-1/2 md:left-1/2"
            >
                <div className="flex flex-col text-4x1 gap-y-2 md:text-5xl">
                    {["home", "services", "about", "work", "contact"].map(
                        (section, index) => (
                            <div
                                key={index}
                                ref={(el) => {
                                    linksRef.current[index] = el;
                                }}
                            >
                                <Link
                                    href={`${section}`}
                                    className="transition-all duration-700 cursor-pointer hover:text-white hover:tracking-[0.5rem] ease-in-out "
                                >
                                    {section}
                                </Link>
                            </div>
                        ),
                    )}
                </div>
                <div className="flex flex-col flex-wrap justify-between gap-8 md:flex-row">
                    <div className="font-light">
                        <p className="tracking-wider text-white/50">E-mail</p>
                        <p className="text-xl-tracking-widest lowercase text-pretty">
                            dev.approxcoding@gmail.com
                        </p>
                    </div>
                    <div className="font-light">
                        <p className="tracking-wider text-white/50">Social Media</p>

                        <div className="flex flex-wrap gap-x-3">
                            {socials.map((social, index) => (
                                <a
                                    key={index}
                                    href={social.href}
                                    className="text-sm leading-loose tracking-widest uppercase hover:text-white transition-colors duration-300"
                                >
                                    {"["}
                                    {social.name}
                                    {"]"}
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
            </nav>
            <div ref={navWrapperRef} className="w-full fixed z-50 flex flex-row gap-5 justify-between px-4 mf:px-10 pt-4">
                <div
                    className="h-10 md:h-14 transition-all duration-300 cursor-pointer"
                    style={
                        showBurger
                            ? {
                                clipPath: "circle(100% at 50% 50%)",
                            }
                            : {
                                clipPath: "circle(0% at 50% 50%)",
                            }
                    }
                >
                    <Image
                        width={1000}
                        height={1000}
                        src={"/assets/logo.png"}
                        alt=""
                        className="h-full w-auto"
                    />
                </div>
                <div onClick={handleClick} className="flex flex-col items-center justify-center gap-1 transition-all duration-300 bg-black rounded-full cursor-pointer w-10 h-10 md:w-14 md:h-14"
                    style={
                        showBurger
                            ? {
                                clipPath: "circle(100% at 50% 50%)",
                            }
                            : {
                                clipPath: "circle(0% at 50% 50%)",
                            }
                    }
                >
                    <span ref={topLineRef} className="block w-6 md:w-8 h-0.5 bg-white rounded-full origin-center"></span>
                    <span ref={bottomLineRef} className="block w-6 md:w-8 h-0.5 bg-white rounded-full origin-center"></span>
                </div>
            </div>
        </div>
    );

};

export default Navbar;
