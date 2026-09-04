import { useReveal, revealClass } from "../hooks/useReveal";

function BrandSection() {
    const { ref: copyRef, isVisible: copyVisible } = useReveal<HTMLDivElement>();

    return (
        <section className="brand-section">
            <div ref={copyRef} className={revealClass("brand-copy", copyVisible)}>
                <h2>
                    <span className="brand-copy-line">
                        <span>Positive ON</span>
                    </span>
                    <span className="brand-copy-line">
                        <span>Vital Stay</span>
                    </span>
                </h2>
                <p>
                    포벨로는 눈에 보이는 피부 고민에만 집중하지 않습니다.
                    <br />
                    무너진 내면의 활력과 일상의 리듬을 다시 깨우는 근본적인
                    <br />
                    메커니즘에 집중한 프리미엄 모던 웰니스 루틴 입니다.
                </p>
            </div>
        </section>
    );
}

export default BrandSection;
