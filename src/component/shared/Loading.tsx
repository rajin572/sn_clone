"use client";

import { useState, useEffect } from "react";
import { useProgress } from "@react-three/drei";
import ReactLenis from "lenis/react";

export default function Loading() {
    const { progress } = useProgress();
    const [isReady, setIsReady] = useState(false);

    useEffect(() => {
        setIsReady(progress === 100);
    }, [progress]);
    return (
        <ReactLenis root className="relative w-screen min-h-screen overflow-x-auto">
            {!isReady && (
                <div className="fixed inset-0 z-999 flex flex-col items-center justify-center bg-black text-white transition-opacity duration-700 font-light">
                    <p className="mb-4 text-xl tracking-widest animate-pulse">
                        Loading {Math.floor(progress)}%
                    </p>
                    <div className="realtive h-1 overflow-hidden rounded w-60 bg-white/20">
                        <div
                            style={{ width: `${progress}%` }}
                            className="absolute top-0 left-0 h-full transition-all duration-300 bg-white"
                        ></div>
                    </div>
                </div>
            )}

            {/* <div
                className={`${isReady ? "opacity-100" : "opacity-0"} transition-opacity duration-1000`}
            ></div> */}
        </ReactLenis>
    );
}
