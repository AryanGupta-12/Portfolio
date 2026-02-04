"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ContactForm from "./ContactForm";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

const socialLinks = [
    { name: "GitHub", url: "https://github.com/AryanGupta-12", icon: "GH" },
    { name: "LinkedIn", url: "https://www.linkedin.com/in/aryan-gupta-9219ba256", icon: "LI" },
    { name: "X (Twitter)", url: "https://x.com/GARG_ARYAN04", icon: "X" },
    { name: "Email", url: "mailto:gargaryan81@gmail.com", icon: "EM" },
];

export default function Contact() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const [hoveredLink, setHoveredLink] = useState<string | null>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Animate title
            if (titleRef.current) {
                gsap.from(titleRef.current, {
                    scrollTrigger: {
                        trigger: titleRef.current,
                        start: "top 80%",
                        toggleActions: "play none none reverse",
                    },
                    x: -100,
                    opacity: 0,
                    duration: 1,
                    ease: "power3.out",
                });
            }

            // Animate content sections
            const sections = sectionRef.current?.querySelectorAll(".contact-section");
            if (sections) {
                gsap.from(sections, {
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top 70%",
                        toggleActions: "play none none reverse",
                    },
                    y: 50,
                    opacity: 0,
                    stagger: 0.2,
                    duration: 0.8,
                    ease: "power3.out",
                });
            }
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            id="contact"
            ref={sectionRef}
            className="section bg-black text-white"
        >
            <div className="container mx-auto">
                <h2
                    ref={titleRef}
                    className="text-5xl md:text-7xl lg:text-8xl font-bold mb-16"
                >
                    CONTACT<span className="text-accent">.</span>
                </h2>

                <div className="grid md:grid-cols-2 gap-12 lg:gap-20">
                    {/* Left Column - Info */}
                    <div className="contact-section space-y-8">
                        <div>
                            <h3 className="text-3xl md:text-4xl font-bold mb-4">
                                Let's work together
                            </h3>
                            <p className="text-xl text-gray-400 leading-relaxed">
                                I'm always open to discussing new projects, creative ideas, or
                                opportunities to be part of your visions.
                            </p>
                        </div>

                        {/* Social Links */}
                        <div>
                            <h4 className="text-lg font-mono font-bold mb-4 text-accent">
                                FIND ME ON
                            </h4>
                            <div className="grid grid-cols-2 gap-4">
                                {socialLinks.map((link) => (
                                    <motion.a
                                        key={link.name}
                                        href={link.url}
                                        onMouseEnter={() => setHoveredLink(link.name)}
                                        onMouseLeave={() => setHoveredLink(null)}
                                        whileHover={{ scale: 1.05 }}
                                        className="brutalist-border p-4 bg-white text-black hover:bg-accent transition-all duration-300 cursor-hover"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <div className="flex items-center justify-between">
                                            <span className="font-bold">{link.name}</span>
                                            <span className="font-mono text-sm opacity-50">
                                                {link.icon}
                                            </span>
                                        </div>
                                    </motion.a>
                                ))}
                            </div>
                        </div>

                        {/* Email */}
                        <div className="brutalist-border p-6 bg-accent-secondary">
                            <h4 className="text-sm font-mono font-bold mb-2 text-accent">
                                EMAIL
                            </h4>
                            <a
                                href="mailto:gargaryan81@gmail.com"
                                className="text-2xl font-bold hover:text-accent transition-colors cursor-hover"
                            >
                                gargaryan81@gmail.com
                            </a>
                        </div>
                    </div>

                    {/* Right Column - Form */}
                    <div className="contact-section">
                        <ContactForm />
                    </div>
                </div>

                {/* Footer */}
                <div className="mt-20 pt-12 border-t-3 border-white">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                        <p className="text-sm text-gray-400">
                            © 2026 Aryan Gupta. All rights reserved.
                        </p>
                        <p className="text-sm font-mono text-accent">
                            Designed & Built with ❤️
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
