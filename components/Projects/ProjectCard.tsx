"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { type Project } from "@/types";

interface ProjectCardProps {
    project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <motion.div
            className="project-card brutalist-border bg-white overflow-hidden group cursor-hover glitch-hover"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            whileHover={{ y: -8 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
            {/* Image Placeholder */}
            <div className="relative h-64 bg-bg-secondary overflow-hidden brutalist-border-thick border-x-0 border-t-0">
                <motion.div
                    animate={{ scale: isHovered ? 1.1 : 1 }}
                    transition={{ duration: 0.4 }}
                    className="w-full h-full bg-gradient-to-br from-black to-accent flex items-center justify-center"
                >
                    <span className="text-white text-6xl font-bold opacity-20">
                        {project.title.charAt(0)}
                    </span>
                </motion.div>

                {/* Hover Overlay */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: isHovered ? 1 : 0 }}
                    className="absolute inset-0 bg-accent/90 flex items-center justify-center gap-4"
                >
                    {project.liveUrl && project.liveUrl !== "#" && (
                        <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="brutalist-border px-4 py-2 bg-black text-white font-bold hover:bg-white hover:text-black transition-colors"
                        >
                            DEMO
                        </a>
                    )}
                    {project.githubUrl && project.githubUrl !== "#" && (
                        <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="brutalist-border px-4 py-2 bg-white text-black font-bold hover:bg-black hover:text-white transition-colors"
                        >
                            CODE
                        </a>
                    )}
                </motion.div>
            </div>

            {/* Content */}
            <div className="p-6">
                <h3 className="text-2xl font-bold mb-3">{project.title}</h3>
                <p className="text-text-secondary mb-4 leading-relaxed">
                    {project.description}
                </p>

                {/* Technologies */}
                <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech) => (
                        <span
                            key={tech}
                            className="px-3 py-1 brutalist-border bg-bg-secondary text-xs font-mono font-bold"
                        >
                            {tech}
                        </span>
                    ))}
                </div>
            </div>
        </motion.div>
    );
}
