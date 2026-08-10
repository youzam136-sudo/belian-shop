import type { Product } from "../data/products";
import productImage from "../assets/prd-img.png";
import { useReveal, revealClass } from "../hooks/useReveal";

interface ProductCardProps {
    product: Product;
    delay?: 1 | 2 | 3 | 4;
}

function ProductCard({ product, delay }: ProductCardProps) {
    const { ref, isVisible } = useReveal<HTMLElement>();

    return (
        <article
            ref={ref}
            className={revealClass("product-card", isVisible, delay)}
        >
            <a href={`/products/${product.id}`}>
                <div className="product-thumb">
                    <img
                        className="product-img"
                        src={productImage}
                        alt={product.name}
                        loading="lazy"
                    />
                </div>

                <div className="product-meta">
                    <h3>{product.name}</h3>

                    <p className="product-description">
                        {product.description}
                    </p>

                    <div className="product-price">
                        {product.price.toLocaleString()}원
                    </div>

                    {product.badge && (
                        <span className="product-badge">
                            {product.badge}
                        </span>
                    )}
                </div>
            </a>
        </article>
    );
}

export default ProductCard;
