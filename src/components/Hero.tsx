import { useReveal, revealClass } from "../hooks/useReveal";
import logoBlack from "../assets/logo_black.png";

function Hero() {
    const { ref, isVisible } = useReveal<HTMLElement>();

    return (
        <section ref={ref} className="hero">
            <div className="hero-inner">
                <div className={revealClass("hero-copy-reveal", isVisible)}>
                    <img src={logoBlack} alt="BELIAN" className="hero-logo" />

                    <p>
                        Positive ON. Vital Stay
                        <br />
                        긍정 스위치를 켜고 활력을 머무르게 하다
                    </p>
                </div>
            </div>
        </section>
    );
}

export default Hero;
