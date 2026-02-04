"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import ScrambleText from "../UI/ScrambleText";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

export default function About() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Animate title
            if (titleRef.current) {
                gsap.from(titleRef.current, {
                    scrollTrigger: {
                        trigger: titleRef.current,
                        start: "top 80%",
                        end: "bottom 20%",
                        toggleActions: "play none none reverse",
                    },
                    x: -100,
                    opacity: 0,
                    duration: 1,
                    ease: "power3.out",
                });
            }

            // Animate content
            if (contentRef.current) {
                gsap.from(contentRef.current.children, {
                    scrollTrigger: {
                        trigger: contentRef.current,
                        start: "top 75%",
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
            id="about"
            ref={sectionRef}
            className="section bg-white text-black"
        >
            <div className="container mx-auto">
                <h2
                    ref={titleRef}
                    className="text-5xl md:text-7xl lg:text-8xl font-bold mb-16"
                >
                    <ScrambleText text="ABOUT" hover />
                    <span className="text-accent">.</span>
                </h2>

                <div ref={contentRef} className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-start">
                    {/* The Serious Side */}
                    <div className="space-y-8">
                        <div className="brutalist-border p-8 bg-bg-secondary transform rotate-1 hover:rotate-0 transition-transform duration-300">
                            <h3 className="text-2xl font-bold mb-4 font-mono">THE HUMAN_SIDE</h3>
                            <p className="text-xl leading-relaxed">
                                I'm <span className="font-bold">Aryan Gupta</span>. I teach machines to learn, mostly so I don't have to.
                                <br /><br />
                                Specializing in <span className="text-accent font-bold">AI/ML & GenAI</span>, I build systems that turn messy data into distinct insights.
                                When not training models, I'm usually debugging them (or questioning my life choices in StackOverflow threads).
                            </p>

                            <a
                                href="https://drive.google.com/file/d/1EIqZnZOffG7nHjsyrwIjB3HCIFg0gncA/view?usp=sharing"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-block mt-6 brutalist-border px-6 py-3 bg-accent text-black font-bold font-mono hover:bg-black hover:text-white transition-all duration-300 glitch-hover cursor-hover"
                                data-cursor-text="PDF"
                            >
                                [ RESUME ]
                            </a>
                        </div>

                        <div className="brutalist-border-thick p-8 bg-black text-white transform -rotate-1 hover:rotate-0 transition-transform duration-300 cursor-hover glitch-hover" data-cursor-text="MISSION">
                            <h3 className="text-xl font-bold mb-2 text-accent">MISSION_STATEMENT</h3>
                            <p className="text-lg font-mono">
                                "To build AI that's smarter than a 5th grader, but not smart enough to take over the world."
                            </p>
                        </div>
                    </div>

                    {/* The Geeky Side (Terminal) */}
                    <div className="brutalist-border bg-black text-green-500 p-6 font-mono text-sm md:text-base shadow-2xl overflow-hidden group">
                        <div className="flex gap-2 mb-6 border-b border-gray-800 pb-4">
                            <div className="w-3 h-3 rounded-full bg-red-500" />
                            <div className="w-3 h-3 rounded-full bg-yellow-500" />
                            <div className="w-3 h-3 rounded-full bg-green-500" />
                            <span className="ml-auto text-gray-500 text-xs">aryan@localhost:~/brain</span>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <span className="text-blue-400">➜</span> <span className="text-purple-400">~</span> <span className="text-yellow-400">whoami</span>
                            </div>
                            <div className="pl-4 text-white">
                                "AI/ML Engineer | Data Alchemist | Professional Google Searcher"
                            </div>

                            <div>
                                <span className="text-blue-400">➜</span> <span className="text-purple-400">~</span> <span className="text-yellow-400">cat</span> current_status.json
                            </div>
                            <div className="pl-4">
                                <span className="text-white">{"{"}</span><br />
                                &nbsp;&nbsp;<span className="text-blue-300">"mood"</span>: <span className="text-green-300">"Building 🚀"</span>,<br />
                                &nbsp;&nbsp;<span className="text-blue-300">"coffee_level"</span>: <span className="text-red-500">"CRITICAL ☕"</span>,<br />
                                &nbsp;&nbsp;<span className="text-blue-300">"bugs_fixed"</span>: <span className="text-yellow-300">9999</span>,<br />
                                &nbsp;&nbsp;<span className="text-blue-300">"hours_slept"</span>: <span className="text-gray-500">null</span><br />
                                <span className="text-white">{"}"}</span>
                            </div>

                            <div>
                                <span className="text-blue-400">➜</span> <span className="text-purple-400">~</span> <span className="text-yellow-400">run</span> skills.exe
                            </div>
                            <div className="pl-4 grid grid-cols-2 gap-2 text-gray-300">
                                <span>[✔] PyTorch</span>
                                <span>[✔] TensorFlow</span>
                                <span>[✔] GenAI</span>
                                <span>[✔] Computer Vision</span>
                            </div>

                            <div className="animate-pulse">
                                <span className="text-blue-400">➜</span> <span className="text-purple-400">~</span> <span className="inline-block w-2 H-4 bg-green-500 ml-1"></span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
