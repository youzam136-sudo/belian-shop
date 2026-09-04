import { Link } from "react-router-dom";
import { useReveal, revealClass } from "../hooks/useReveal";

function BrandSection() {
    const { ref: visualRef, isVisible: visualVisible } = useReveal<HTMLDivElement>();
    const { ref: copyRef, isVisible: copyVisible } = useReveal<HTMLDivElement>();

    return (
        <section className="brand-section">
            <div ref={visualRef} className={revealClass("brand-visual", visualVisible)}>
            </div>

            <div ref={copyRef} className={revealClass("brand-copy", copyVisible, 1)}>
                <span className="brand-eyebrow">
                    BRAND STORY
                </span>

                <h2>BELIAN</h2>

                <p>
                    브랜드 철학
                    <br />
                    눈에 보이는 효과를 넘어 내면까지 작동하는
                    <br />
                    근본적인 메커니즘을 깨우다
                </p>

                <Link to="/brand" className="brand-more-btn">VIEW MORE</Link>
            </div>
        </section>
    );
}

export default BrandSection;
