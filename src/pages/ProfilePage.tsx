import { useState } from "react";
import { Link } from "react-router-dom";

import "../styles/mypage.css";
import "../styles/profile.css";

import Header from "../components/Header";
import Footer from "../components/Footer";
import { useReveal, revealClass } from "../hooks/useReveal";

import iconOrder from "../assets/my_order.png";
import iconReview from "../assets/my_review.png";
import iconCoupon from "../assets/my_coupon.png";
import iconPoint from "../assets/my_point.png";
import iconQna from "../assets/my_qna.png";

const quickMenus = [
    { id: 1, icon: iconOrder, title: "주문 배송", value: "보기" },
    { id: 2, icon: iconReview, title: "리뷰", value: "0" },
    { id: 3, icon: iconCoupon, title: "쿠폰", value: "0" },
    { id: 4, icon: iconPoint, title: "포인트", value: "0" },
    { id: 5, icon: iconQna, title: "문의내역", value: "" },
];

function ProfilePage() {
    const { ref: sidebarRef, isVisible: sidebarVisible } = useReveal<HTMLElement>();
    const { ref: quickRef, isVisible: quickVisible } = useReveal<HTMLDivElement>();
    const { ref: contentRef, isVisible: contentVisible } = useReveal<HTMLDivElement>();

    const [saved, setSaved] = useState(false);

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        setSaved(true);

        window.setTimeout(() => setSaved(false), 2500);
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
                            <Link to="/mypage/coupon">나의 쿠폰</Link>
                            <Link to="/mypage/profile" className="active">내 정보 관리</Link>
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

                        {/* PROFILE FORM */}
                        <div ref={contentRef} className={revealClass("profile-section", contentVisible, 2)}>
                            <h2>내 정보 관리</h2>

                            <form className="profile-form" onSubmit={handleSubmit}>
                                <div className="profile-field-group">
                                    <h3>기본 정보</h3>

                                    <div className="profile-field">
                                        <label htmlFor="profile-name">이름</label>
                                        <input id="profile-name" type="text" defaultValue="이주희" />
                                    </div>

                                    <div className="profile-field">
                                        <label htmlFor="profile-id">아이디</label>
                                        <input id="profile-id" type="text" defaultValue="onetwo_user" disabled />
                                    </div>

                                    <div className="profile-field">
                                        <label htmlFor="profile-email">이메일</label>
                                        <input id="profile-email" type="email" defaultValue="user@onetwo.com" />
                                    </div>

                                    <div className="profile-field">
                                        <label htmlFor="profile-phone">휴대폰</label>
                                        <input id="profile-phone" type="tel" defaultValue="010-0000-0000" />
                                    </div>
                                </div>

                                <div className="profile-field-group">
                                    <h3>비밀번호 변경</h3>

                                    <div className="profile-field">
                                        <label htmlFor="profile-current-pw">현재 비밀번호</label>
                                        <input id="profile-current-pw" type="password" placeholder="현재 비밀번호" />
                                    </div>

                                    <div className="profile-field">
                                        <label htmlFor="profile-new-pw">새 비밀번호</label>
                                        <input id="profile-new-pw" type="password" placeholder="새 비밀번호" />
                                    </div>

                                    <div className="profile-field">
                                        <label htmlFor="profile-new-pw-confirm">새 비밀번호 확인</label>
                                        <input id="profile-new-pw-confirm" type="password" placeholder="새 비밀번호 확인" />
                                    </div>
                                </div>

                                <button type="submit" className="profile-save-btn">
                                    저장하기
                                </button>

                                {saved && (
                                    <p className="profile-saved-message">
                                        변경사항이 저장되었어요.
                                    </p>
                                )}
                            </form>

                            <div className="profile-danger-zone">
                                <span>더 이상 ONETWO를 이용하지 않으시나요?</span>
                                <button type="button">회원 탈퇴</button>
                            </div>
                        </div>

                    </section>
                </div>
            </main>

            <Footer />
        </>
    );
}

export default ProfilePage;
