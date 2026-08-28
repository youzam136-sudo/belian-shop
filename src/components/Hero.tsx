import { useCallback, useEffect, useState } from "react";
import { useReveal, revealClass } from "../hooks/useReveal";

import heroSlide1 from "../assets/hero/slide-1.png";
import heroSlide2 from "../assets/hero/slide-2.png";
import heroSlide3 from "../assets/hero/slide-3.png";

const heroSlides = [heroSlide1, heroSlide2, heroSlide3];

const AUTO_PLAY_INTERVAL = 5500;

function Hero() {
    const { ref, isVisible } = useReveal<HTMLElement>();
    const [activeIndex, setActiveIndex] = useState(0);

    const goTo = useCallback((index: number) => {
        setActiveIndex(() => {
            const total = heroSlides.length;
            return ((index % total) + total) % total;
        });
    }, []);

    useEffect(() => {
        if (heroSlides.length <= 1) return;

        const prefersReducedMotion = window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;
        if (prefersReducedMotion) return;

        const timerId = window.setInterval(() => {
            setActiveIndex((prev) => (prev + 1) % heroSlides.length);
        }, AUTO_PLAY_INTERVAL);

        return () => window.clearInterval(timerId);
    }, [activeIndex]);

    return (
        <section ref={ref} className="hero">
            <div className="hero-slides">
                {heroSlides.map((src, index) => (
                    <div
                        key={src}
                        className={
                            "hero-slide" +
                            (index === activeIndex ? " is-active" : "")
                        }
                        style={{ backgroundImage: `url(${src})` }}
                    />
                ))}
            </div>

            {heroSlides.length > 1 && (
                <div className="hero-dots" role="tablist" aria-label="메인 배너 슬라이드">
                    {heroSlides.map((src, index) => (
                        <button
                            key={src}
                            type="button"
                            role="tab"
                            aria-selected={index === activeIndex}
                            aria-label={`${index + 1}번째 배너 보기`}
                            className={
                                "hero-dot" +
                                (index === activeIndex ? " is-active" : "")
                            }
                            onClick={() => goTo(index)}
                        />
                    ))}
                </div>
            )}
        </section>
    );
}

export default Hero;
