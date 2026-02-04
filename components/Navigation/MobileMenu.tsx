"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface MobileMenuProps {
    navItems: Array<{ id: string; label: string; href: string }>;
    activeSection: string;
    onNavClick: (e: React.MouseEvent<HTMLAnchorElement>, href: string) => void;
    onClose: () => void;
}

export default function MobileMenu({
    navItems,
    activeSection,
    onNavClick,
    onClose,
}: MobileMenuProps) {
    return (
        <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "tween", duration: 0.3 }}
            className="fixed inset-0 bg-white z-40 md:hidden"
        >
            <div className="flex flex-col items-center justify-center h-full space-y-8">
                {navItems.map((item, index) => (
                    <motion.div
                        key={item.id}
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                    >
                        <Link
                            href={item.href}
                            onClick={(e) => {
                                onNavClick(e, item.href);
                                onClose();
                            }}
                            className={cn(
                                "text-4xl font-bold transition-colors cursor-hover",
                                activeSection === item.id
                                    ? "text-accent"
                                    : "text-text-primary hover:text-accent"
                            )}
                        >
                            {item.label}
                        </Link>
                    </motion.div>
                ))}
            </div>
        </motion.div>
    );
}
