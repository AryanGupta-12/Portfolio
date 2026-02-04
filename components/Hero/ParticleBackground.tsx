"use client";

import { useEffect, useState, useMemo } from "react";

export default function ParticleBackground() {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    // Generate particles only once on client side to avoid hydration mismatch
    const particles = useMemo(() => {
        if (typeof window === "undefined") return [];
        return Array.from({ length: 50 }, (_, i) => ({
            id: i,
            left: Math.random() * 100,
            top: Math.random() * 100,
            size: Math.random() * 4 + 2,
            duration: Math.random() * 20 + 10,
            delay: Math.random() * -20,
        }));
    }, []);

    if (!mounted) return null;

    return (
        <div className="absolute inset-0 overflow-hidden opacity-20">
            {particles.map((particle) => (
                <div
                    key={particle.id}
                    className="absolute bg-accent rounded-full animate-float"
                    style={{
                        left: `${particle.left}%`,
                        top: `${particle.top}%`,
                        width: `${particle.size}px`,
                        height: `${particle.size}px`,
                        animation: `float ${particle.duration}s linear infinite`,
                        animationDelay: `${particle.delay}s`,
                    }}
                />
            ))}
            <style jsx>{`
        @keyframes float {
          0% {
            transform: translate(0, 0) rotate(0deg);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            transform: translate(50px, -100vh) rotate(360deg);
            opacity: 0;
          }
        }
      `}</style>
        </div>
    );
}
