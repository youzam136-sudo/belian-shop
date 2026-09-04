import { Link } from "react-router-dom";
import lifestyleModel from "../assets/povelo/lifestyle-model.jpg";
import { useReveal, revealClass } from "../hooks/useReveal";

function LifestyleBanner() {
    const { ref, isVisible } = useReveal<HTMLDivElement>();

    return (
        <section
            className="lifestyle-banner"
            style={{ backgroundImage: `url(${lifestyleModel})` }}
        >
            <div
                ref={ref}
                className={revealClass("lifestyle-banner-copy", isVisible)}
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
