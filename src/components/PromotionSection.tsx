import { Link } from "react-router-dom";
import bannerImg from "../assets/prd-img.png";
import { useReveal, revealClass } from "../hooks/useReveal";

function PromotionSection() {
    const { ref: copyRef, isVisible: copyVisible } = useReveal<HTMLDivElement>();
    const { ref: visualRef, isVisible: visualVisible } = useReveal<HTMLDivElement>();

    return (
        <section className="promotion-section">
            <div ref={copyRef} className={revealClass("promotion-copy", copyVisible)}>
                <span>MEMBERSHIP</span>

                <h2>
                    매일 더욱 커질 혜택 없이
                    <br />
                    지금 바로 만나보세요.
                </h2>

                <p>
                    신규 회원을 위한 다양한 혜택을 준비했습니다.
                </p>

                <Link to="/signup">회원가입하기</Link>
            </div>

            <div ref={visualRef} className={revealClass("promotion-visual", visualVisible, 1)}>
                <img src={bannerImg} alt="" />
            </div>
        </section>
    );
}

export default PromotionSection;
