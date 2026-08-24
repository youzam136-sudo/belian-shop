import { useState } from "react";
import { Link } from "react-router-dom";

import "../styles/mypage.css";
import "../styles/refund.css";

import Header from "../components/Header";
import Footer from "../components/Footer";
import { useReveal, revealClass } from "../hooks/useReveal";

import iconOrder from "../assets/my_order.png";
import iconReview from "../assets/my_review.png";
import iconCoupon from "../assets/my_coupon.png";
import iconPoint from "../assets/my_point.png";
import iconQna from "../assets/my_qna.png";

type Order = {
    id: number;
    date: string;
    name: string;
    description: string;
    status: string;
    image?: string;
};

type SubOrder = {
    name: string;
    description: string;
};

const orders: Order[] = [
    {
        id: 1,
        date: "7.7 19.41 주문",
        name: "스킨케어 제품",
        description: "손잡이 없이 깔끔하게! 터치 한번으로 간편하게!",
        status: "배송확인",
    },
    {
        id: 2,
        date: "7.7 19.41 주문",
        name: "스킨케어 제품",
        description: "손잡이 없이 깔끔하게! 터치 한번으로 간편하게!",
        status: "배송확인",
    },
    {
        id: 3,
        date: "7.7 19.41 주문",
        name: "스킨케어 제품",
        description: "손잡이 없이 깔끔하게! 터치 한번으로 간편하게!",
        status: "배송확인",
    },
];

// 펼쳐보기를 누르면 카드 안에 추가로 보여줄 나머지 주문 상품들
const subOrders: SubOrder[] = [
    {
        name: "스킨케어 제품",
        description: "피부에 촉촉한 수분감을 채워주는 제품",
    },
    {
        name: "스킨케어 제품",
        description: "매일 부담 없이 사용할 수 있는 데일리 케어",
    },
];

type RefundStatus = "완료" | "처리중" | "거절";

type RefundItem = {
    id: number;
    date: string;
    name: string;
    description: string;
    type: "취소" | "환불";
    status: RefundStatus;
    amount: number;
    reason: string;
};

// 마이페이지 메인에는 최근 취소/환불 내역 일부만 미리보기로 보여준다.
const recentRefunds: RefundItem[] = [
    {
        id: 1,
        date: "7.7 19.41 주문",
        name: "스킨케어 제품",
        description: "손잡이 없이 깔끔하게! 터치 한번으로 간편하게!",
        type: "환불",
        status: "완료",
        amount: 4300,
        reason: "단순 변심",
    },
    {
        id: 2,
        date: "7.5 11.20 주문",
        name: "스킨케어 제품",
        description: "손잡이 없이 깔끔하게! 터치 한번으로 간편하게!",
        type: "취소",
        status: "처리중",
        amount: 4300,
        reason: "배송 지연",
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

function OrderCard({ order, delay }: { order: Order; delay?: 1 | 2 | 3 | 4 }) {
    const { ref, isVisible } = useReveal<HTMLElement>();
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <article
            ref={ref}
            className={revealClass("order-card", isVisible, delay)}
        >
            <div className="order-card-main">

                <div className="order-product-image">
                    <div className="mypage-product-placeholder" />
                </div>

                <div className="order-product-info">
                    <span className="order-date">
                        {order.date}
                    </span>

                    <h3>
                        {order.name}
                    </h3>

                    <p>
                        {order.description}
                    </p>

                    <button
                        type="button"
                        className="order-detail"
                    >
                        상세보기
                    </button>
                </div>

                <button
                    type="button"
                    className="order-status"
                >
                    {order.status}
                </button>
            </div>

            {isExpanded && (
                <div className="order-sub-list">
                    {subOrders.map((sub, index) => (
                        <div className="order-sub-item" key={index}>
                            <div className="order-product-image">
                                <div className="mypage-product-placeholder" />
                            </div>

                            <div className="order-product-info">
                                <h4>
                                    {sub.name}
                                </h4>

                                <p>
                                    {sub.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            <button
                type="button"
                className="order-more"
                onClick={() => setIsExpanded((prev) => !prev)}
            >
                {isExpanded ? "접기" : "총 3건 주문 펼쳐보기"}
            </button>
        </article>
    );
}

function RefundPreviewCard({ item, delay }: { item: RefundItem; delay?: 1 | 2 | 3 | 4 }) {
    const { ref, isVisible } = useReveal<HTMLElement>();

    return (
        <article
            ref={ref}
            className={revealClass("refund-card", isVisible, delay)}
        >
            <div className="refund-card-main">
                <div className="order-product-image">
                    <div className="mypage-product-placeholder" />
                </div>

                <div className="order-product-info">
                    <span className="order-date">
                        {item.date}
                    </span>

                    <h3>
                        {item.name}
                    </h3>

                    <p>
                        {item.description}
                    </p>
                </div>

                <span className={`refund-status refund-status-${item.status}`}>
                    {item.type} {item.status}
                </span>
            </div>
        </article>
    );
}

function MyPage() {
    const { ref: sidebarRef, isVisible: sidebarVisible } = useReveal<HTMLElement>();
    const { ref: quickRef, isVisible: quickVisible } = useReveal<HTMLDivElement>();
    const { ref: historyRef, isVisible: historyVisible } = useReveal<HTMLDivElement>();
    const { ref: refundRef, isVisible: refundVisible } = useReveal<HTMLDivElement>();

    return (
        <>
            <Header />

            <main className="mypage">
                <div className="mypage-container">

                    {/* PC LEFT MENU */}
                    <aside ref={sidebarRef} className={revealClass("mypage-sidebar", sidebarVisible)}>
                        <div className="mypage-sidebar-line" />

                        <nav>
                            <a href="#" className="active">
                                마이페이지
                            </a>

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
                                        className="mypage-quick-item"
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

                        {/* ORDER HISTORY */}
                        <div ref={historyRef} className={revealClass("order-history", historyVisible, 2)}>
                            <h2>최근 주문 내역</h2>

                            <div className="order-list">
                                {orders.map((order, index) => (
                                    <OrderCard
                                        key={order.id}
                                        order={order}
                                        delay={((index % 4) + 1) as 1 | 2 | 3 | 4}
                                    />
                                ))}
                            </div>
                        </div>

                        {/* 취소/환불 내역 미리보기 */}
                        <div ref={refundRef} className={revealClass("refund-section", refundVisible, 3)}>
                            <div className="refund-section-head">
                                <h2>취소/환불 내역</h2>

                                <Link to="/mypage/refund" className="refund-section-more">
                                    전체보기
                                </Link>
                            </div>

                            <div className="refund-list">
                                {recentRefunds.map((item, index) => (
                                    <RefundPreviewCard
                                        key={item.id}
                                        item={item}
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

export default MyPage;
