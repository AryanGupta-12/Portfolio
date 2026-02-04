/**
 * TypeScript Type Definitions for Portfolio
 */

export interface Project {
    id: string;
    title: string;
    description: string;
    longDescription?: string;
    technologies: string[];
    features: string[];
    image: string;
    liveUrl?: string;
    githubUrl?: string;
    category: ProjectCategory;
}

export type ProjectCategory =
    | "web"
    | "ml-ai"
    | "data-engineering"
    | "computer-vision"
    | "all";

export interface Skill {
    name: string;
    category: SkillCategory;
    level?: number;
}

export type SkillCategory =
    | "languages"
    | "ml-ai"
    | "data-engineering"
    | "web"
    | "tools";

export interface SkillGroup {
    title: string;
    category: SkillCategory;
    skills: Skill[];
}

export interface ContactForm {
    name: string;
    email: string;
    message: string;
}

export interface SocialLink {
    name: string;
    url: string;
    icon: string;
}

export interface NavigationItem {
    id: string;
    label: string;
    href: string;
}
