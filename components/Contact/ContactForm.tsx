"use client";

import { useState, FormEvent } from "react";
import { motion } from "framer-motion";

interface FormData {
    name: string;
    email: string;
    message: string;
}

interface FormErrors {
    name?: string;
    email?: string;
    message?: string;
}

export default function ContactForm() {
    const [formData, setFormData] = useState<FormData>({
        name: "",
        email: "",
        message: "",
    });

    const [errors, setErrors] = useState<FormErrors>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<"success" | "error" | null>(
        null
    );

    const validateForm = (): boolean => {
        const newErrors: FormErrors = {};

        if (!formData.name.trim()) {
            newErrors.name = "Name is required";
        }

        if (!formData.email.trim()) {
            newErrors.email = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = "Email is invalid";
        }

        if (!formData.message.trim()) {
            newErrors.message = "Message is required";
        } else if (formData.message.trim().length < 10) {
            newErrors.message = "Message must be at least 10 characters";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        if (!validateForm()) return;

        setIsSubmitting(true);
        setSubmitStatus(null);

        try {
            const response = await fetch("/api/contact", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || "Failed to send message");
            }

            setSubmitStatus("success");
            setFormData({ name: "", email: "", message: "" });
        } catch (error) {
            console.error("Submission error:", error);
            setSubmitStatus("error");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        // Clear error when user starts typing
        if (errors[name as keyof FormErrors]) {
            setErrors((prev) => ({ ...prev, [name]: undefined }));
        }
    };

    return (
        <div className="brutalist-border p-8 bg-white text-black">
            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name Field */}
                <div>
                    <label
                        htmlFor="name"
                        className="block text-sm font-mono font-bold mb-2"
                    >
                        NAME *
                    </label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className={`w-full brutalist-border px-4 py-3 bg-bg-secondary focus:outline-none focus:ring-2 focus:ring-accent ${errors.name ? "border-accent" : ""
                            }`}
                        placeholder="Your Name"
                    />
                    {errors.name && (
                        <p className="text-accent text-sm mt-1 font-mono">{errors.name}</p>
                    )}
                </div>

                {/* Email Field */}
                <div>
                    <label
                        htmlFor="email"
                        className="block text-sm font-mono font-bold mb-2"
                    >
                        EMAIL *
                    </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className={`w-full brutalist-border px-4 py-3 bg-bg-secondary focus:outline-none focus:ring-2 focus:ring-accent ${errors.email ? "border-accent" : ""
                            }`}
                        placeholder="your.email@example.com"
                    />
                    {errors.email && (
                        <p className="text-accent text-sm mt-1 font-mono">{errors.email}</p>
                    )}
                </div>

                {/* Message Field */}
                <div>
                    <label
                        htmlFor="message"
                        className="block text-sm font-mono font-bold mb-2"
                    >
                        MESSAGE *
                    </label>
                    <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        rows={6}
                        className={`w-full brutalist-border px-4 py-3 bg-bg-secondary focus:outline-none focus:ring-2 focus:ring-accent resize-none ${errors.message ? "border-accent" : ""
                            }`}
                        placeholder="Tell me about your project..."
                    />
                    {errors.message && (
                        <p className="text-accent text-sm mt-1 font-mono">
                            {errors.message}
                        </p>
                    )}
                </div>

                {/* Submit Button */}
                <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full brutalist-border px-8 py-4 bg-black text-white font-bold text-lg hover:bg-accent hover:text-black transition-all duration-300 cursor-hover disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {isSubmitting ? "SENDING..." : "SEND MESSAGE"}
                </motion.button>

                {/* Success Message */}
                {submitStatus === "success" && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="brutalist-border p-4 bg-accent text-black font-bold text-center"
                    >
                        Message sent successfully! I'll get back to you soon.
                    </motion.div>
                )}
            </form>
        </div>
    );
}
