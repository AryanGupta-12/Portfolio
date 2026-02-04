"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { isMobile } from "@/lib/utils";

export default function CustomCursor() {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [isHovering, setIsHovering] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const [cursorText, setCursorText] = useState("");

    useEffect(() => {
        // Don't show custom cursor on mobile
        if (isMobile()) return;

        setIsVisible(true);

        const handleMouseMove = (e: MouseEvent) => {
            setMousePosition({ x: e.clientX, y: e.clientY });
        };

        const handleMouseEnter = (e: Event) => {
            const target = e.target as HTMLElement;

            // Check for cursor text
            const textElement = target.closest("[data-cursor-text]");
            if (textElement) {
                const text = textElement.getAttribute("data-cursor-text");
                setCursorText(text || "");
            } else {
                setCursorText("");
            }

            // Check hover state
            if (
                target instanceof Element &&
                (target.tagName === "A" ||
                    target.tagName === "BUTTON" ||
                    target.closest("a") ||
                    target.closest("button") ||
                    target.classList.contains("cursor-hover") ||
                    textElement)
            ) {
                setIsHovering(true);
            }
        };

        const handleMouseLeave = (e: Event) => {
            setIsHovering(false);
            setCursorText("");
        };

        window.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseover", handleMouseEnter, true);
        document.addEventListener("mouseout", handleMouseLeave, true);

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            document.removeEventListener("mouseover", handleMouseEnter, true);
            document.removeEventListener("mouseout", handleMouseLeave, true);
        };
    }, []);

    if (!isVisible) return null;

    return (
        <>
            <motion.div
                className="fixed top-0 left-0 w-4 h-4 bg-accent border-2 border-accent mix-blend-difference pointer-events-none z-[10000] flex items-center justify-center"
                animate={{
                    x: mousePosition.x - (cursorText ? 32 : 8),
                    y: mousePosition.y - (cursorText ? 32 : 8),
                    width: cursorText ? 80 : 16,
                    height: cursorText ? 80 : 16,
                    borderRadius: "50%",
                }}
                transition={{
                    type: "spring",
                    stiffness: 500,
                    damping: 28,
                    mass: 0.5,
                }}
            >
                {cursorText && (
                    <motion.span
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-black font-bold text-[10px] whitespace-nowrap"
                    >
                        {cursorText}
                    </motion.span>
                )}
            </motion.div>
            {!cursorText && (
                <motion.div
                    className="fixed top-0 left-0 w-8 h-8 border-2 border-accent mix-blend-difference pointer-events-none z-[10000]"
                    animate={{
                        x: mousePosition.x - 16,
                        y: mousePosition.y - 16,
                        scale: isHovering ? 1.5 : 1,
                    }}
                    transition={{
                        type: "spring",
                        stiffness: 150,
                        damping: 15,
                        mass: 0.1,
                    }}
                />
            )}
        </>
    );
}
