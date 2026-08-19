import { useState } from "react";
import { useParams } from "react-router-dom";
import "../styles/product-detail.css";

import Header from "../components/Header";
import Footer from "../components/Footer";

import productImage from "../assets/shop/product.png";
import { products, getProductSizes } from "../data/shopProducts";

const tabs = [
    { id: "info", label: "상품상세정보" },
    { id: "guide", label: "상품구매안내" },
    { id: "review", label: "상품사용후기", count: 0 },
    { id: "qna", label: "상품Q&A", count: 0 },
];

function CartIcon() {
    return (
        <svg
            width="18"
            height="18"
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

function ProductDetailPage() {
    const { productId } = useParams<{ productId: string }>();
    const product = products.find(
        (item) => item.id === Number(productId),
    );

    const sizes = product ? getProductSizes(product) : [];

    // 상품 이미지 목록 (지금은 같은 사진을 재사용하지만,
    // 나중에 상품별 사진을 여러 장 추가하면 여기 배열만 바꾸면 된다)
    const images = [productImage, productImage];

    const [activeImage, setActiveImage] = useState(0);

    // 기본은 두번째 옵션(115ml)이 선택된 상태로 시작한다.
    const [sizeIndex, setSizeIndex] = useState(
        sizes.length > 1 ? 1 : 0,
    );
    const [quantity, setQuantity] = useState(1);
    const [activeTab, setActiveTab] = useState(tabs[0].id);

    if (!product) {
        return (
            <>
                <Header />
                <main className="product-detail-page">
                    <div className="product-detail-notfound">
                        상품을 찾을 수 없습니다.
                    </div>
                </main>
                <Footer />
            </>
        );
    }

    const selectedSize = sizes[sizeIndex];
    const totalPrice = selectedSize.price * quantity;

    return (
        <>
            <Header />

            <main className="product-detail-page">
                <div className="product-detail-container">

                    {/* IMAGES */}
                    <div className="product-detail-gallery">
                        <div className="product-detail-main-image">
                            <img src={images[activeImage]} alt={product.name} />
                        </div>

                        <div className="product-detail-thumbs">
                            {images.map((image, index) => (
                                <button
                                    key={index}
                                    type="button"
                                    className={
                                        index === activeImage ? "is-active" : ""
                                    }
                                    onClick={() => setActiveImage(index)}
                                >
                                    <img src={image} alt="" />
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* INFO */}
                    <div className="product-detail-info">
                        <h1>{product.name}</h1>

                        <p className="product-detail-desc">
                            {product.description}
                        </p>

                        <div className="product-detail-price">
                            {product.originalPrice && (
                                <span className="product-detail-price-original">
                                    {product.originalPrice.toLocaleString()}원
                                </span>
                            )}

                            <span className="product-detail-price-sale">
                                {selectedSize.price.toLocaleString()}원
                            </span>
                        </div>

                        <p className="product-detail-selected">
                            Selected 사이즈: {selectedSize.label} -{" "}
                            {selectedSize.price.toLocaleString()}원
                        </p>

                        <div className="product-detail-sizes">
                            {sizes.map((size, index) => (
                                <button
                                    key={size.label}
                                    type="button"
                                    className={
                                        index === sizeIndex ? "is-active" : ""
                                    }
                                    onClick={() => setSizeIndex(index)}
                                >
                                    {size.label}
                                </button>
                            ))}
                        </div>

                        <div className="product-detail-divider" />

                        <div className="product-detail-qty-row">
                            <div className="product-detail-qty">
                                <button
                                    type="button"
                                    onClick={() =>
                                        setQuantity((prev) =>
                                            Math.max(1, prev - 1),
                                        )
                                    }
                                    aria-label="수량 감소"
                                >
                                    -
                                </button>

                                <span>수량 {quantity}</span>

                                <button
                                    type="button"
                                    onClick={() =>
                                        setQuantity((prev) => prev + 1)
                                    }
                                    aria-label="수량 증가"
                                >
                                    +
                                </button>
                            </div>

                            <span className="product-detail-total">
                                {totalPrice.toLocaleString()}원
                            </span>
                        </div>

                        <div className="product-detail-actions">
                            <button type="button" className="product-detail-cart-btn">
                                <CartIcon />
                                장바구니
                            </button>

                            <button type="button" className="product-detail-buy-btn">
                                바로구매
                            </button>
                        </div>
                    </div>
                </div>

                {/* TABS */}
                <div className="product-detail-tabs">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            type="button"
                            className={
                                activeTab === tab.id ? "is-active" : ""
                            }
                            onClick={() => setActiveTab(tab.id)}
                        >
                            {tab.label}
                            {typeof tab.count === "number" && (
                                <span className="product-detail-tab-count">
                                    {tab.count}
                                </span>
                            )}
                        </button>
                    ))}
                </div>

                <div className="product-detail-body">
                    상세페이지 영역
                </div>

            </main>

            <Footer />
        </>
    );
}

export default ProductDetailPage;
