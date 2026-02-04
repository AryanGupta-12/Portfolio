"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { type SkillGroup } from "@/types";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

const skillGroups: SkillGroup[] = [
    {
        title: "LANGUAGES & CORE",
        category: "languages",
        skills: [
            { name: "C++", category: "languages" },
            { name: "C", category: "languages" },
            { name: "Java", category: "languages" },
            { name: "Python", category: "languages" },
        ],
    },
    {
        title: "ML/AI",
        category: "ml-ai",
        skills: [
            { name: "Machine Learning", category: "ml-ai" },
            { name: "Deep Learning", category: "ml-ai" },
            { name: "GenAI", category: "ml-ai" },
            { name: "Computer Vision", category: "ml-ai" },
            { name: "GANs", category: "ml-ai" },
            { name: "LLMs/GenAI", category: "ml-ai" },
            { name: "Hugging Face", category: "ml-ai" }
        ],
    },
    {
        title: "DATA ENGINEERING",
        category: "data-engineering",
        skills: [
            { name: "Databricks", category: "data-engineering" },
            { name: "PySpark", category: "data-engineering" },
            { name: "ETL Pipelines", category: "data-engineering" },
        ],
    },
    {
        title: "WEB DEVELOPMENT",
        category: "web",
        skills: [
            { name: "JavaScript", category: "web" },
            { name: "HTML", category: "web" },
            { name: "CSS", category: "web" },
            { name: "React", category: "web" },
        ],
    },
    {
        title: "TOOLS & DATABASES",
        category: "tools",
        skills: [
            { name: "MySQL", category: "tools" },
            { name: "Git/Github", category: "tools" },
            { name: "Docker", category: "tools" },
        ],
    },
];

export default function Skills() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);

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

            // Animate skill groups
            const groups = sectionRef.current?.querySelectorAll(".skill-group");
            if (groups) {
                gsap.from(groups, {
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top 70%",
                        toggleActions: "play none none reverse",
                    },
                    y: 50,
                    opacity: 0,
                    stagger: 0.15,
                    duration: 0.8,
                    ease: "power3.out",
                });
            }

            // Animate skill items
            groups?.forEach((group) => {
                const items = group.querySelectorAll(".skill-item");
                gsap.fromTo(
                    items,
                    {
                        scale: 0.8,
                        opacity: 0,
                    },
                    {
                        scrollTrigger: {
                            trigger: group,
                            start: "top 80%",
                            toggleActions: "play none none reverse",
                        },
                        scale: 1,
                        opacity: 1,
                        stagger: 0.08,
                        duration: 0.5,
                        ease: "back.out(1.7)",
                    }
                );
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            id="skills"
            ref={sectionRef}
            className="section bg-white text-black"
        >
            <div className="container mx-auto">
                <h2
                    ref={titleRef}
                    className="text-5xl md:text-7xl lg:text-8xl font-bold mb-16"
                >
                    SKILLS<span className="text-accent">.</span>
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {skillGroups.map((group) => (
                        <div
                            key={group.category}
                            className="skill-group brutalist-border bg-bg-secondary p-6"
                        >
                            <h3 className="text-2xl font-bold font-mono mb-6 border-b-3 border-black pb-2">
                                {group.title}
                            </h3>
                            <div className="flex flex-wrap gap-3">
                                {group.skills.map((skill) => (
                                    <div
                                        key={skill.name}
                                        className="skill-item brutalist-border px-4 py-2 bg-white hover:bg-accent hover:scale-105 transition-all duration-300 cursor-hover"
                                    >
                                        <span className="font-medium text-sm">{skill.name}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Large Skills Display */}
                <div className="mt-16 brutalist-border-thick p-12 bg-black text-white">
                    <div className="flex flex-wrap justify-center gap-6 text-center">
                        <div className="flex-1 min-w-[150px]">
                            <div className="text-5xl font-bold text-accent mb-2">10+</div>
                            <div className="text-sm font-mono">TECHNOLOGIES</div>
                        </div>
                        <div className="flex-1 min-w-[150px]">
                            <div className="text-5xl font-bold text-accent mb-2">10+</div>
                            <div className="text-sm font-mono">ML/AI TOOLS</div>
                        </div>
                        <div className="flex-1 min-w-[150px]">
                            <div className="text-5xl font-bold text-accent mb-2">∞</div>
                            <div className="text-sm font-mono">LEARNING</div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
