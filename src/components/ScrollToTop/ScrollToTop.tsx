"use client";
import "./ScrollToTop.scss";
import { useEffect, useState } from "react";
import { ArrowBigUp } from "lucide-react";

const ScrollToTop = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const toggleVisibility = () => {
            if (window.scrollY > 300) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener("scroll", toggleVisibility);
        return () => window.removeEventListener("scroll", toggleVisibility);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    return (
        <button
            className={`scroll-to-top ${isVisible ? "show" : ""}`}
            onClick={scrollToTop}
            aria-label="Scroll to top"
        >
            <ArrowBigUp />
        </button>
    );
};

export default ScrollToTop;