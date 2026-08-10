import { useEffect, useRef, useState } from "react";

/**
 * 스크롤 시 요소가 화면에 들어오면 isVisible을 true로 바꿔주는 훅.
 * 반환된 ref를 원하는 요소에 걸고, isVisible에 따라
 * className에 "reveal is-visible" 를 토글해서 페이드인 처리한다.
 */
export function useReveal<T extends HTMLElement = HTMLDivElement>(
    options?: IntersectionObserverInit
) {
    const ref = useRef<T | null>(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const node = ref.current;
        if (!node) return;

        // IntersectionObserver 미지원 환경(구형 브라우저)에서는 그냥 바로 보여준다
        if (typeof IntersectionObserver === "undefined") {
            setIsVisible(true);
            return;
        }

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setIsVisible(true);
                        observer.unobserve(entry.target);
                    }
                });
            },
            {
                threshold: 0.15,
                rootMargin: "0px 0px -60px 0px",
                ...options,
            }
        );

        observer.observe(node);

        return () => observer.disconnect();
    }, []);

    return { ref, isVisible };
}

/** className에 reveal 관련 클래스를 붙여주는 헬퍼 */
export function revealClass(
    base: string,
    isVisible: boolean,
    delay?: 1 | 2 | 3 | 4
) {
    return [
        base,
        "reveal",
        isVisible ? "is-visible" : "",
        delay ? `reveal-delay-${delay}` : "",
    ]
        .filter(Boolean)
        .join(" ");
}
