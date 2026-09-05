import { Link } from "react-router-dom";
import { useReveal, revealClass } from "../hooks/useReveal";

function GalleryItem({ className, delay }: { className: string; delay?: 1 | 2 | 3 }) {
    const { ref, isVisible } = useReveal<HTMLAnchorElement>();
    return (
        <Link
            to="/community/event"
            ref={ref}
            className={revealClass("gallery-item", isVisible, delay)}
        >
            <div className={`gallery-item-bg ${className}`} />
        </Link>
    );
}

function GallerySection() {
    return (
        <section className="gallery-section">
            <GalleryItem className="gallery-a" />
            <GalleryItem className="gallery-b" delay={1} />
            <GalleryItem className="gallery-c" delay={2} />
        </section>
    );
}

export default GallerySection;
