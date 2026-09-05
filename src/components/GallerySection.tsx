import { Link } from "react-router-dom";
import { useReveal, revealClass } from "../hooks/useReveal";
import galleryGlow from "../assets/povelo/gallery-glow.jpg";
import galleryIngredient from "../assets/povelo/gallery-ingredient.jpg";
import galleryWellness from "../assets/povelo/gallery-wellness.jpg";

function GalleryItem({ image, delay }: { image: string; delay?: 1 | 2 | 3 }) {
    const { ref, isVisible } = useReveal<HTMLAnchorElement>();
    return (
        <Link
            to="/community/event"
            ref={ref}
            className={revealClass("gallery-item", isVisible, delay)}
        >
            <div
                className="gallery-item-bg"
                style={{ backgroundImage: `url(${image})` }}
            />
        </Link>
    );
}

function GallerySection() {
    return (
        <section className="gallery-section">
            <GalleryItem image={galleryGlow} />
            <GalleryItem image={galleryIngredient} delay={1} />
            <GalleryItem image={galleryWellness} delay={2} />
        </section>
    );
}

export default GallerySection;
