import Hero from "@/components/Hero/Hero";
import About from "@/components/About/About";
import Education from "@/components/Education/Education";
import Experience from "@/components/Experience/Experience";
import Projects from "@/components/Projects/Projects";
import Skills from "@/components/Skills/Skills";
import Contact from "@/components/Contact/Contact";
import Navbar from "@/components/Navigation/Navbar";

export default function Home() {
    return (
        <main className="relative">
            <Navbar />
            <Hero />
            <About />
            <Experience />
            <Projects />
            <Education />
            <Skills />
            <Contact />
        </main>
    );
}
