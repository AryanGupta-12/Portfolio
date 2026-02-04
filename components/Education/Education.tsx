"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

interface EducationItem {
    year: string;
    degree: string;
    institute: string;
    score: string;
    scoreLabel: string;
}

const educationData: EducationItem[] = [
    {
        year: "2022 - Present",
        degree: "B.Tech CSE, specialization in AI/ML",
        institute: "Maharaja Surajmal Institute of Technology, GGSIPU",
        score: "9.60",
        scoreLabel: "CGPA (Till 7th Sem)",
    },
    {
        year: "2022",
        degree: "CBSE (Class XII)",
        institute: "East Point School, Delhi",
        score: "96%",
        scoreLabel: "Aggregate",
    },
    {
        year: "2020",
        degree: "CBSE (Class X)",
        institute: "East Point School, Delhi",
        score: "90.6%",
        scoreLabel: "Aggregate",
    },
];

export default function Education() {
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

            // Animate education strips
            const strips = sectionRef.current?.querySelectorAll(".education-strip");
            if (strips) {
                gsap.fromTo(
                    strips,
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
            }
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            id="education"
            ref={sectionRef}
            className="section bg-bg-secondary text-black"
        >
            <div className="container mx-auto">
                <h2
                    ref={titleRef}
                    className="text-5xl md:text-7xl lg:text-8xl font-bold mb-16"
                >
                    EDUCATION<span className="text-accent">.</span>
                </h2>

                <div className="flex flex-col gap-6">
                    {educationData.map((edu, index) => (
                        <div
                            key={index}
                            className="education-strip brutalist-border bg-white p-6 md:p-8 flex flex-col md:flex-row gap-6 md:gap-8 items-start md:items-center hover:translate-x-2 transition-transform duration-300 group"
                        >
                            {/* Year - Vertical feel on desktop using minimal width */}
                            <div className="md:w-32 flex-shrink-0">
                                <span className="font-mono font-bold text-lg md:text-xl border-b-4 border-accent pb-1 inline-block">
                                    {edu.year}
                                </span>
                            </div>

                            {/* Degree Info */}
                            <div className="flex-grow">
                                <h3 className="text-2xl md:text-3xl font-bold mb-2 group-hover:text-accent transition-colors duration-300">
                                    {edu.degree}
                                </h3>
                                <p className="text-text-secondary font-medium text-lg">
                                    {edu.institute}
                                </p>
                            </div>

                            {/* Score */}
                            <div className="md:w-48 flex-shrink-0 text-left md:text-right border-l-4 md:border-l-0 md:border-r-4 border-black pl-4 md:pl-0 md:pr-4">
                                <div className="text-4xl md:text-5xl font-bold text-black mb-1">
                                    {edu.score}
                                </div>
                                <div className="font-mono text-sm text-text-secondary uppercase tracking-wider">
                                    {edu.scoreLabel}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
