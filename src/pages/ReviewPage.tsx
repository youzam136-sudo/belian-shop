import { useState } from "react";
import { Link } from "react-router-dom";

import "../styles/mypage.css";
import "../styles/review.css";

import Header from "../components/Header";
import Footer from "../components/Footer";
import { useReveal, revealClass } from "../hooks/useReveal";

import iconOrder from "../assets/my_order.png";
import iconReview from "../assets/my_review.png";
import iconCoupon from "../assets/my_coupon.png";
import iconPoint from "../assets/my_point.png";
import iconQna from "../assets/my_qna.png";

type WritableReview = {
    id: number;
    productName: string;
    description: string;
    dueDate: string;
    dday: string;
};

type WrittenReview = {
    id: number;
    productName: string;
    date: string;
    rating: number;
    tags: string[];
    content: string;
    sellerReply?: string;
};

const writableReviews: WritableReview[] = [
    {
        id: 1,
        productName: "스킨케어 제품",
        description: "손잡이 없이 깔끔하게! 터치 한번으로 간편하게!",
        dueDate: "26.10.14",
        dday: "D-51",
    },
    {
        id: 2,
        productName: "로션 제품",
        description: "촉촉하게 스며드는 데일리 로션!",
        dueDate: "26.10.22",
        dday: "D-59",
    },
];

const writtenReviews: WrittenReview[] = [
    {
        id: 1,
        productName: "스킨케어 제품",
        date: "26.08.04.",
        rating: 5,
        tags: ["용량 적당해요", "발림성 좋아요"],
        content:
            "손잡이 없이 깔끔하게 사용할 수 있어서 좋았어요! 터치 한번으로 간편하게 쓸 수 있는 점이 마음에 들어요.",
        sellerReply:
            "안녕하세요, 고객님! 소중한 후기를 남겨주셔서 감사합니다. 앞으로도 좋은 제품으로 보답하겠습니다.",
    },
];

const totalPages = 3;

const quickMenus = [
    { id: 1, icon: iconOrder, title: "주문 배송", value: "보기" },
    { id: 2, icon: iconReview, title: "리뷰", value: "0" },
    { id: 3, icon: iconCoupon, title: "쿠폰", value: "0" },
    { id: 4, icon: iconPoint, title: "포인트", value: "0" },
    { id: 5, icon: iconQna, title: "문의내역", value: "" },
];

function Stars({ rating }: { rating: number }) {
    return (
        <span className="review-stars">
            {Array.from({ length: 5 }, (_, index) => (
                <span
                    key={index}
                    className={index < rating ? "is-filled" : ""}
                >
                    ★
                </span>
            ))}
        </span>
    );
}

function Pagination({ page, onChange }: { page: number; onChange: (n: number) => void }) {
    return (
        <nav className="review-pagination">
            <button
                type="button"
                onClick={() => onChange(Math.max(1, page - 1))}
                disabled={page === 1}
                aria-label="이전 페이지"
            >
                ‹
            </button>

            {Array.from({ length: totalPages }, (_, index) => index + 1).map((num) => (
                <button
                    key={num}
                    type="button"
                    className={num === page ? "is-active" : ""}
                    onClick={() => onChange(num)}
                >
                    {num}
                </button>
            ))}

            <button
                type="button"
                onClick={() => onChange(Math.min(totalPages, page + 1))}
                disabled={page === totalPages}
                aria-label="다음 페이지"
            >
                ›
            </button>
        </nav>
    );
}

function ReviewPage() {
    const { ref: sidebarRef, isVisible: sidebarVisible } = useReveal<HTMLElement>();
    const { ref: quickRef, isVisible: quickVisible } = useReveal<HTMLDivElement>();
    const { ref: contentRef, isVisible: contentVisible } = useReveal<HTMLDivElement>();

    const [tab, setTab] = useState<"writable" | "written">("writable");
    const [writablePage, setWritablePage] = useState(1);
    const [writtenPage, setWrittenPage] = useState(1);

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
                            <Link to="/mypage/recent">최근 본 상품</Link>
                            <Link to="/mypage/review" className="active">리뷰 작성</Link>
                            <a href="#">나의 쿠폰</a>
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

                        {/* REVIEW SECTION */}
                        <div ref={contentRef} className={revealClass("review-section", contentVisible, 2)}>

                            {/* TAB */}
                            <div className="review-tabs">
                                <button
                                    type="button"
                                    className={tab === "writable" ? "is-active" : ""}
                                    onClick={() => setTab("writable")}
                                >
                                    작성 가능한 리뷰
                                </button>

                                <button
                                    type="button"
                                    className={tab === "written" ? "is-active" : ""}
                                    onClick={() => setTab("written")}
                                >
                                    내가 작성한 리뷰
                                </button>
                            </div>

                            {/* 작성 가능한 리뷰 */}
                            {tab === "writable" && (
                                <>
                                    <div className="review-benefit-banner">
                                        리뷰 작성하고 최대 100원의 혜택을 받아가세요
                                    </div>

                                    <div className="review-writable-list">
                                        {writableReviews.map((item) => (
                                            <div className="review-writable-card" key={item.id}>
                                                <div className="review-writable-main">
                                                    <div className="order-product-image">
                                                        <div className="mypage-product-placeholder" />
                                                    </div>

                                                    <div className="review-writable-info">
                                                        <h3>{item.productName}</h3>
                                                        <p>{item.description}</p>

                                                        <span className="review-due">
                                                            작성기한 {item.dueDate} ({item.dday})
                                                        </span>
                                                    </div>
                                                </div>

                                                <button type="button" className="review-write-btn">
                                                    리뷰 쓰고 혜택 받기
                                                </button>
                                            </div>
                                        ))}
                                    </div>

                                    <Pagination page={writablePage} onChange={setWritablePage} />
                                </>
                            )}

                            {/* 내가 작성한 리뷰 */}
                            {tab === "written" && (
                                <>
                                    <div className="review-written-list">
                                        {writtenReviews.map((item) => (
                                            <div className="review-written-card" key={item.id}>
                                                <div className="review-written-head">
                                                    <div className="order-product-image">
                                                        <div className="mypage-product-placeholder" />
                                                    </div>

                                                    <div className="review-written-info">
                                                        <h3>{item.productName}</h3>
                                                        <span className="review-date">{item.date}</span>
                                                    </div>

                                                    <button type="button" className="review-edit-btn">
                                                        수정
                                                    </button>
                                                </div>

                                                <div className="review-written-rating">
                                                    <Stars rating={item.rating} />

                                                    <div className="review-tags">
                                                        {item.tags.map((tag) => (
                                                            <span key={tag}>{tag}</span>
                                                        ))}
                                                    </div>
                                                </div>

                                                <p className="review-written-content">
                                                    {item.content}
                                                </p>

                                                {item.sellerReply && (
                                                    <div className="review-seller-reply">
                                                        <span className="review-seller-label">
                                                            판매자
                                                        </span>

                                                        <p>{item.sellerReply}</p>
                                                    </div>
                                                )}
                                            </div>
                                        ))}
                                    </div>

                                    <Pagination page={writtenPage} onChange={setWrittenPage} />
                                </>
                            )}

                        </div>

                    </section>
                </div>
            </main>

            <Footer />
        </>
    );
}

export default ReviewPage;
