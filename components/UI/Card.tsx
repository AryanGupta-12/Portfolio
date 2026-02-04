"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface CardProps {
    children: ReactNode;
    className?: string;
    hover?: boolean;
}

export default function Card({ children, className, hover = true }: CardProps) {
    return (
        <motion.div
            whileHover={hover ? { y: -4 } : {}}
            className={cn("brutalist-border bg-white p-6", className)}
        >
            {children}
        </motion.div>
    );
}
