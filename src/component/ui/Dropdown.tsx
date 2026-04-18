"use client";

import {
    useRef,
    useState,
    useCallback,
    ReactNode,
    FC,
} from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import useOutsideClick from "@/hooks/Useoutsideclick ";

gsap.registerPlugin(useGSAP);

export interface DropdownItem {
    key: string;
    label: string;
    onClick?: () => void;
}

interface DropdownProps {
    items: DropdownItem[];
    trigger?: "click" | "hover";
    placement?: "bottomLeft" | "bottomRight" | "bottomCenter";
    children: ReactNode; // the trigger element
}

const Dropdown: FC<DropdownProps> = ({
    items,
    trigger = "click",
    placement = "bottomRight",
    children,
}) => {
    const [open, setOpen] = useState(false);
    const wrapperRef = useRef<HTMLDivElement>(null);
    const menuRef = useRef<HTMLDivElement>(null);
    const hoverTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

    // Close on outside click (only relevant for click trigger)
    useOutsideClick(wrapperRef as React.RefObject<HTMLElement>, useCallback(() => setOpen(false), []));

    // GSAP animation whenever `open` changes
    useGSAP(
        () => {
            if (!menuRef.current) return;

            if (open) {
                gsap.fromTo(
                    menuRef.current,
                    { autoAlpha: 0, y: -8, scale: 0.96 },
                    {
                        autoAlpha: 1,
                        y: 0,
                        scale: 1,
                        duration: 0.22,
                        ease: "power2.out",
                        pointerEvents: "all",
                    }
                );
            } else {
                gsap.to(menuRef.current, {
                    autoAlpha: 0,
                    y: -8,
                    scale: 0.96,
                    duration: 0.18,
                    ease: "power2.in",
                    pointerEvents: "none",
                });
            }
        },
        { scope: wrapperRef, dependencies: [open] }
    );

    // Placement styles
    const placementClass: Record<string, string> = {
        bottomLeft: "left-0",
        bottomRight: "right-0",
        bottomCenter: "left-1/2 -translate-x-1/2",
    };

    // Hover handlers
    const handleMouseEnter = () => {
        if (trigger !== "hover") return;
        if (hoverTimeout.current) clearTimeout(hoverTimeout.current);
        setOpen(true);
    };

    const handleMouseLeave = () => {
        if (trigger !== "hover") return;
        hoverTimeout.current = setTimeout(() => setOpen(false), 120);
    };

    const handleToggle = () => {
        if (trigger !== "click") return;
        setOpen((prev) => !prev);
    };

    return (
        <div
            ref={wrapperRef}
            className="relative inline-block"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            {/* Trigger */}
            <div onClick={handleToggle} className="cursor-pointer">
                {children}
            </div>

            {/* Menu — always in DOM, visibility controlled by GSAP autoAlpha */}
            <div
                ref={menuRef}
                style={{ visibility: "hidden", pointerEvents: "none" }}
                className={`absolute top-full mt-2 ${placementClass[placement]} min-w-32.5 bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden z-99999`}
            >
                {items.map((item) => (
                    <div
                        key={item.key}
                        onClick={() => {
                            item.onClick?.();
                            setOpen(false);
                        }}
                        className="px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 hover:text-[#185dde] cursor-pointer transition-colors duration-150 first:rounded-t-xl last:rounded-b-xl"
                    >
                        {item.label}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Dropdown;