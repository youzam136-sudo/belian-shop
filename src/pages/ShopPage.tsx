import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
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

type CardVariant = "badge" | "cart";

type ShopProduct = {
    id: number;
    name: string;
    description: string;
    price: number;
    badge?: string;
    category: string;
    variant?: CardVariant;
    originalPrice?: number;
    discountPercent?: number;
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
    {
        id: "serum",
        label: "세럼",
        title: "세럼",
        description: "세럼 제품에 대한 설명입니다",
    },
    {
        id: "cleanser",
        label: "클렌저",
        title: "클렌저",
        description: "클렌저 제품에 대한 설명입니다",
    },
    {
        id: "mask",
        label: "마스크팩",
        title: "마스크팩",
        description: "마스크팩 제품에 대한 설명입니다",
    },
    {
        id: "suncare",
        label: "선케어",
        title: "선케어",
        description: "선케어 제품에 대한 설명입니다",
    },
];

// 기존 스킨 카테고리 상품 (기존 그대로)
const skinProducts: ShopProduct[] = Array.from(
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

// 세럼 / 클렌저: 원형 "50%" 배지 + 원가 취소선 스타일
const badgeVariantProducts: ShopProduct[] = [
    ...Array.from({ length: 8 }, (_, index) => ({
        id: 100 + index + 1,
        name: "스킨이름",
        description: "스킨제품 설명",
        price: 68000,
        originalPrice: 120000,
        discountPercent: 50,
        variant: "badge" as const,
        category: "serum",
    })),
    ...Array.from({ length: 8 }, (_, index) => ({
        id: 200 + index + 1,
        name: "스킨이름",
        description: "스킨제품 설명",
        price: 68000,
        originalPrice: 120000,
        discountPercent: 50,
        variant: "badge" as const,
        category: "cleanser",
    })),
];

// 마스크팩 / 선케어: 장바구니 아이콘 + 주황색 할인율 스타일
const cartVariantProducts: ShopProduct[] = [
    ...Array.from({ length: 8 }, (_, index) => ({
        id: 300 + index + 1,
        name: "제품제목",
        description: "제품제목과에 대한 설명입니다...",
        price: 59000,
        discountPercent: 16,
        variant: "cart" as const,
        category: "mask",
    })),
    ...Array.from({ length: 8 }, (_, index) => ({
        id: 400 + index + 1,
        name: "제품제목",
        description: "제품제목과에 대한 설명입니다...",
        price: 59000,
        discountPercent: 16,
        variant: "cart" as const,
        category: "suncare",
    })),
];

const products: ShopProduct[] = [
    ...skinProducts,
    ...badgeVariantProducts,
    ...cartVariantProducts,
];

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
            <a href="#">
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
            </a>
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
