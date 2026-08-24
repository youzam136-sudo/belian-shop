import { useState } from "react";
import { Link } from "react-router-dom";

import "../styles/mypage.css";
import "../styles/shop.css";

import Header from "../components/Header";
import Footer from "../components/Footer";
import { useReveal, revealClass } from "../hooks/useReveal";

import iconOrder from "../assets/my_order.png";
import iconReview from "../assets/my_review.png";
import iconCoupon from "../assets/my_coupon.png";
import iconPoint from "../assets/my_point.png";
import iconQna from "../assets/my_qna.png";

import productImage from "../assets/shop/product.png";
import { products, type ShopProduct } from "../data/shopProducts";

// 실제로는 사용자가 최근에 본 상품 id 목록을 저장해뒀다가 불러와야 하지만,
// 지금은 카테고리별로 몇 개씩 골라서 "최근 본 상품"처럼 보여준다.
const recentIds = [
    1, 101, 301, 501, 601, 3, 201, 401,
    102, 302, 502, 602, 5, 203, 403, 7,
];
const recentProducts: ShopProduct[] = recentIds
    .map((id) => products.find((product) => product.id === id))
    .filter((product): product is ShopProduct => Boolean(product));

const PAGE_SIZE = 8;
const totalPages = Math.max(1, Math.ceil(recentProducts.length / PAGE_SIZE));

const quickMenus = [
    { id: 1, icon: iconOrder, title: "주문 배송", value: "보기" },
    { id: 2, icon: iconReview, title: "리뷰", value: "0" },
    { id: 3, icon: iconCoupon, title: "쿠폰", value: "0" },
    { id: 4, icon: iconPoint, title: "포인트", value: "0" },
    { id: 5, icon: iconQna, title: "문의내역", value: "" },
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

function RecentProductCard({ product, delay }: { product: ShopProduct; delay?: 1 | 2 | 3 | 4 }) {
    const { ref, isVisible } = useReveal<HTMLElement>();

    return (
        <article
            ref={ref}
            className={revealClass("shop-product-card", isVisible, delay)}
        >
            <Link to={`/product/${product.id}`}>
                <div className="shop-product-image">
                    <img src={productImage} alt={product.name} />

                    {product.variant === "badge" && product.discountPercent && (
                        <span className="shop-product-discount-badge">
                            {product.discountPercent}%
                        </span>
                    )}

                    {product.variant === "cart" && (
                        <span className="shop-product-cart-btn" aria-label="장바구니 담기">
                            <CartIcon />
                        </span>
                    )}
                </div>

                <div className="shop-product-info">
                    <h3>{product.name}</h3>

                    <p>{product.description}</p>

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
                            {product.price.toLocaleString()}원
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

function RecentViewedPage() {
    const { ref: sidebarRef, isVisible: sidebarVisible } = useReveal<HTMLElement>();
    const { ref: quickRef, isVisible: quickVisible } = useReveal<HTMLDivElement>();
    const { ref: listRef, isVisible: listVisible } = useReveal<HTMLDivElement>();
    const [page, setPage] = useState(1);

    const pageItems = recentProducts.slice(
        (page - 1) * PAGE_SIZE,
        page * PAGE_SIZE,
    );

    const goToPage = (next: number) => {
        setPage(Math.min(Math.max(next, 1), totalPages));
    };

    return (
        <>
            <Header />

            <main className="mypage">
                <div className="mypage-container">

                    {/* PC LEFT MENU */}
                    <aside ref={sidebarRef} className={revealClass("mypage-sidebar", sidebarVisible)}>
                        <div className="mypage-sidebar-line" />

                        <nav>
                            <Link to="/mypage">마이페이지</Link>
                            <Link to="/mypage/refund">취소/환불 내역</Link>
                            <Link to="/mypage/recent" className="active">최근 본 상품</Link>
                            <Link to="/mypage/review">리뷰 작성</Link>
                            <Link to="/mypage/coupon">나의 쿠폰</Link>
                            <a href="#">내 정보 관리</a>
                        </nav>

                        <div className="mypage-sidebar-line bottom" />
                    </aside>

                    {/* CONTENT */}
                    <section className="mypage-content">

                        {/* QUICK MENU */}
                        <div ref={quickRef} className={revealClass("mypage-quick-menu", quickVisible, 1)}>
                            {quickMenus.map((menu) =>
                                menu.id === 1 ? (
                                    <Link to="/mypage/delivery" className="mypage-quick-item" key={menu.id}>
                                        <span className="mypage-quick-icon">
                                            <img src={menu.icon} alt={menu.title} />
                                        </span>
                                        <strong>{menu.title}</strong>
                                        <span className="mypage-quick-value">{menu.value}</span>
                                    </Link>
                                ) : (
                                    <button type="button" className="mypage-quick-item" key={menu.id}>
                                        <span className="mypage-quick-icon">
                                            <img src={menu.icon} alt={menu.title} />
                                        </span>
                                        <strong>{menu.title}</strong>
                                        <span
                                            className="mypage-quick-value"
                                            style={{ visibility: menu.value ? "visible" : "hidden" }}
                                        >
                                            {menu.value || "0"}
                                        </span>
                                    </button>
                                ),
                            )}
                        </div>

                        {/* RECENT PRODUCTS - Shop 페이지와 동일한 카드 그리드 */}
                        <div ref={listRef} className={revealClass("mypage-recent-section", listVisible, 2)}>
                            <h2>최근 본 상품</h2>

                            <div className="shop-product-grid mypage-recent-grid">
                                {pageItems.map((product, index) => (
                                    <RecentProductCard
                                        key={product.id}
                                        product={product}
                                        delay={((index % 4) + 1) as 1 | 2 | 3 | 4}
                                    />
                                ))}
                            </div>

                            {totalPages > 1 && (
                                <nav className="recent-pagination">
                                    <button
                                        type="button"
                                        onClick={() => goToPage(page - 1)}
                                        disabled={page === 1}
                                        aria-label="이전 페이지"
                                    >
                                        ‹
                                    </button>

                                    {Array.from({ length: totalPages }, (_, index) => index + 1).map(
                                        (num) => (
                                            <button
                                                key={num}
                                                type="button"
                                                className={num === page ? "is-active" : ""}
                                                onClick={() => goToPage(num)}
                                            >
                                                {num}
                                            </button>
                                        ),
                                    )}

                                    <button
                                        type="button"
                                        onClick={() => goToPage(page + 1)}
                                        disabled={page === totalPages}
                                        aria-label="다음 페이지"
                                    >
                                        ›
                                    </button>
                                </nav>
                            )}
                        </div>

                    </section>
                </div>
            </main>

            <Footer />
        </>
    );
}

export default RecentViewedPage;
