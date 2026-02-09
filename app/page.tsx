"use client";

import { useState, useEffect } from "react";
import Nav from "./elements/Nav";
import LiquidEther from "./elements/LiquidEther";
import CurvedLoop from "./elements/CurvedLoop";
import ClickSpark from "./elements/ClickSpark";

const GitHubIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
  </svg>
);

const LinkedInIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

const ReactIcon = () => (
  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
    <path d="M14.23 12.004a2.236 2.236 0 0 1-2.235 2.236 2.236 2.236 0 0 1-2.236-2.236 2.236 2.236 0 0 1 2.235-2.236 2.236 2.236 0 0 1 2.236 2.236zm2.648-10.69c-1.346 0-3.107.96-4.888 2.622-1.78-1.653-3.542-2.602-4.887-2.602-.41 0-.783.093-1.106.278-1.375.793-1.683 3.264-.973 6.365C1.98 8.917 0 10.42 0 12.004c0 1.59 1.99 3.097 5.043 4.03-.704 3.113-.39 5.588.988 6.38.32.187.69.275 1.102.275 1.345 0 3.107-.96 4.888-2.624 1.78 1.654 3.542 2.603 4.887 2.603.41 0 .783-.09 1.106-.275 1.374-.792 1.683-3.263.973-6.365C22.02 15.096 24 13.59 24 12.004c0-1.59-1.99-3.097-5.043-4.032.704-3.11.39-5.587-.988-6.38-.318-.184-.688-.277-1.092-.278zm-.005 1.09v.006c.225 0 .406.044.558.127.666.382.955 1.835.73 3.704-.054.46-.142.945-.25 1.44-.96-.236-2.006-.417-3.107-.534-.66-.905-1.345-1.727-2.035-2.447 1.592-1.48 3.087-2.292 4.105-2.295zm-9.77.02c1.012 0 2.514.808 4.11 2.28-.686.72-1.37 1.537-2.02 2.442-1.107.117-2.154.298-3.113.538-.112-.49-.195-.964-.254-1.42-.23-1.868.054-3.32.714-3.707.19-.09.4-.127.563-.132zm4.882 3.05c.455.468.91.992 1.36 1.564-.44-.02-.89-.034-1.345-.034-.46 0-.915.01-1.36.034.44-.572.895-1.096 1.345-1.565zM12 8.1c.74 0 1.477.034 2.202.093.406.582.802 1.203 1.183 1.86.372.64.71 1.29 1.018 1.946-.308.655-.646 1.31-1.013 1.95-.38.66-.773 1.288-1.18 1.87-.728.063-1.466.098-2.21.098-.74 0-1.477-.035-2.202-.093-.406-.582-.802-1.204-1.183-1.86-.372-.64-.71-1.29-1.018-1.946.303-.657.646-1.313 1.013-1.954.38-.66.773-1.286 1.18-1.868.728-.064 1.466-.098 2.21-.098zm-3.635.254c-.24.377-.48.763-.704 1.16-.225.39-.435.782-.635 1.174-.265-.656-.49-1.31-.676-1.947.64-.15 1.315-.283 2.015-.386zm7.26 0c.695.103 1.365.23 2.006.387-.18.632-.405 1.282-.66 1.933-.2-.39-.41-.783-.64-1.174-.225-.392-.465-.774-.705-1.146zm3.063.675c.484.15.944.317 1.375.498 1.732.74 2.852 1.708 2.852 2.476-.005.768-1.125 1.74-2.857 2.475-.42.18-.88.342-1.355.493-.28-.958-.646-1.956-1.1-2.98.45-1.017.81-2.01 1.085-2.964zm-13.395.004c.278.96.645 1.957 1.1 2.98-.45 1.017-.812 2.01-1.086 2.964-.484-.15-.944-.318-1.37-.5-1.732-.737-2.852-1.706-2.852-2.474 0-.768 1.12-1.742 2.852-2.476.42-.18.88-.342 1.356-.494zm11.678 4.28c.265.657.49 1.312.676 1.948-.64.157-1.316.29-2.016.39.24-.375.48-.762.705-1.158.225-.39.435-.788.636-1.18zm-9.945.02c.2.392.41.783.64 1.175.23.39.465.772.705 1.143-.695-.102-1.365-.23-2.006-.386.18-.63.406-1.282.66-1.933zM17.92 16.32c.112.493.2.968.254 1.423.23 1.868-.054 3.32-.714 3.708-.147.09-.338.128-.563.128-1.012 0-2.514-.807-4.11-2.28.686-.72 1.37-1.536 2.02-2.44 1.107-.118 2.154-.3 3.113-.54zm-11.83.01c.96.234 2.006.415 3.107.532.66.905 1.345 1.727 2.035 2.446-1.595 1.483-3.092 2.295-4.11 2.295-.22-.005-.406-.05-.553-.132-.666-.38-.955-1.834-.73-3.703.054-.46.142-.944.25-1.438zm4.56.64c.44.02.89.034 1.345.034.46 0 .915-.01 1.36-.034-.44.572-.895 1.095-1.345 1.565-.455-.47-.91-.993-1.36-1.565z" />
  </svg>
);

const navItems = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' }
];

export default function Home() {
  const [activeHref, setActiveHref] = useState("#home");

  useEffect(() => {
    let ticking = false;
    
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const sections = ["home", "about", "projects", "skills", "contact"];
          const scrollPosition = window.scrollY + 200;

          for (const section of sections) {
            const element = document.getElementById(section);
            if (element) {
              const offsetTop = element.offsetTop;
              const offsetHeight = element.offsetHeight;

              if (
                scrollPosition >= offsetTop &&
                scrollPosition < offsetTop + offsetHeight
              ) {
                setActiveHref(`#${section}`);
                break;
              }
            }
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <ClickSpark
      sparkColor="#3b82f6"
      sparkSize={10}
      sparkRadius={15}
      sparkCount={8}
      duration={400}
    >
      <div className="min-h-screen bg-white dark:bg-black relative transition-colors duration-300">
        {/* Navigation */}
        <Nav
          logo="./assets/logo.png"
          
          logoAlt="Logo"
          items={navItems}
          activeHref={activeHref}
        />

        {/* Main content */}
        <div>
        {/* Hero Section */}
        <section
          id="home"
          className="min-h-screen pt-24 px-6 flex items-center relative"
        >
          {/* Full-screen Liquid Ether Background */}
          <div className="absolute inset-0 z-0">
            <LiquidEther
              colors={["#3080ff", "#54a2ff", "#7BC8FF"]}
              mouseForce={20}
              cursorSize={100}
              isViscous
              viscous={10}
              iterationsViscous={16}
              iterationsPoisson={16}
              resolution={0.3}
              isBounce={false}
              autoDemo
              autoSpeed={0.3}
              autoIntensity={1.5}
              takeoverDuration={0.25}
              autoResumeDelay={2000}
              autoRampDuration={0.6}
            />
          </div>

          <div className="max-w-4xl mx-auto text-center relative z-10">
            <div className="space-y-6">
              <h1 className="text-5xl lg:text-7xl font-bold">
                <span className="text-gray-900 dark:text-white">Hi, I&apos;m </span>
                <span className="text-blue-500 dark:text-blue-400">Karan</span>
              </h1>

              <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                A passionate{" "}
                <span className="text-blue-500 dark:text-blue-400">Full-Stack Developer</span>{" "}
                crafting beautiful and functional web experiences with modern
                technologies.
              </p>

              <div className="flex gap-4 pt-4 justify-center">
                <button
                  onClick={() => scrollToSection("projects")}
                  className="px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 dark:hover:bg-blue-400 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/25"
                >
                  View Projects
                </button>
                <button
                  onClick={() => scrollToSection("contact")}
                  className="px-6 py-3 border border-blue-500 dark:border-blue-500/50 text-blue-600 dark:text-blue-400 rounded-lg hover:bg-blue-500/10 transition-all duration-300"
                >
                  Contact Me
                </button>
              </div>

              <div className="flex gap-8 pt-8 justify-center">
                <div className="text-center">
                  <div className="text-3xl font-bold text-gray-900 dark:text-white">3+</div>
                  <div className="text-gray-600 dark:text-gray-500 text-sm">Years of Experience</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-gray-900 dark:text-white">50+</div>
                  <div className="text-gray-600 dark:text-gray-500 text-sm">Projects Completed</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-gray-900 dark:text-white">30+</div>
                  <div className="text-gray-600 dark:text-gray-500 text-sm">Happy Clients</div>
                </div>
              </div>

              <div className="flex gap-4 pt-6 justify-center">
                <a
                  href="https://github.com/ogkrn"
                  className="p-3 text-gray-600 dark:text-gray-500 hover:text-blue-500 dark:hover:text-blue-400 transition-colors"
                >
                  <GitHubIcon />
                </a>
                <a
                  href="https://linkedin.com/in/ogkrn"
                  className="p-3 text-gray-600 dark:text-gray-500 hover:text-blue-500 dark:hover:text-blue-400 transition-colors"
                >
                  <LinkedInIcon />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Curved Loop Section - Below Hero */}
        <section className="bg-black py-6 overflow-hidden">
          <div className="h-16">
            <CurvedLoop
              marqueeText="Mentor ✦ Websites ✦ Designing ✦ Graphics ✦ Development ✦ "
              speed={1}
              curveAmount={0}
              direction="left"
              interactive={true}
              className="fill-gray-500"
            />
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-24 px-6 bg-white dark:bg-black">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl font-bold text-black dark:text-white mb-12">
              <span className="text-blue-400">#</span> About Me
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div className="space-y-6">
                <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed">
                  I&apos;m a full-stack developer with a passion for creating
                  elegant solutions to complex problems. With expertise in
                  modern web technologies, I build scalable applications that
                  deliver exceptional user experiences.
                </p>
                <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed">
                  When I&apos;m not coding, you can find me exploring new
                  technologies, contributing to open-source projects, or sharing
                  my knowledge through technical writing.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {[
                  "JavaScript",
                  "TypeScript",
                  "React",
                  "Next.js",
                  "Node.js",
                  "Python",
                  "PostgreSQL",
                  "MongoDB",
                ].map((skill) => (
                  <div
                    key={skill}
                    className="p-4 bg-gray-100 dark:bg-[#1a1a1a] rounded-lg border border-blue-500/20 hover:border-blue-500/50 transition-all duration-300"
                  >
                    <span className="text-blue-500 dark:text-blue-400">{skill}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="py-24 px-6 bg-gray-50 dark:bg-[#0a0a0a]">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl font-bold text-black dark:text-white mb-12">
              <span className="text-blue-400">#</span> Projects
            </h2>

            <div 
              className="grid grid-cols-1 md:grid-cols-2 gap-8"
              onMouseLeave={(e) => {
                // Reset all cards when leaving the grid
                const cards = e.currentTarget.querySelectorAll('[data-project-card]');
                cards.forEach((card) => {
                  (card as HTMLElement).style.filter = '';
                });
              }}
            >
              {/* Project 1 - Aora */}
              <div
                data-project-card
                className="group relative bg-white dark:bg-[#1a1a1a] rounded-3xl border border-gray-200 dark:border-blue-500/20 hover:border-blue-500/50 transition-all duration-500 overflow-hidden aspect-[4/3] mt-0"
                onMouseEnter={(e) => {
                  const parent = e.currentTarget.parentElement;
                  if (parent) {
                    const allCards = parent.querySelectorAll('[data-project-card]');
                    allCards.forEach((card) => {
                      if (card !== e.currentTarget) {
                        (card as HTMLElement).style.filter = 'grayscale(1) brightness(0.7)';
                      } else {
                        (card as HTMLElement).style.filter = 'none';
                      }
                    });
                  }
                }}
                onMouseLeave={(e) => {
                  const parent = e.currentTarget.parentElement;
                  const relatedTarget = e.relatedTarget as HTMLElement | null;
                  if (parent && relatedTarget && relatedTarget instanceof Node && parent.contains(relatedTarget)) {
                    return;
                  }
                  if (parent) {
                    const allCards = parent.querySelectorAll('[data-project-card]');
                    allCards.forEach((card) => {
                      (card as HTMLElement).style.filter = '';
                    });
                  }
                }}
                onMouseMove={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  e.currentTarget.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
                  e.currentTarget.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
                }}
                style={{ transition: 'filter 0.5s ease, border-color 0.3s ease' }}
              >
                <div
                  className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"
                  style={{
                    background: 'radial-gradient(circle 250px at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(59, 130, 246, 0.15), transparent 80%)'
                  }}
                />
                <div className="h-full bg-gradient-to-br from-yellow-100 to-orange-100 dark:from-yellow-500/10 dark:to-orange-500/10 p-8 flex flex-col justify-between">
                  <div className="flex-1 flex items-center justify-center">
                    <div className="text-center text-gray-400 dark:text-gray-600">
                      {/* Placeholder for project image */}
                      <div className="text-6xl mb-4">📱</div>
                      <p className="text-sm">Project Preview</p>
                    </div>
                  </div>
                  <div className="relative z-20 space-y-3">
                    <h3 className="text-2xl font-bold text-black dark:text-white">
                      Aora
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                      Development
                    </p>
                    <p className="text-gray-500 dark:text-gray-500 text-xs">
                      2024
                    </p>
                  </div>
                </div>
              </div>

              {/* Project 2 - Code Screenshot */}
              <div
                data-project-card
                className="group relative bg-white dark:bg-[#1a1a1a] rounded-3xl border border-gray-200 dark:border-blue-500/20 hover:border-blue-500/50 transition-all duration-500 overflow-hidden aspect-[4/3] mt-16"
                onMouseEnter={(e) => {
                  const parent = e.currentTarget.parentElement;
                  if (parent) {
                    const allCards = parent.querySelectorAll('[data-project-card]');
                    allCards.forEach((card) => {
                      if (card !== e.currentTarget) {
                        (card as HTMLElement).style.filter = 'grayscale(1) brightness(0.7)';
                      } else {
                        (card as HTMLElement).style.filter = 'none';
                      }
                    });
                  }
                }}
                onMouseLeave={(e) => {
                  const parent = e.currentTarget.parentElement;
                  const relatedTarget = e.relatedTarget as HTMLElement | null;
                  if (parent && relatedTarget && relatedTarget instanceof Node && parent.contains(relatedTarget)) {
                    return;
                  }
                  if (parent) {
                    const allCards = parent.querySelectorAll('[data-project-card]');
                    allCards.forEach((card) => {
                      (card as HTMLElement).style.filter = '';
                    });
                  }
                }}
                onMouseMove={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  e.currentTarget.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
                  e.currentTarget.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
                }}
                style={{ transition: 'filter 0.5s ease, border-color 0.3s ease' }}
              >
                <div
                  className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"
                  style={{
                    background: 'radial-gradient(circle 250px at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(59, 130, 246, 0.15), transparent 80%)'
                  }}
                />
                <div className="h-full bg-gradient-to-br from-pink-100 to-purple-100 dark:from-pink-500/10 dark:to-purple-500/10 p-8 flex flex-col justify-between">
                  <div className="flex-1 flex items-center justify-center">
                    <div className="text-center text-gray-400 dark:text-gray-600">
                      <div className="text-6xl mb-4">💻</div>
                      <p className="text-sm">Project Preview</p>
                    </div>
                  </div>
                  <div className="relative z-20 space-y-3">
                    <h3 className="text-2xl font-bold text-black dark:text-white">
                      Code Screenshot
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                      Development & Design
                    </p>
                    <p className="text-gray-500 dark:text-gray-500 text-xs">
                      2024
                    </p>
                  </div>
                </div>
              </div>

              {/* Project 3 - iPhone 15 Pro */}
              <div
                data-project-card
                className="group relative bg-white dark:bg-[#1a1a1a] rounded-3xl border border-gray-200 dark:border-blue-500/20 hover:border-blue-500/50 transition-all duration-500 overflow-hidden aspect-[4/3] -mt-12"
                onMouseEnter={(e) => {
                  const parent = e.currentTarget.parentElement;
                  if (parent) {
                    const allCards = parent.querySelectorAll('[data-project-card]');
                    allCards.forEach((card) => {
                      if (card !== e.currentTarget) {
                        (card as HTMLElement).style.filter = 'grayscale(1) brightness(0.7)';
                      } else {
                        (card as HTMLElement).style.filter = 'none';
                      }
                    });
                  }
                }}
                onMouseLeave={(e) => {
                  const parent = e.currentTarget.parentElement;
                  const relatedTarget = e.relatedTarget as HTMLElement | null;
                  if (parent && relatedTarget && relatedTarget instanceof Node && parent.contains(relatedTarget)) {
                    return;
                  }
                  if (parent) {
                    const allCards = parent.querySelectorAll('[data-project-card]');
                    allCards.forEach((card) => {
                      (card as HTMLElement).style.filter = '';
                    });
                  }
                }}
                onMouseMove={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  e.currentTarget.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
                  e.currentTarget.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
                }}
                style={{ transition: 'filter 0.5s ease, border-color 0.3s ease' }}
              >
                <div
                  className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"
                  style={{
                    background: 'radial-gradient(circle 250px at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(59, 130, 246, 0.15), transparent 80%)'
                  }}
                />
                <div className="h-full bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800/50 dark:to-gray-900/50 p-8 flex flex-col justify-between">
                  <div className="flex-1 flex items-center justify-center">
                    <div className="text-center text-gray-400 dark:text-gray-600">
                      <div className="text-6xl mb-4">🎨</div>
                      <p className="text-sm">Project Preview</p>
                    </div>
                  </div>
                  <div className="relative z-20 space-y-3">
                    <h3 className="text-2xl font-bold text-black dark:text-white">
                      iPhone 15 Pro
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                      3D Design
                    </p>
                    <p className="text-gray-500 dark:text-gray-500 text-xs">
                      2024
                    </p>
                  </div>
                </div>
              </div>

              {/* Project 4 - SQHI */}
              <div
                data-project-card
                className="group relative bg-white dark:bg-[#1a1a1a] rounded-3xl border border-gray-200 dark:border-blue-500/20 hover:border-blue-500/50 transition-all duration-500 overflow-hidden aspect-[4/3] mt-8"
                onMouseEnter={(e) => {
                  const parent = e.currentTarget.parentElement;
                  if (parent) {
                    const allCards = parent.querySelectorAll('[data-project-card]');
                    allCards.forEach((card) => {
                      if (card !== e.currentTarget) {
                        (card as HTMLElement).style.filter = 'grayscale(1) brightness(0.7)';
                      } else {
                        (card as HTMLElement).style.filter = 'none';
                      }
                    });
                  }
                }}
                onMouseLeave={(e) => {
                  const parent = e.currentTarget.parentElement;
                  const relatedTarget = e.relatedTarget as HTMLElement | null;
                  if (parent && relatedTarget && relatedTarget instanceof Node && parent.contains(relatedTarget)) {
                    return;
                  }
                  if (parent) {
                    const allCards = parent.querySelectorAll('[data-project-card]');
                    allCards.forEach((card) => {
                      (card as HTMLElement).style.filter = '';
                    });
                  }
                }}
                onMouseMove={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  e.currentTarget.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
                  e.currentTarget.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
                }}
                style={{ transition: 'filter 0.5s ease, border-color 0.3s ease' }}
              >
                <div
                  className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"
                  style={{
                    background: 'radial-gradient(circle 250px at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(59, 130, 246, 0.15), transparent 80%)'
                  }}
                />
                <div className="h-full bg-gradient-to-br from-green-100 to-teal-100 dark:from-green-500/10 dark:to-teal-500/10 p-8 flex flex-col justify-between">
                  <div className="flex-1 flex items-center justify-center">
                    <div className="text-center text-gray-400 dark:text-gray-600">
                      <div className="text-6xl mb-4">🌐</div>
                      <p className="text-sm">Project Preview</p>
                    </div>
                  </div>
                  <div className="relative z-20 space-y-3">
                    <h3 className="text-2xl font-bold text-black dark:text-white">
                      SQHI
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                      Web Development
                    </p>
                    <p className="text-gray-500 dark:text-gray-500 text-xs">
                      2024
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Areas of Expertise Section */}
        <section id="skills" className="py-24 px-6 bg-white dark:bg-black">
          <div className="max-w-7xl mx-auto">
            {/* Section Label */}

            <h2 className="text-5xl md:text-6xl font-bold text-black dark:text-white mb-16">
              Areas of Expertise
            </h2>

            {/* Expertise Categories */}
            <div className="space-y-4 mb-16">
              {/* Development */}
              <details className="group border border-gray-200 dark:border-gray-800 rounded-xl overflow-hidden">
                <summary className="flex items-center justify-between p-6 cursor-pointer hover:bg-gray-50 dark:hover:bg-[#0a0a0a] transition-colors">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">⚡</span>
                    <h3 className="text-xl font-semibold text-black dark:text-white">Development</h3>
                  </div>
                  <svg 
                    className="w-5 h-5 text-gray-500 group-open:rotate-180 transition-transform" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <div className="px-6 pb-6">
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                    Building robust, scalable applications with modern frameworks and best practices. 
                    Expertise in full-stack development, API design, and database architecture.
                  </p>
                </div>
              </details>

              {/* UI/UX Design */}
              <details className="group border border-gray-200 dark:border-gray-800 rounded-xl overflow-hidden">
                <summary className="flex items-center justify-between p-6 cursor-pointer hover:bg-gray-50 dark:hover:bg-[#0a0a0a] transition-colors">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">🎨</span>
                    <h3 className="text-xl font-semibold text-black dark:text-white">UI/UX Design</h3>
                  </div>
                  <svg 
                    className="w-5 h-5 text-gray-500 group-open:rotate-180 transition-transform" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <div className="px-6 pb-6">
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                    Designing user-centric, modern interfaces that shape how the audience 
                    interacts with the product. Focusing on accessibility and seamless user experiences.
                  </p>
                </div>
              </details>

              {/* AI/ML & LLMOps */}
              <details className="group border border-gray-200 dark:border-gray-800 rounded-xl overflow-hidden">
                <summary className="flex items-center justify-between p-6 cursor-pointer hover:bg-gray-50 dark:hover:bg-[#0a0a0a] transition-colors">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">🤖</span>
                    <h3 className="text-xl font-semibold text-black dark:text-white">AI/ML & LLMOps</h3>
                  </div>
                  <svg 
                    className="w-5 h-5 text-gray-500 group-open:rotate-180 transition-transform" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <div className="px-6 pb-6">
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                    Implementing AI solutions using LangChain, fine-tuning models, RAG systems, 
                    and optimizing LLM operations for production-ready applications.
                  </p>
                </div>
              </details>
            </div>

            {/* Technology Stack - Scrolling Badges */}
            <div className="my-8 overflow-hidden relative">
              <div className="flex gap-4 animate-marquee">
                {[
                  "C++", "Python", "JavaScript", "TypeScript", "React", "Next.js",
                  "Express.js", "Node.js", "Tailwind CSS", "React Native",
                  "PostgreSQL", "MySQL", "Prisma ORM", "Docker", "CI/CD", "Git",
                  "Vercel", "LangChain", "LLMOps", "Fine-Tuning", "RAG",
                  "CUDA", "FAISS", "REST"
                ].concat([
                  "C++", "Python", "JavaScript", "TypeScript", "React", "Next.js",
                  "Express.js", "Node.js", "Tailwind CSS", "React Native",
                  "PostgreSQL", "MySQL", "Prisma ORM", "Docker", "CI/CD", "Git",
                  "Vercel", "LangChain", "LLMOps", "Fine-Tuning", "RAG",
                  "CUDA", "FAISS", "REST"
                ]).map((tech, index) => (
                  <div
                    key={index}
                    className="px-5 py-2.5 bg-transparent border border-gray-300 dark:border-gray-700 rounded-full whitespace-nowrap text-sm font-medium text-gray-700 dark:text-gray-300 hover:border-blue-500/50 transition-colors duration-300 flex-shrink-0"
                  >
                    {tech}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-24 px-6 bg-gray-50 dark:bg-[#0a0a0a]">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl font-bold text-black dark:text-white mb-6">
              <span className="text-blue-400">#</span> Get In Touch
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-lg mb-12">
              Have a project in mind or want to collaborate? Feel free to reach
              out!
            </p>

            <a
              href="mailto:hello@example.com"
              className="inline-flex items-center gap-2 px-8 py-4 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-400 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/25"
            >
              Say Hello
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
            </a>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-8 px-6 border-t border-gray-200 dark:border-blue-500/20 bg-white dark:bg-black">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-gray-500">
              © 2024 Karan. All rights reserved.
            </div>
            <div className="flex gap-6">
              <a
                href="https://github.com"
                className="text-gray-500 hover:text-blue-400 transition-colors"
              >
                GitHub
              </a>
              <a
                href="https://linkedin.com"
                className="text-gray-500 hover:text-blue-400 transition-colors"
              >
                LinkedIn
              </a>
              <a
                href="https://twitter.com"
                className="text-gray-500 hover:text-blue-400 transition-colors"
              >
                Twitter
              </a>
            </div>
          </div>
        </footer>
      </div>
    </div>
    </ClickSpark>
  );
}