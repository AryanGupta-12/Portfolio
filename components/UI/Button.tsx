"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface ButtonProps {
    children: ReactNode;
    variant?: "primary" | "secondary" | "accent";
    onClick?: () => void;
    className?: string;
    type?: "button" | "submit" | "reset";
    disabled?: boolean;
}

export default function Button({
    children,
    variant = "primary",
    onClick,
    className,
    type = "button",
    disabled = false,
}: ButtonProps) {
    const baseClasses =
        "brutalist-border px-6 py-3 font-bold transition-all duration-300 cursor-hover";

    const variantClasses = {
        primary: "bg-black text-white hover:bg-accent hover:text-black",
        secondary: "bg-white text-black hover:bg-black hover:text-white",
        accent: "bg-accent text-black hover:bg-black hover:text-white",
    };

    return (
        <motion.button
            type={type}
            onClick={onClick}
            disabled={disabled}
            whileHover={{ scale: disabled ? 1 : 1.05 }}
            whileTap={{ scale: disabled ? 1 : 0.95 }}
            className={cn(
                baseClasses,
                variantClasses[variant],
                disabled && "opacity-50 cursor-not-allowed",
                className
            )}
        >
            {children}
        </motion.button>
    );
}
