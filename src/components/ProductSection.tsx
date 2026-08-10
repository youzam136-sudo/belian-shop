import ProductCard from "./ProductCard";
import { products } from "../data/products";
import { useReveal, revealClass } from "../hooks/useReveal";

function ProductSection() {
    const { ref: headingRef, isVisible: headingVisible } = useReveal<HTMLDivElement>();
    const { ref: moreRef, isVisible: moreVisible } = useReveal<HTMLDivElement>();

    return (
        <section className="product-section">
            <div ref={headingRef} className={revealClass("section-heading", headingVisible)}>
                <h2>이달의 업데이트 상품</h2>
                <p>Best item 이달의 베스트 아이템입니다</p>
            </div>

            <div className="product-grid">
                {products.map((product, index) => (
                    <ProductCard
                        key={product.id}
                        product={product}
                        delay={((index % 4) + 1) as 1 | 2 | 3 | 4}
                    />
                ))}
            </div>

            <div ref={moreRef} className={revealClass("section-more", moreVisible)}>
                <button type="button">
                    전체보기<span>+</span>
                </button>
            </div>
        </section>
    );
}

export default ProductSection;
