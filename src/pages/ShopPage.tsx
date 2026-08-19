import { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import "../styles/shop.css";

import Header from "../components/Header";
import Footer from "../components/Footer";
import { useReveal, revealClass } from "../hooks/useReveal";

import shopHero from "../assets/shop/shop-hero.png";
import productImage from "../assets/shop/product.png";

import {
    categories,
    products,
    type ShopProduct,
} from "../data/shopProducts";

function CartIcon() {
    return (
        <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <circle cx="9" cy="21" r="1" />
            <circle cx="20" cy="21" r="1" />
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
        </svg>
    );
}

function ShopProductCard({ product, delay }: { product: ShopProduct; delay?: 1 | 2 | 3 | 4 }) {
    const { ref, isVisible } = useReveal<HTMLElement>();

    return (
        <article
            ref={ref}
            className={revealClass("shop-product-card", isVisible, delay)}
        >
            <Link to={`/product/${product.id}`}>
                <div className="shop-product-image">
                    <img
                        src={productImage}
                        alt={product.name}
                    />

                    {product.variant === "badge" && product.discountPercent && (
                        <span className="shop-product-discount-badge">
                            {product.discountPercent}%
                        </span>
                    )}

                    {product.variant === "cart" && (
                        <span
                            className="shop-product-cart-btn"
                            aria-label="장바구니 담기"
                        >
                            <CartIcon />
                        </span>
                    )}
                </div>

                <div className="shop-product-info">
                    <h3>{product.name}</h3>

                    <p>
                        {product.description}
                    </p>

                    {product.variant === "badge" ? (
                        <div className="shop-product-price-badge">
                            {product.originalPrice && (
                                <span className="shop-product-price-original">
                                    {product.originalPrice.toLocaleString()}원
                                </span>
                            )}

                            <span className="shop-product-price-sale">
                                {product.price.toLocaleString()}원
                            </span>
                        </div>
                    ) : product.variant === "cart" ? (
                        <div className="shop-product-price-cart">
                            {product.discountPercent && (
                                <span className="shop-product-discount-percent">
                                    {product.discountPercent}%
                                </span>
                            )}

                            <span className="shop-product-price-sale">
                                {product.price.toLocaleString()}원
                            </span>
                        </div>
                    ) : (
                        <div className="shop-product-price">
                            {product.price.toLocaleString()}
                            원
                        </div>
                    )}

                    {product.badge && !product.variant && (
                        <span className="shop-product-badge">
                            {product.badge}
                        </span>
                    )}
                </div>
            </Link>
        </article>
    );
}

function ShopPage() {
    // URL의 :categoryId 값을 카테고리로 사용한다.
    // 예) /shop/skin, /shop/serum, /shop/mask
    const { categoryId } = useParams<{ categoryId: string }>();
    const navigate = useNavigate();

    const activeCategory =
        categories.some((item) => item.id === categoryId)
            ? (categoryId as string)
            : "skin";

    // 존재하지 않는 카테고리 경로로 들어오면 기본 카테고리로 보정한다.
    useEffect(() => {
        if (categoryId && !categories.some((item) => item.id === categoryId)) {
            navigate("/shop/skin", { replace: true });
        }
    }, [categoryId, navigate]);

    const { ref: heroRef, isVisible: heroVisible } = useReveal<HTMLElement>();
    const { ref: headingRef, isVisible: headingVisible } = useReveal<HTMLDivElement>();

    const category =
        categories.find(
            (item) => item.id === activeCategory,
        ) ?? categories[0];

    const visibleProducts = products.filter(
        (product) => product.category === activeCategory,
    );

    return (
        <>
            <Header />

            <main className="shop-page">

                {/* HERO */}
                <section
                    ref={heroRef}
                    className={revealClass("shop-hero", heroVisible)}
                    style={{
                        backgroundImage: `url(${shopHero})`,
                    }}
                >
                    <div className="shop-hero-overlay" />

                    <div className="shop-hero-content">
                        <h1>
                            당신의 피부를 더 건강하게 만드는 스킨케어
                        </h1>

                        <p>
                            피부를 촉촉하게 전체적으로 감싸줍니다.
                        </p>
                    </div>
                </section>

                {/* CATEGORY NAV */}
                <section className="shop-category-section">
                    <nav className="shop-category-tabs">
                        {categories.map((item) => (
                            <button
                                key={item.id}
                                type="button"
                                className={
                                    activeCategory === item.id
                                        ? "is-active"
                                        : ""
                                }
                                onClick={() =>
                                    navigate(`/shop/${item.id}`)
                                }
                            >
                                {item.label}
                            </button>
                        ))}
                    </nav>

                    {/* TITLE */}
                    <div ref={headingRef} className={revealClass("shop-category-heading", headingVisible)}>
                        <h2>{category.title}</h2>

                        <p>{category.description}</p>
                    </div>

                    {/* PRODUCTS */}
                    <div className="shop-product-grid">
                        {visibleProducts.map((product, index) => (
                            <ShopProductCard
                                key={product.id}
                                product={product}
                                delay={((index % 4) + 1) as 1 | 2 | 3 | 4}
                            />
                        ))}
                    </div>
                </section>
            </main>

            <Footer />
        </>
    );
}

export default ShopPage;
