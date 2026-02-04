"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

interface ExperienceItem {
    company: string;
    role: string;
    location: string;
    period: string;
    highlights: string[];
}

const experiences: ExperienceItem[] = [
    {
        company: "Veersa Technologies",
        role: "AI/ML Intern",
        location: "Hybrid",
        period: "7 months*",
        highlights: [
            "Enterprise RAG chatbot for internal knowledge management",
            "Designed and optimized ETL workflows, reducing data migration time by 60%.",
            "Streamlined ML anomaly detection model with 90% precision.",
            "Built NLP meeting tool cutting manual note-taking effort by 70%.",
        ],
    },
    {
        company: "Gavenue",
        role: "AI/ML Automation Intern",
        location: "Remote",
        period: "2 months",
        highlights: [
            "Built automatic email messaging agent increasing efficiency by 3.2x.",
            "Reduced manual errors by 65% in outreach operations.",
            "Pioneered invoice generation agent cutting processing time by 78%.",
            "Implemented AI calling agent reducing scheduling overhead by 60%.",
        ],
    },
    {
        company: "Digicure360",
        role: "AI & Automation Consultant",
        location: "Freelance",
        period: "2 months",
        highlights: [
            "Created social media automation delivering 4x faster publishing cycles.",
            "Reduced marketing costs by 65% compared to manual teams.",
            "fostered an AI calling agent providing 24/7 client consultation.",
            "Achieved 72% reduction in human support overhead.",
        ],
    },
];

export default function Experience() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Animate title
            if (titleRef.current) {
                gsap.fromTo(
                    titleRef.current,
                    { x: -100, opacity: 0 },
                    {
                        scrollTrigger: {
                            trigger: titleRef.current,
                            start: "top 80%",
                            toggleActions: "play none none reverse",
                        },
                        x: 0,
                        opacity: 1,
                        duration: 1,
                        ease: "power3.out",
                    }
                );
            }

            // Animate experience cards
            const cards = sectionRef.current?.querySelectorAll(".experience-card");
            if (cards) {
                gsap.fromTo(
                    cards,
                    { y: 50, opacity: 0 },
                    {
                        scrollTrigger: {
                            trigger: sectionRef.current,
                            start: "top 70%",
                            toggleActions: "play none none reverse",
                        },
                        y: 0,
                        opacity: 1,
                        stagger: 0.2,
                        duration: 0.8,
                        ease: "power3.out",
                    }
                );

                // Animate highlights within each card
                cards.forEach((card) => {
                    const highlights = card.querySelectorAll(".experience-highlight");
                    gsap.fromTo(
                        highlights,
                        { opacity: 0, x: 20 },
                        {
                            scrollTrigger: {
                                trigger: card,
                                start: "top 85%",
                                toggleActions: "play none none reverse",
                            },
                            opacity: 1,
                            x: 0,
                            stagger: 0.1,
                            duration: 0.5,
                            ease: "back.out(1.7)",
                        }
                    );
                });
            }
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            id="experience"
            ref={sectionRef}
            className="section bg-white text-black"
        >
            <div className="container mx-auto">
                <h2
                    ref={titleRef}
                    className="text-5xl md:text-7xl lg:text-8xl font-bold mb-16"
                >
                    EXPERIENCE<span className="text-accent">.</span>
                </h2>

                <div className="space-y-8">
                    {experiences.map((exp, index) => (
                        <div
                            key={index}
                            className="experience-card brutalist-border p-6 md:p-8 bg-bg-secondary hover:translate-x-2 transition-transform duration-300 glitch-hover cursor-hover"
                            data-cursor-text="EXP"
                        >
                            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
                                <div>
                                    <h3 className="text-2xl md:text-3xl font-bold">
                                        {exp.company}
                                    </h3>
                                    <div className="flex flex-wrap gap-2 text-sm font-mono mt-2">
                                        <span className="bg-black text-white px-2 py-1">
                                            {exp.role}
                                        </span>
                                        <span className="brutalist-border px-2 py-1">
                                            {exp.location}
                                        </span>
                                    </div>
                                </div>
                                <span className="font-mono font-bold text-lg md:text-xl border-b-2 border-accent">
                                    {exp.period}
                                </span>
                            </div>

                            <ul className="grid md:grid-cols-2 gap-4">
                                {exp.highlights.map((highlight, i) => (
                                    <li key={i} className="experience-highlight flex items-start gap-3">
                                        <span className="text-accent text-xl mt-1">▹</span>
                                        <span className="text-text-secondary leading-relaxed">
                                            {highlight}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
