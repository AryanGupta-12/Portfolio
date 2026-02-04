"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ProjectCard from "./ProjectCard";
import { type Project, type ProjectCategory } from "@/types";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

// Placeholder project data
const projects: Project[] = [
    {
        id: "1",
        title: "Enterprise Level AI chatbot",
        description: "Advanced RAG chatbot with multi-level intent routing and automatic knowledge base ingestion of admin approved instructions",
        longDescription: "Built a state-of-the-art image generation system using Generative Adversarial Networks",
        technologies: ["C#", "ASP.NET", "ChromaDB", "OpenAI API", "Python"],
        features: ["High-resolution output", "Style transfer", "Real-time generation"],
        image: "/placeholder.jpg",
        liveUrl: "#",
        githubUrl: "#",
        category: "ml-ai",
    },
    {
        id: "2",
        title: "Voicescribe-AI",
        description: "An intelligent Teams-integrated meeting recorder and summarizer that automatically detects your meeting presence, records meetings, transcribes audio, performs speaker diarization, and generates AI-driven meeting insights",
        longDescription: "An intelligent Teams-integrated meeting recorder and summarizer that automatically detects your meeting presence, records meetings, transcribes audio, performs speaker diarization, and generates AI-driven meeting insights",
        technologies: ["Python", "Electron.js", "OpenAI whisper"],
        features: ["Meeting recording", "Audio transcription", "Speaker diarization", "Meeting insights"],
        image: "/placeholder.jpg",
        liveUrl: "#",
        githubUrl: "https://github.com/AryanGupta-12/Voicescribe-AI",
        category: "ml-ai",
    },
    {
        id: "3",
        title: "Plate Vision",
        description: "Automated number plate recognition for enhanced security, efficient traffic management, and seamless access control.",
        longDescription: "utilizes a YOLO model, trained on a custom dataset, to detect and crop number plates from vehicle images. It then applies OCR to extract the number as a text string. The app supports both image and video inputs for versatile vehicle plate recognition.",
        technologies: ["Python", "OpenCV", "YOLO", "Deep Learning"],
        features: ["Real-time detection", "Multi-object tracking", "High accuracy"],
        image: "/placeholder.jpg",
        liveUrl: "#",
        githubUrl: "https://github.com/AryanGupta-12/Plate-Vision",
        category: "computer-vision",
    },
    {
        id: "4",
        title: "FocusTube",
        description: "A distraction-free YouTube experience app that allows users to enter a video or playlist link, fetching content using the YouTube Data API, integrated LLM assistance to answer video-related queries.",
        longDescription: "Built a responsive web dashboard for monitoring ML models and data pipelines",
        technologies: ["React Typescript", "JavaScript", "HTML", "CSS"],
        features: ["LLM assistance", "Video fetching", "Distraction-free experience"],
        image: "/placeholder.jpg",
        liveUrl: "https://drive.google.com/file/d/1F5IYEecS85-CDFchfcAX5XBD-Nmff6fF/view?usp=drivesdk",
        githubUrl: "https://github.com/AryanGupta-12/FocusTube",
        category: "web",
    },
    {
        id: "5",
        title: "Agent-Productivity Pipeline",
        description: "A data pipeline which ingests data from multiple sources and processes it to generate insights and predictions using machine learning models.",
        longDescription: "A data pipeline which ingests data from multiple sources and processes it to generate insights and predictions using machine learning models.",
        technologies: ["Databricks", "Python", "PySpark", "Machine Learning", "PowerBI"],
        features: ["Real time Dashboard", "Data Ingestion", "Data Processing", "Machine Learning", "Data Visualization"],
        image: "/placeholder.jpg",
        liveUrl: "#",
        githubUrl: "https://github.com/AryanGupta-12/Agent-Productivity-Pipeline",
        category: "data-engineering",
    }
];

const categories: { label: string; value: ProjectCategory }[] = [
    { label: "ALL", value: "all" },
    { label: "ML/AI", value: "ml-ai" },
    { label: "DATA ENG", value: "data-engineering" },
    { label: "COMP VISION", value: "computer-vision" },
    { label: "WEB", value: "web" },
];

export default function Projects() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const [activeCategory, setActiveCategory] = useState<ProjectCategory>("all");

    const filteredProjects =
        activeCategory === "all"
            ? projects
            : projects.filter((p) => p.category === activeCategory);

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

            // Animate project cards
            const cards = sectionRef.current?.querySelectorAll(".project-card");
            if (cards) {
                gsap.from(cards, {
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top 70%",
                        toggleActions: "play none none reverse",
                    },
                    y: 100,
                    opacity: 0,
                    stagger: 0.15,
                    duration: 0.8,
                    ease: "power3.out",
                });
            }
        }, sectionRef);

        return () => ctx.revert();
    }, [activeCategory]);

    return (
        <section
            id="projects"
            ref={sectionRef}
            className="section bg-bg-secondary text-black"
        >
            <div className="container mx-auto">
                <h2
                    ref={titleRef}
                    className="text-5xl md:text-7xl lg:text-8xl font-bold mb-12"
                >
                    PROJECTS<span className="text-accent">.</span>
                </h2>

                {/* Category Filter */}
                <div className="flex flex-wrap gap-3 mb-16">
                    {categories.map((category) => (
                        <button
                            key={category.value}
                            onClick={() => setActiveCategory(category.value)}
                            className={`brutalist-border px-6 py-3 font-mono font-bold text-sm transition-all duration-300 cursor-hover ${activeCategory === category.value
                                ? "bg-black text-white"
                                : "bg-white text-black hover:bg-accent hover:text-black"
                                }`}
                        >
                            {category.label}
                        </button>
                    ))}
                </div>

                {/* Projects Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {filteredProjects.map((project) => (
                        <ProjectCard key={project.id} project={project} />
                    ))}
                </div>

                {filteredProjects.length === 0 && (
                    <div className="text-center py-20">
                        <p className="text-2xl text-text-secondary">
                            No projects found in this category.
                        </p>
                    </div>
                )}
            </div>
        </section>
    );
}
