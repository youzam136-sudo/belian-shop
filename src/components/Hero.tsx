import { Link } from "react-router-dom";
import heroProduct from "../assets/povelo/hero-product.jpg";
import { useReveal, revealClass } from "../hooks/useReveal";

function Hero() {
    const { ref, isVisible } = useReveal<HTMLDivElement>();

    return (
        <section
            className="hero"
            style={{ backgroundImage: `url(${heroProduct})` }}
        >
            <div className="hero-inner">
                <div ref={ref} className={revealClass("hero-copy", isVisible)}>
                    <h1>
                        Positive ON.
                        <br />
                        Vital Stay
                    </h1>
                    <p>긍정 스위치를 켜고 활력을 머무르게 하다</p>
                    <Link to="/shop/skin" className="hero-more-btn">
                        MORE VIEW +
                    </Link>
                </div>
            </div>
        </section>
    );
}

export default Hero;
