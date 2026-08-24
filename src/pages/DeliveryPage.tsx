import { Link } from "react-router-dom";

import "../styles/mypage.css";
import "../styles/delivery.css";

import Header from "../components/Header";
import Footer from "../components/Footer";
import { useReveal, revealClass } from "../hooks/useReveal";

import iconOrder from "../assets/my_order.png";
import iconReview from "../assets/my_review.png";
import iconCoupon from "../assets/my_coupon.png";
import iconPoint from "../assets/my_point.png";
import iconQna from "../assets/my_qna.png";

type Delivery = {
    id: number;
    date: string;
    name: string;
    description: string;
    statusLabel: string;
    statusDate: string;
    courier: string;
    trackingNumber: string;
};

const deliveries: Delivery[] = [
    {
        id: 1,
        date: "7.7 19.41 주문",
        name: "스킨케어 제품",
        description: "손잡이 없이 깔끔하게! 터치 한번으로 간편하게!",
        statusLabel: "배송완료",
        statusDate: "08.04 (화) 09:59",
        courier: "CJ 대한통운",
        trackingNumber: "699112352465431",
    },
];

const quickMenus = [
    {
        id: 1,
        icon: iconOrder,
        title: "주문 배송",
        value: "보기",
    },
    {
        id: 2,
        icon: iconReview,
        title: "리뷰",
        value: "0",
    },
    {
        id: 3,
        icon: iconCoupon,
        title: "쿠폰",
        value: "0",
    },
    {
        id: 4,
        icon: iconPoint,
        title: "포인트",
        value: "0",
    },
    {
        id: 5,
        icon: iconQna,
        title: "문의내역",
        value: "",
    },
];

function CheckIcon() {
    return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="12" fill="#2e9e4f" />
            <path
                d="M7 12.5L10.2 15.7L17 8.5"
                stroke="#fff"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
}

function DeliveryCard({ delivery, delay }: { delivery: Delivery; delay?: 1 | 2 | 3 | 4 }) {
    const { ref, isVisible } = useReveal<HTMLElement>();

    const handleCopy = () => {
        navigator.clipboard?.writeText(delivery.trackingNumber);
    };

    return (
        <article
            ref={ref}
            className={revealClass("delivery-card", isVisible, delay)}
        >
            <div className="delivery-card-main">
                <div className="order-product-image">
                    <div className="mypage-product-placeholder" />
                </div>

                <div className="order-product-info">
                    <span className="order-date">
                        {delivery.date}
                    </span>

                    <h3>
                        {delivery.name}
                    </h3>

                    <p>
                        {delivery.description}
                    </p>

                    <button type="button" className="order-detail">
                        상세보기
                    </button>
                </div>
            </div>

            <div className="delivery-status-row">
                <div className="delivery-status-left">
                    <CheckIcon />

                    <span className="delivery-status-label">
                        {delivery.statusLabel}
                    </span>

                    <span className="delivery-status-date">
                        {delivery.statusDate}
                    </span>

                    <span className="delivery-courier">
                        {delivery.courier} {delivery.trackingNumber}
                    </span>

                    <button
                        type="button"
                        className="delivery-copy-btn"
                        onClick={handleCopy}
                    >
                        복사하기
                    </button>
                </div>

                <button type="button" className="delivery-track-btn">
                    배송조회
                </button>
            </div>
        </article>
    );
}

function DeliveryPage() {
    const { ref: sidebarRef, isVisible: sidebarVisible } = useReveal<HTMLElement>();
    const { ref: quickRef, isVisible: quickVisible } = useReveal<HTMLDivElement>();
    const { ref: listRef, isVisible: listVisible } = useReveal<HTMLDivElement>();

    return (
        <>
            <Header />

            <main className="mypage">
                <div className="mypage-container">

                    {/* PC LEFT MENU */}
                    <aside ref={sidebarRef} className={revealClass("mypage-sidebar", sidebarVisible)}>
                        <div className="mypage-sidebar-line" />

                        <nav>
                            <Link to="/mypage">
                                마이페이지
                            </Link>

                            <Link to="/mypage/refund">
                                취소/환불 내역
                            </Link>

                            <Link to="/mypage/recent">
                                최근 본 상품
                            </Link>

                            <a href="#">
                                리뷰 작성
                            </a>

                            <a href="#">
                                나의 쿠폰
                            </a>

                            <a href="#">
                                내 정보 관리
                            </a>
                        </nav>

                        <div className="mypage-sidebar-line bottom" />
                    </aside>

                    {/* CONTENT */}
                    <section className="mypage-content">

                        {/* QUICK MENU */}
                        <div ref={quickRef} className={revealClass("mypage-quick-menu", quickVisible, 1)}>
                            {quickMenus.map((menu) =>
                                menu.id === 1 ? (
                                    <Link
                                        to="/mypage/delivery"
                                        className="mypage-quick-item is-active"
                                        key={menu.id}
                                    >
                                        <span className="mypage-quick-icon">
                                            <img src={menu.icon} alt={menu.title} />
                                        </span>

                                        <strong>
                                            {menu.title}
                                        </strong>

                                        <span className="mypage-quick-value">
                                            {menu.value}
                                        </span>
                                    </Link>
                                ) : (
                                    <button
                                        type="button"
                                        className="mypage-quick-item"
                                        key={menu.id}
                                    >
                                        <span className="mypage-quick-icon">
                                            <img src={menu.icon} alt={menu.title} />
                                        </span>

                                        <strong>
                                            {menu.title}
                                        </strong>

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

                        {/* DELIVERY LIST */}
                        <div ref={listRef} className={revealClass("delivery-section", listVisible, 2)}>
                            <h2>배송 조회</h2>

                            <div className="delivery-list">
                                {deliveries.map((delivery, index) => (
                                    <DeliveryCard
                                        key={delivery.id}
                                        delivery={delivery}
                                        delay={((index % 4) + 1) as 1 | 2 | 3 | 4}
                                    />
                                ))}
                            </div>
                        </div>

                    </section>
                </div>
            </main>

            <Footer />
        </>
    );
}

export default DeliveryPage;
