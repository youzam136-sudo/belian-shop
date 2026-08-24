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

const refunds: RefundItem[] = [
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

function RefundCard({ item, delay }: { item: RefundItem; delay?: 1 | 2 | 3 | 4 }) {
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

                    <button type="button" className="order-detail">
                        상세보기
                    </button>
                </div>

                <span className={`refund-status refund-status-${item.status}`}>
                    {item.type} {item.status}
                </span>
            </div>

            <div className="refund-info-row">
                <span className="refund-reason">
                    사유: {item.reason}
                </span>

                <span className="refund-amount">
                    {item.type} 금액 {item.amount.toLocaleString()}원
                </span>
            </div>
        </article>
    );
}

function RefundPage() {
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

                            <Link to="/mypage/refund" className="active">
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

                        {/* REFUND LIST */}
                        <div ref={listRef} className={revealClass("refund-section", listVisible, 2)}>
                            <h2>취소/환불 내역</h2>

                            {refunds.length > 0 ? (
                                <div className="refund-list">
                                    {refunds.map((item, index) => (
                                        <RefundCard
                                            key={item.id}
                                            item={item}
                                            delay={((index % 4) + 1) as 1 | 2 | 3 | 4}
                                        />
                                    ))}
                                </div>
                            ) : (
                                <div className="refund-empty">
                                    취소/환불 내역이 없습니다.
                                </div>
                            )}
                        </div>

                    </section>
                </div>
            </main>

            <Footer />
        </>
    );
}

export default RefundPage;
