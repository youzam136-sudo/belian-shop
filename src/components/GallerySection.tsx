import { useReveal, revealClass } from "../hooks/useReveal";

function GalleryItem({ className, delay }: { className: string; delay?: 1 | 2 | 3 }) {
    const { ref, isVisible } = useReveal<HTMLDivElement>();
    return (
        <div
            ref={ref}
            className={revealClass(`gallery-item ${className}`, isVisible, delay)}
        />
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
