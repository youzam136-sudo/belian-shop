import { useState } from "react";
import { Link } from "react-router-dom";

import "../styles/mypage.css";
import "../styles/coupon.css";

import Header from "../components/Header";
import Footer from "../components/Footer";
import { useReveal, revealClass } from "../hooks/useReveal";

import iconOrder from "../assets/my_order.png";
import iconReview from "../assets/my_review.png";
import iconCoupon from "../assets/my_coupon.png";
import iconPoint from "../assets/my_point.png";
import iconQna from "../assets/my_qna.png";

type HeldCoupon = {
    id: number;
    percent: number;
    title: string;
    description: string;
    condition: string;
    expiry: string;
};

type AvailableCoupon = {
    id: number;
    percent: number;
    title: string;
    description: string;
    condition: string;
    dateRange: string;
};

const heldCoupons: HeldCoupon[] = [
    {
        id: 1,
        percent: 35,
        title: "ONETWO 전 상품 35% 보너스 쿠폰",
        description: "ONETWO 전 상품에 사용 가능합니다.",
        condition: "40,000원 이상 구매 시 최대 30,000원 할인",
        expiry: "2026-08-31 23:59까지",
    },
];

const availableCoupons: AvailableCoupon[] = [
    {
        id: 1,
        percent: 30,
        title: "신규 회원 깜짝 30% 쿠폰",
        description: "스킨케어 세트 상품에 사용 가능한 30% 쿠폰입니다.",
        condition: "1원 이상 구매 시 최대 50,000원 할인",
        dateRange: "사용 기간: 2026-08-20 ~ 2026-08-28",
    },
    {
        id: 2,
        percent: 30,
        title: "스페셜 상품 30% 쿠폰",
        description: "일부 스페셜 상품에 적용 가능한 쿠폰이에요 (일부 상품 제외).",
        condition: "10,000원 이상 구매 시 최대 30,000원 할인",
        dateRange: "사용 기간: 2026-07-16 ~ 2026-08-31",
    },
    {
        id: 3,
        percent: 30,
        title: "뉴시즌 키워드 개강룩 30% 쿠폰",
        description: "뉴시즌 참여 상품에 사용 가능한 30% 쿠폰입니다. 일부 상품은 제외될 수 있습니다.",
        condition: "20,000원 이상 구매 시 최대 50,000원 할인",
        dateRange: "사용 기간: 2026-08-24 ~ 2026-08-25",
    },
];

const quickMenus = [
    { id: 1, icon: iconOrder, title: "주문 배송", value: "보기" },
    { id: 2, icon: iconReview, title: "리뷰", value: "0" },
    { id: 3, icon: iconCoupon, title: "쿠폰", value: "0" },
    { id: 4, icon: iconPoint, title: "포인트", value: "0" },
    { id: 5, icon: iconQna, title: "문의내역", value: "" },
];

function DownloadIcon() {
    return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="7 10 12 15 17 10" />
            <line x1="12" y1="15" x2="12" y2="3" />
        </svg>
    );
}

function CouponPage() {
    const { ref: sidebarRef, isVisible: sidebarVisible } = useReveal<HTMLElement>();
    const { ref: quickRef, isVisible: quickVisible } = useReveal<HTMLDivElement>();
    const { ref: contentRef, isVisible: contentVisible } = useReveal<HTMLDivElement>();

    const [drawerOpen, setDrawerOpen] = useState(false);
    const [downloaded, setDownloaded] = useState<number[]>([]);

    const handleDownload = (id: number) => {
        setDownloaded((prev) => (prev.includes(id) ? prev : [...prev, id]));
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
                            <Link to="/mypage/recent">최근 본 상품</Link>
                            <Link to="/mypage/review">리뷰 작성</Link>
                            <Link to="/mypage/coupon" className="active">나의 쿠폰</Link>
                            <a href="#">내 정보 관리</a>
                        </nav>

                        <div className="mypage-sidebar-line bottom" />
                    </aside>

                    {/* CONTENT */}
                    <section className="mypage-content">

                        {/* QUICK MENU */}
                        <div ref={quickRef} className={revealClass("mypage-quick-menu", quickVisible, 1)}>
                            {quickMenus.map((menu) => (
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
                            ))}
                        </div>

                        {/* COUPON SECTION */}
                        <div ref={contentRef} className={revealClass("coupon-section", contentVisible, 2)}>
                            <h2>나의 쿠폰</h2>

                            {/* BENEFIT BANNER */}
                            <div className="coupon-hero-banner">
                                <div className="coupon-hero-text">
                                    <h3>첫 구매 20% 할인 받기</h3>
                                    <p>ONETWO 신규 혜택을 확인해보세요</p>
                                </div>

                                <div className="coupon-hero-amount">
                                    <span>20%</span>
                                    <small>ONETWO</small>
                                </div>
                            </div>

                            {/* TOOLBAR */}
                            <div className="coupon-toolbar">
                                <span className="coupon-sort">할인율 높은순 ▾</span>

                                <button type="button" className="coupon-register-btn">
                                    + 쿠폰 등록
                                </button>
                            </div>

                            {/* HELD COUPONS */}
                            {heldCoupons.length > 0 ? (
                                <div className="coupon-list">
                                    {heldCoupons.map((coupon) => (
                                        <div className="coupon-card" key={coupon.id}>
                                            <span className="coupon-percent">
                                                {coupon.percent}%
                                            </span>

                                            <h4>{coupon.title}</h4>
                                            <p>{coupon.description}</p>

                                            <span className="coupon-condition">
                                                {coupon.condition}
                                            </span>

                                            <span className="coupon-expiry">
                                                {coupon.expiry}
                                            </span>

                                            <button type="button" className="coupon-apply-btn">
                                                적용 상품 보기
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="coupon-empty">
                                    보유하신 쿠폰이 없습니다.
                                </div>
                            )}

                            <button
                                type="button"
                                className="coupon-more-btn"
                                onClick={() => setDrawerOpen(true)}
                            >
                                받을 수 있는 쿠폰 보기
                            </button>
                        </div>

                    </section>
                </div>
            </main>

            <Footer />

            {/* ===== 오른쪽에서 나오는 "받을 수 있는 쿠폰" 패널 ===== */}
            <div
                className={`coupon-drawer-overlay${drawerOpen ? " is-open" : ""}`}
                onClick={() => setDrawerOpen(false)}
            />

            <aside className={`coupon-drawer${drawerOpen ? " is-open" : ""}`}>
                <div className="coupon-drawer-head">
                    <h3>받을 수 있는 쿠폰</h3>

                    <button
                        type="button"
                        className="coupon-drawer-close"
                        onClick={() => setDrawerOpen(false)}
                        aria-label="닫기"
                    >
                        ×
                    </button>
                </div>

                <div className="coupon-drawer-filters">
                    <button type="button" className="is-active">할인율 높은순</button>
                    <button type="button">최소 주문금액 낮은순</button>
                </div>

                <div className="coupon-drawer-list">
                    {availableCoupons.map((coupon) => {
                        const isDownloaded = downloaded.includes(coupon.id);

                        return (
                            <div className="coupon-drawer-card" key={coupon.id}>
                                <div className="coupon-drawer-card-body">
                                    <span className="coupon-drawer-percent">
                                        {coupon.percent}%
                                    </span>

                                    <h4>{coupon.title}</h4>
                                    <p>{coupon.description}</p>

                                    <span className="coupon-condition">
                                        {coupon.condition}
                                    </span>

                                    <span className="coupon-expiry">
                                        {coupon.dateRange}
                                    </span>
                                </div>

                                <button
                                    type="button"
                                    className={`coupon-download-btn${isDownloaded ? " is-downloaded" : ""}`}
                                    onClick={() => handleDownload(coupon.id)}
                                    disabled={isDownloaded}
                                    aria-label="쿠폰 받기"
                                >
                                    <DownloadIcon />
                                </button>
                            </div>
                        );
                    })}
                </div>
            </aside>
        </>
    );
}

export default CouponPage;
