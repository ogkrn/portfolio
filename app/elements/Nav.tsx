"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";

interface NavItem {
  label: string;
  href: string;
}

interface NavProps {
  logo: string;
  logoAlt: string;
  items: NavItem[];
  activeHref: string;
}

export default function Nav({ logo, logoAlt, items, activeHref }: NavProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDark, setIsDark] = useState(true); // Default to dark
  const [isTransitioning, setIsTransitioning] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    // Check initial theme - check if dark class exists or use localStorage
    const savedTheme = localStorage.getItem("theme");
    const hasDarkClass = document.documentElement.classList.contains("dark");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    
    let shouldBeDark: boolean;
    if (savedTheme) {
      shouldBeDark = savedTheme === "dark";
    } else if (hasDarkClass) {
      shouldBeDark = true;
    } else {
      shouldBeDark = prefersDark;
    }
    
    setIsDark(shouldBeDark);
    if (shouldBeDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  useEffect(() => {
    let ticking = false;
    
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setIsScrolled(window.scrollY > 20);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleTheme = () => {
    if (isTransitioning) return;
    
    const newIsDark = !isDark;
    setIsTransitioning(true);
    
    // Get button position for circle origin
    const button = buttonRef.current;
    if (button) {
      const rect = button.getBoundingClientRect();
      const x = rect.left + rect.width / 2;
      const y = rect.top + rect.height / 2;
      
      // Calculate max radius to cover entire screen
      const maxRadius = Math.sqrt(
        Math.max(x, window.innerWidth - x) ** 2 + 
        Math.max(y, window.innerHeight - y) ** 2
      ) * 2;
      
      // Create overlay
      const overlay = document.createElement("div");
      overlay.className = "theme-transition-overlay";
      
      const circle = document.createElement("div");
      circle.className = "theme-circle";
      circle.style.left = `${x}px`;
      circle.style.top = `${y}px`;
      circle.style.width = "0px";
      circle.style.height = "0px";
      circle.style.backgroundColor = newIsDark ? "#000000" : "#ffffff";
      
      overlay.appendChild(circle);
      document.body.appendChild(overlay);
      
      // Trigger animation
      requestAnimationFrame(() => {
        circle.style.width = `${maxRadius}px`;
        circle.style.height = `${maxRadius}px`;
      });
      
      // Apply theme change midway through animation
      setTimeout(() => {
        setIsDark(newIsDark);
        if (newIsDark) {
          document.documentElement.classList.add("dark");
          localStorage.setItem("theme", "dark");
        } else {
          document.documentElement.classList.remove("dark");
          localStorage.setItem("theme", "light");
        }
      }, 400);
      
      // Remove overlay after animation
      setTimeout(() => {
        overlay.remove();
        setIsTransitioning(false);
      }, 800);
    } else {
      // Fallback without animation
      setIsDark(newIsDark);
      if (newIsDark) {
        document.documentElement.classList.add("dark");
        localStorage.setItem("theme", "dark");
      } else {
        document.documentElement.classList.remove("dark");
        localStorage.setItem("theme", "light");
      }
      setIsTransitioning(false);
    }
  };

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header className="sticky top-0 left-0 right-0 z-50 pointer-events-none w-full px-0 py-3 md:py-4">
      <div className="w-full px-3 sm:px-4 md:px-6">
        <nav
          className="pointer-events-auto flex w-full items-center justify-between gap-3 sm:gap-4 md:gap-6 rounded-full px-3 py-1.5 sm:px-4 sm:py-1 md:px-6 md:pr-4 mx-auto relative will-change-[max-width,background-color,backdrop-filter]"
          style={{
            maxWidth: isScrolled ? "600px" : "1280px",
            backgroundColor: isScrolled ? "rgba(0,0,0,0.5)" : "transparent",
            backdropFilter: isScrolled ? "blur(12px)" : "none",
            transition: "max-width 0.5s ease-in-out, background-color 0.5s ease-in-out, backdrop-filter 0.5s ease-in-out",
          }}
        >
          {/* Logo */}
          <a
            href="/"
            className={`relative flex-shrink-0 overflow-hidden rounded-full transition-all duration-300 ${
              isScrolled ? "h-7 w-7 sm:h-8 sm:w-8" : "h-8 w-8 sm:h-9 sm:w-9 md:h-10 md:w-10"
            }`}
          >
            <Image
              src="/logo.png"
              alt={logoAlt}
              fill
              className="object-cover"
              priority
            />
          </a>

          {/* Nav Items - Hidden on mobile */}
          <ul className="text-gray-600 dark:text-gray-300 hidden md:flex gap-4 lg:gap-6 text-sm font-semibold flex-1 justify-center">
            {items.map((item) => (
              <li key={item.href} className="group relative">
                <button
                  onClick={() => scrollToSection(item.href)}
                  className="transition-colors duration-300 whitespace-nowrap font-semibold"
                >
                  <span className="relative inline-flex overflow-hidden">
                    <div
                      className={`translate-y-0 skew-y-0 transform-gpu transition-transform duration-500 group-hover:-translate-y-[110%] group-hover:skew-y-12 font-semibold ${
                        activeHref === item.href ? "text-blue-500 font-bold" : ""
                      }`}
                    >
                      {item.label}
                    </div>
                    <div className="text-blue-500 font-bold absolute translate-y-[110%] skew-y-12 transform-gpu transition-transform duration-500 group-hover:translate-y-0 group-hover:skew-y-0">
                      {item.label}
                    </div>
                  </span>
                </button>
              </li>
            ))}
          </ul>

          {/* Dark Mode Toggle */}
          <div className="flex items-center justify-center flex-shrink-0">
            <button
              ref={buttonRef}
              onClick={toggleTheme}
              disabled={isTransitioning}
              className="ring-offset-background inline-flex cursor-pointer items-center justify-center whitespace-nowrap text-sm font-semibold disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-9 w-9 sm:h-10 sm:w-10 md:h-11 md:w-11 text-gray-700 dark:text-gray-200 relative rounded-full border border-gray-300 dark:border-gray-600 bg-white/80 dark:bg-black/80 shadow-md backdrop-blur-md transition-all duration-300 active:scale-90 hover:border-gray-400 dark:hover:border-gray-500"
            >
              {/* Sun Icon - shows in dark mode (click to go light) */}
              <div
                className="absolute inset-0 flex items-center justify-center transition-all duration-500"
                style={{
                  opacity: isDark ? 1 : 0,
                  transform: isDark ? "none" : "scale(0.5) rotate(-180deg)",
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="sm:w-[18px] sm:h-[18px]"
                  aria-hidden="true"
                >
                  <circle cx="12" cy="12" r="4"></circle>
                  <path d="M12 2v2"></path>
                  <path d="M12 20v2"></path>
                  <path d="m4.93 4.93 1.41 1.41"></path>
                  <path d="m17.66 17.66 1.41 1.41"></path>
                  <path d="M2 12h2"></path>
                  <path d="M20 12h2"></path>
                  <path d="m6.34 17.66-1.41 1.41"></path>
                  <path d="m19.07 4.93-1.41 1.41"></path>
                </svg>
              </div>

              {/* Moon Icon - shows in light mode (click to go dark) */}
              <div
                className="absolute inset-0 flex items-center justify-center transition-all duration-500"
                style={{
                  opacity: isDark ? 0 : 1,
                  transform: isDark ? "scale(0.5) rotate(180deg)" : "none",
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="sm:w-[18px] sm:h-[18px]"
                  aria-hidden="true"
                >
                  <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path>
                </svg>
              </div>

              <span className="sr-only">Toggle theme</span>
            </button>
          </div>
        </nav>
      </div>
    </header>
  );
}