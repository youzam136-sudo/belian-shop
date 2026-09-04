import { Link } from "react-router-dom";
import heroProduct from "../assets/povelo/hero-product.jpg";
import { useReveal, revealClass } from "../hooks/useReveal";

function Hero() {
    const { ref, isVisible } = useReveal<HTMLDivElement>();

    return (
        <section className="hero">
            <div className="hero-inner">
                <div ref={ref} className={revealClass("hero-copy", isVisible)}>
                    <h1>
                        Positive ON.
                        <br />
                        Vital Stay
                    </h1>
                    <p>내면과 외면의 완전한 웰빙을 추구하는 모던 프리미엄 이너뷰티</p>
                    <Link to="/shop/skin" className="hero-more-btn">
                        MORE VIEW +
                    </Link>
                </div>

                <div className="hero-visual">
                    <img src={heroProduct} alt="Wineberry Firming Collagen Jelly" />
                </div>
            </div>
        </section>
    );
}

export default Hero;
