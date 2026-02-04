"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

const CYCLES_PER_LETTER = 2;
const SHUFFLE_TIME = 50;
const CHARS = "!@#$%^&*():{};|,.<>/?";

interface ScrambleTextProps {
    text: string;
    className?: string;
    delay?: number;
    hover?: boolean;
}

export default function ScrambleText({
    text,
    className,
    delay = 0,
    hover = false,
}: ScrambleTextProps) {
    const intervalRef = useRef<NodeJS.Timeout | null>(null);
    const [scrambledText, setScrambledText] = useState(text);
    const [isAnimating, setIsAnimating] = useState(false);

    const scramble = () => {
        if (isAnimating) return;
        setIsAnimating(true);

        let pos = 0;

        intervalRef.current = setInterval(() => {
            const scrambled = text
                .split("")
                .map((char, index) => {
                    if (pos / CYCLES_PER_LETTER > index) {
                        return char;
                    }

                    const randomChar = CHARS[Math.floor(Math.random() * CHARS.length)];
                    return randomChar;
                })
                .join("");

            setScrambledText(scrambled);
            pos++;

            if (pos >= text.length * CYCLES_PER_LETTER) {
                stopScramble();
            }
        }, SHUFFLE_TIME);
    };

    const stopScramble = () => {
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
        }
        setScrambledText(text);
        setIsAnimating(false);
    };

    useEffect(() => {
        if (!hover) {
            const timeout = setTimeout(() => {
                scramble();
            }, delay * 1000);
            return () => clearTimeout(timeout);
        }
    }, [delay, hover]);

    return (
        <motion.span
            className={className}
            onMouseEnter={() => {
                if (hover) scramble();
            }}
        >
            {scrambledText}
        </motion.span>
    );
}
