import { useReveal, revealClass } from "../hooks/useReveal";

function BrandSection() {
    const { ref: visualRef, isVisible: visualVisible } = useReveal<HTMLDivElement>();
    const { ref: copyRef, isVisible: copyVisible } = useReveal<HTMLDivElement>();

    return (
        <section className="brand-section">
            <div ref={visualRef} className={revealClass("brand-visual", visualVisible)}>
                {/* <div className="brand-pill">
                    ONETWO
                </div> */}
            </div>

            <div ref={copyRef} className={revealClass("brand-copy", copyVisible, 1)}>
                <span className="brand-eyebrow">
                    BRAND STORY
                </span>

                <h2>ONETWO</h2>

                <p>
                    브랜드가 추구하는 가치와
                    <br />
                    감성을 담아 제품을 소개합니다.
                    <br />
                    자연과 공간에서 영감을 받은
                    <br />
                    새로운 라이프스타일을 제안합니다.
                </p>

                <a href="#">바로가기</a>
            </div>
        </section>
    );
}

export default BrandSection;
