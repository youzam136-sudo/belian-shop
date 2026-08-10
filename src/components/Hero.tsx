import { useCallback, useEffect, useState } from "react";
import { useReveal, revealClass } from "../hooks/useReveal";

import heroSlide1 from "../assets/hero/slide-1.png";
import heroSlide2 from "../assets/hero/slide-2.png";
import heroSlide3 from "../assets/hero/slide-3.png";

/**
 * 메인 비주얼(히어로) 슬라이드 이미지 목록.
 *
 * 나중에 새 이미지로 교체할 때는 이 파일들을 새로 디자인한
 * 이미지로 "같은 파일명"으로 덮어쓰기만 하면 코드 수정 없이
 * 바로 반영됩니다. (src/assets/hero/slide-1.png, slide-2.png, slide-3.png)
 *
 * 슬라이드를 추가/삭제하고 싶다면:
 * 1) src/assets/hero/ 에 이미지를 추가하고
 * 2) 아래 import 한 줄과 heroSlides 배열에 한 줄만 추가/삭제하면 됩니다.
 */
const heroSlides = [heroSlide1, heroSlide2, heroSlide3];

// 자동 슬라이드 전환 간격 (ms)
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
        <section ref={ref} className="hero">
            {/* 슬라이드 이미지 레이어들 (크로스페이드 + 켄번즈 줌) */}
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
                {/* hero-copy 자체는 위치 정렬용 transform(translateY(-50%))을 쓰고 있어서
                    페이드인 애니메이션은 내부 wrapper에 따로 적용한다 */}
                <div className="hero-copy">
                    <div className={revealClass("hero-copy-reveal", isVisible)}>
                        <h1>BRAND</h1>

                        <p>
                            넓은 공간 활용 효율적인 공간
                            <br />
                            독특한 형태의 프레임
                        </p>
                    </div>
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
