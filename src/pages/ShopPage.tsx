import { useState } from "react";
import "../styles/shop.css";

import Header from "../components/Header";
import Footer from "../components/Footer";
import { useReveal, revealClass } from "../hooks/useReveal";

import shopHero from "../assets/shop/shop-hero.png";
import productImage from "../assets/shop/product.png";

type Category = {
    id: string;
    label: string;
    title: string;
    description: string;
};

type ShopProduct = {
    id: number;
    name: string;
    description: string;
    price: number;
    badge?: string;
    category: string;
};

const categories: Category[] = [
    {
        id: "skin",
        label: "스킨",
        title: "스킨",
        description: "스킨 제품에 대한 설명입니다",
    },
    {
        id: "lotion",
        label: "로션",
        title: "로션",
        description: "로션 제품에 대한 설명입니다",
    },
    {
        id: "cream",
        label: "크림",
        title: "크림",
        description: "크림 제품에 대한 설명입니다",
    },
    {
        id: "etc",
        label: "기타",
        title: "기타",
        description: "기타 제품에 대한 설명입니다",
    },
];

const products: ShopProduct[] = Array.from(
    { length: 8 },
    (_, index) => ({
        id: index + 1,
        name: "스킨케어 제품",
        description:
            "손잡이 없이 깔끔하게! 터치 한번으로 간편하게!",
        price: 4300,
        badge: "NEW",
        category: "skin",
    }),
);

function ShopProductCard({ product, delay }: { product: ShopProduct; delay?: 1 | 2 | 3 | 4 }) {
    const { ref, isVisible } = useReveal<HTMLElement>();

    return (
        <article
            ref={ref}
            className={revealClass("shop-product-card", isVisible, delay)}
        >
            <a href="#">
                <div className="shop-product-image">
                    <img
                        src={productImage}
                        alt={product.name}
                    />
                </div>

                <div className="shop-product-info">
                    <h3>{product.name}</h3>

                    <p>
                        {product.description}
                    </p>

                    <div className="shop-product-price">
                        {product.price.toLocaleString()}
                        원
                    </div>

                    {product.badge && (
                        <span className="shop-product-badge">
                            {product.badge}
                        </span>
                    )}
                </div>
            </a>
        </article>
    );
}

function ShopPage() {
    const [activeCategory, setActiveCategory] =
        useState("skin");

    const { ref: heroRef, isVisible: heroVisible } = useReveal<HTMLElement>();
    const { ref: headingRef, isVisible: headingVisible } = useReveal<HTMLDivElement>();

    const category =
        categories.find(
            (item) => item.id === activeCategory,
        ) ?? categories[0];

    const visibleProducts = products.filter(
        (product) =>
            product.category === activeCategory ||
            activeCategory !== "skin",
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
                                    setActiveCategory(item.id)
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
