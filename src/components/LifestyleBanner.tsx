import { Link } from "react-router-dom";
import lifestyleModel from "../assets/povelo/lifestyle-model.jpg";
import { useReveal, revealClass } from "../hooks/useReveal";

function LifestyleBanner() {
    const { ref: bgRef, isVisible: bgVisible } = useReveal<HTMLDivElement>();
    const { ref: copyRef, isVisible: copyVisible } = useReveal<HTMLDivElement>();

    return (
        <section className="lifestyle-banner">
            <div
                ref={bgRef}
                className={`lifestyle-banner-bg${bgVisible ? " is-visible" : ""}`}
                style={{ backgroundImage: `url(${lifestyleModel})` }}
            />
            <div
                ref={copyRef}
                className={revealClass("lifestyle-banner-copy", copyVisible)}
            >
                <h2>
                    Beyond Visible Results,
                    <br />
                    Awaken the Power Within.
                </h2>
                <Link to="/shop/skin" className="lifestyle-banner-btn">
                    MORE VIEW +
                </Link>
            </div>
        </section>
    );
}

export default LifestyleBanner;
