import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useReveal, revealClass } from "../hooks/useReveal";

import heroSlide1 from "../assets/hero-slides/slide-1.png";
import heroSlide2 from "../assets/hero-slides/slide-2.png";
import heroSlide3 from "../assets/hero-slides/slide-3.png";

/**
 * 히어로 슬라이드 이미지 목록.
 * 나중에 새 이미지로 교체할 때는 이 파일들을 새로 디자인한
 * 이미지로 "같은 파일명"으로 덮어쓰기만 하면 코드 수정 없이
 * 바로 반영됩니다. (src/assets/hero-slides/slide-1.png, slide-2.png, slide-3.png)
 */
const heroSlides = [heroSlide1, heroSlide2, heroSlide3];

// 자동 슬라이드 전환 간격 (ms)
const AUTO_PLAY_INTERVAL = 5500;

function Hero() {
    const { ref, isVisible } = useReveal<HTMLDivElement>();
    const [activeIndex, setActiveIndex] = useState(0);

    const goTo = useCallback((index: number) => {
        setActiveIndex(() => {
            const total = heroSlides.length;
            return ((index % total) + total) % total;
        });
    }, []);

    // 자동 재생 (사용자가 슬라이드를 직접 넘기면 activeIndex가 바뀌면서
    // 타이머가 초기화되어, 방금 조작한 시점부터 다시 카운트된다)
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
        <section className="hero">
            {/* 슬라이드 이미지 레이어들 (크로스페이드) */}
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

            <div className="hero-inner">
                <div ref={ref} className={revealClass("hero-copy", isVisible)}>
                    <h1>
                        <span className="hero-copy-line">
                            <span style={{ transitionDelay: "0.05s" }}>
                                Positive ON.
                            </span>
                        </span>
                        <span className="hero-copy-line">
                            <span style={{ transitionDelay: "0.2s" }}>
                                Vital Stay
                            </span>
                        </span>
                    </h1>
                    <p style={{ transitionDelay: "0.38s" }}>
                        긍정 스위치를 켜고 활력을 머무르게 하다
                    </p>
                    <Link
                        to="/shop/skin"
                        className="hero-more-btn"
                        style={{ transitionDelay: "0.5s" }}
                    >
                        MORE VIEW +
                    </Link>
                </div>
            </div>

            {/* 슬라이드 인디케이터 */}
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
