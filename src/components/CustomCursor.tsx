import { useEffect, useRef } from "react";

/**
 * 마우스를 부드럽게 따라다니는 커스텀 커서.
 * 링크/버튼 등 클릭 가능한 요소 위에서는 커서가 커지면서
 * 살짝 반투명해지는 효과가 붙는다. (요즘 프리미엄/에이전시
 * 사이트에서 흔히 쓰는 형태)
 *
 * 데스크탑(마우스 환경)에서만 동작하고, 터치 기기에서는
 * 자동으로 비활성화된다.
 */
function CustomCursor() {
    const dotRef = useRef<HTMLDivElement>(null);
    const ringRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const isTouchDevice = window.matchMedia(
            "(hover: none), (pointer: coarse)"
        ).matches;
        if (isTouchDevice) return;

        document.body.classList.add("has-custom-cursor");

        const dot = dotRef.current;
        const ring = ringRef.current;
        if (!dot || !ring) return;

        let mouseX = window.innerWidth / 2;
        let mouseY = window.innerHeight / 2;
        let ringX = mouseX;
        let ringY = mouseY;

        const handleMove = (e: MouseEvent) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            dot.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
        };

        const handleOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            if (target.closest("a, button, [role='button'], input, select, textarea, label")) {
                ring.classList.add("is-hovering");
            }
        };

        const handleOut = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            if (target.closest("a, button, [role='button'], input, select, textarea, label")) {
                ring.classList.remove("is-hovering");
            }
        };

        const handleDown = () => ring.classList.add("is-pressed");
        const handleUp = () => ring.classList.remove("is-pressed");

        let rafId: number;
        const tick = () => {
            // 링(원)은 살짝 지연되어 따라오도록 보간 처리 (부드러운 관성 느낌)
            ringX += (mouseX - ringX) * 0.18;
            ringY += (mouseY - ringY) * 0.18;
            ring.style.transform = `translate(${ringX}px, ${ringY}px)`;
            rafId = requestAnimationFrame(tick);
        };
        rafId = requestAnimationFrame(tick);

        window.addEventListener("mousemove", handleMove);
        document.addEventListener("mouseover", handleOver);
        document.addEventListener("mouseout", handleOut);
        window.addEventListener("mousedown", handleDown);
        window.addEventListener("mouseup", handleUp);

        return () => {
            document.body.classList.remove("has-custom-cursor");
            window.removeEventListener("mousemove", handleMove);
            document.removeEventListener("mouseover", handleOver);
            document.removeEventListener("mouseout", handleOut);
            window.removeEventListener("mousedown", handleDown);
            window.removeEventListener("mouseup", handleUp);
            cancelAnimationFrame(rafId);
        };
    }, []);

    return (
        <>
            <div ref={dotRef} className="custom-cursor-dot" />
            <div ref={ringRef} className="custom-cursor-ring" />
        </>
    );
}

export default CustomCursor;
