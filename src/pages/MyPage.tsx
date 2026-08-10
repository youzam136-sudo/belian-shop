import "../styles/mypage.css";

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

            <button
                type="button"
                className="order-more"
            >
                총 3건 주문 펼쳐보기
            </button>
        </article>
    );
}

function MyPage() {
    const { ref: sidebarRef, isVisible: sidebarVisible } = useReveal<HTMLElement>();
    const { ref: quickRef, isVisible: quickVisible } = useReveal<HTMLDivElement>();
    const { ref: historyRef, isVisible: historyVisible } = useReveal<HTMLDivElement>();

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

                            <a href="#">
                                쇼핑정보
                            </a>

                            <a href="#">
                                최근 본 상품
                            </a>

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
                            {quickMenus.map((menu) => (
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
                            ))}
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

                    </section>
                </div>
            </main>

            <Footer />
        </>
    );
}

export default MyPage;
