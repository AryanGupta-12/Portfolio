"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import ParticleBackground from "./ParticleBackground";
import ScrambleText from "../UI/ScrambleText";

export default function Hero() {
    const heroRef = useRef<HTMLDivElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const subtitleRef = useRef<HTMLParagraphElement>(null);
    const ctaRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Animate title characters
            if (titleRef.current) {
                const chars = titleRef.current.querySelectorAll(".char");
                gsap.from(chars, {
                    y: 100,
                    opacity: 0,
                    duration: 1.2,
                    ease: "power4.out",
                    stagger: 0.05,
                    delay: 0.5,
                });
            }

            // Animate subtitle
            if (subtitleRef.current) {
                gsap.from(subtitleRef.current, {
                    y: 50,
                    opacity: 0,
                    duration: 1,
                    ease: "power3.out",
                    delay: 1.5,
                });
            }

            // Animate CTA
            if (ctaRef.current) {
                gsap.from(ctaRef.current, {
                    y: 30,
                    opacity: 0,
                    duration: 0.8,
                    ease: "power3.out",
                    delay: 2,
                });
            }
        }, heroRef);

        return () => ctx.revert();
    }, []);

    // Split text into characters for animation
    const splitText = (text: string) => {
        return text.split("").map((char, index) => (
            <span key={index} className="char inline-block">
                {char === " " ? "\u00A0" : char}
            </span>
        ));
    };

    const scrollToProjects = () => {
        const projectsSection = document.getElementById("projects");
        if (projectsSection) {
            projectsSection.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <section
            id="hero"
            ref={heroRef}
            className="relative min-h-screen flex items-center justify-center overflow-hidden bg-white"
        >
            {/* 3D Particle Background */}
            <ParticleBackground />

            {/* Content */}
            <div className="relative z-10 container mx-auto px-4 md:px-6 text-center">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1 }}
                >
                    {/* Name */}
                    <h1
                        ref={titleRef}
                        className="text-6xl md:text-8xl lg:text-9xl font-bold mb-6 text-black flex flex-col items-center"
                        style={{ lineHeight: 1.1 }}
                    >
                        <ScrambleText text="ARYAN" delay={0.5} hover />
                        <ScrambleText text="GUPTA" delay={0.8} hover />
                    </h1>

                    {/* Title */}
                    <div ref={subtitleRef} className="mb-12">
                        <ScrambleText
                            text="AI/ML ENGINEER"
                            className="text-2xl md:text-4xl lg:text-5xl font-mono text-accent"
                            delay={1.2}
                            hover
                        />
                    </div>

                    {/* CTA */}
                    <div ref={ctaRef} className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                        <button
                            onClick={scrollToProjects}
                            className="brutalist-border px-8 py-4 bg-black text-white font-bold text-lg hover:bg-accent hover:text-black transition-all duration-300 cursor-hover"
                            data-cursor-text="VIEW"
                        >
                            VIEW WORK
                        </button>
                        <a
                            href="#contact"
                            className="brutalist-border px-8 py-4 bg-white text-black font-bold text-lg hover:bg-black hover:text-white transition-all duration-300 cursor-hover"
                            data-cursor-text="HIRE"
                        >
                            GET IN TOUCH
                        </a>
                    </div>
                </motion.div>

                {/* Scroll Indicator */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                        delay: 2.5,
                        duration: 1,
                        repeat: Infinity,
                        repeatType: "reverse",
                    }}
                    className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
                >
                    <div className="w-6 h-10 brutalist-border flex items-start justify-center p-2">
                        <motion.div
                            animate={{ y: [0, 12, 0] }}
                            transition={{
                                duration: 1.5,
                                repeat: Infinity,
                                ease: "easeInOut",
                            }}
                            className="w-1.5 h-1.5 bg-accent"
                        />
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
