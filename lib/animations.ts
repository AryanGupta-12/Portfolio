import gsap from "gsap";

/**
 * GSAP Animation Utilities for Portfolio
 */

export const animationConfig = {
    duration: {
        fast: 0.3,
        medium: 0.6,
        slow: 1.2,
    },
    ease: {
        smooth: "power3.out",
        bounce: "elastic.out(1, 0.5)",
        snap: "power4.inOut",
    },
};

/**
 * Fade In Animation
 */
export const fadeIn = (
    element: gsap.TweenTarget,
    options?: gsap.TweenVars
) => {
    return gsap.from(element, {
        opacity: 0,
        duration: animationConfig.duration.medium,
        ease: animationConfig.ease.smooth,
        ...options,
    });
};

/**
 * Slide Up Animation
 */
export const slideUp = (
    element: gsap.TweenTarget,
    options?: gsap.TweenVars
) => {
    return gsap.from(element, {
        y: 100,
        opacity: 0,
        duration: animationConfig.duration.slow,
        ease: animationConfig.ease.smooth,
        ...options,
    });
};

/**
 * Slide In from Left
 */
export const slideInLeft = (
    element: gsap.TweenTarget,
    options?: gsap.TweenVars
) => {
    return gsap.from(element, {
        x: -100,
        opacity: 0,
        duration: animationConfig.duration.medium,
        ease: animationConfig.ease.smooth,
        ...options,
    });
};

/**
 * Slide In from Right
 */
export const slideInRight = (
    element: gsap.TweenTarget,
    options?: gsap.TweenVars
) => {
    return gsap.from(element, {
        x: 100,
        opacity: 0,
        duration: animationConfig.duration.medium,
        ease: animationConfig.ease.smooth,
        ...options,
    });
};

/**
 * Scale In Animation
 */
export const scaleIn = (
    element: gsap.TweenTarget,
    options?: gsap.TweenVars
) => {
    return gsap.from(element, {
        scale: 0.8,
        opacity: 0,
        duration: animationConfig.duration.medium,
        ease: animationConfig.ease.smooth,
        ...options,
    });
};

/**
 * Stagger Children Animation
 */
export const staggerChildren = (
    parent: string,
    children: string,
    options?: gsap.TweenVars
) => {
    return gsap.from(`${parent} ${children}`, {
        y: 50,
        opacity: 0,
        stagger: 0.15,
        duration: animationConfig.duration.medium,
        ease: animationConfig.ease.smooth,
        ...options,
    });
};

/**
 * Text Reveal Animation (Split Text Effect)
 */
export const textReveal = (
    element: gsap.TweenTarget,
    options?: gsap.TweenVars
) => {
    return gsap.from(element, {
        y: 100,
        opacity: 0,
        duration: animationConfig.duration.slow,
        ease: animationConfig.ease.smooth,
        stagger: 0.05,
        ...options,
    });
};

/**
 * Parallax Effect
 */
export const parallax = (
    element: Element | string | null,
    speed: number = 0.5
) => {
    return gsap.to(element, {
        y: () => window.innerHeight * speed,
        ease: "none",
        scrollTrigger: {
            trigger: element,
            start: "top top",
            end: "bottom top",
            scrub: true,
        },
    });
};
