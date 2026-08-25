import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { useReveal, revealClass } from "../hooks/useReveal";

import eventImg1 from "../assets/event-1.jpg";
import eventImg2 from "../assets/event-2.jpg";
import eventImg3 from "../assets/event-3.jpg";

const slideImages = [eventImg1, eventImg2, eventImg3];

function MembershipSection() {
    const { ref: leftRef, isVisible: leftVisible } = useReveal<HTMLDivElement>();
    const { ref: rightRef, isVisible: rightVisible } = useReveal<HTMLDivElement>();

    const [activeIndex, setActiveIndex] = useState(0);

    // 이벤트 게시판에 쓴 상품 사진 3장을 그대로 가져와 자동으로 넘어가는
    // 배경 캐러셀로 사용한다.
    useEffect(() => {
        const timer = window.setInterval(() => {
            setActiveIndex((prev) => (prev + 1) % slideImages.length);
        }, 4000);

        return () => window.clearInterval(timer);
    }, []);

    return (
        <section className="membership-section">
            <div ref={leftRef} className={revealClass("membership-left", leftVisible)}>
                <span className="membership-badge">MEMBERSHIP</span>

                <h2>
                    매일 더욱 커지는 혜택
                    <br />
                    지금 바로 만나보세요.
                </h2>

                <p>신규 회원을 위한 다양한 혜택을 준비했습니다.</p>

                <Link to="/signup" className="membership-signup-btn">
                    회원가입하기
                </Link>
            </div>

            <div
                ref={rightRef}
                className={revealClass("membership-right", rightVisible, 1)}
            >
                {slideImages.map((image, index) => (
                    <div
                        key={image}
                        className={`membership-slide${index === activeIndex ? " is-active" : ""}`}
                        style={{ backgroundImage: `url(${image})` }}
                    />
                ))}

                <div className="membership-overlay-card">
                    <span className="membership-overlay-badge">1st</span>

                    <p>웰컴 혜택</p>
                    <strong>첫 구매 시 최대 20% 할인</strong>
                </div>

                <div className="membership-dots">
                    {slideImages.map((image, index) => (
                        <button
                            key={image}
                            type="button"
                            className={index === activeIndex ? "is-active" : ""}
                            onClick={() => setActiveIndex(index)}
                            aria-label={`${index + 1}번째 이미지`}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}

export default MembershipSection;
