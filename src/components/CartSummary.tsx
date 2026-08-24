import { useNavigate } from "react-router-dom";
import { useReveal, revealClass } from "../hooks/useReveal";

function CartSummary() {
    const { ref, isVisible } = useReveal<HTMLElement>();
    const navigate = useNavigate();

    return (
        <aside ref={ref} className={revealClass("cart-summary", isVisible)}>
            <section className="delivery-section">
                <div className="cart-summary-title">
                    <span className="location-icon">⌖</span>
                    <h3>배송지</h3>
                </div>

                <div className="delivery-input-row">
                    <span>배송지를 입력해주세요</span>

                    <button type="button">
                        추가
                    </button>
                </div>
            </section>

            <div className="summary-divider" />

            <section className="payment-summary">
                <h3>결제금액</h3>

                <div className="payment-row">
                    <span>상품금액</span>
                    <strong>9,900원</strong>
                </div>

                <div className="payment-row discount">
                    <span>상품 할인 금액</span>
                    <strong>-1,000원</strong>
                </div>

                <div className="payment-row">
                    <span>배송비</span>
                    <strong>0원</strong>
                </div>
            </section>

            <div className="summary-divider" />

            <div className="payment-total">
                <span>총 결제 금액</span>
                <strong>11,200원</strong>
            </div>

            <button
                className="checkout-button"
                type="button"
                onClick={() => navigate("/checkout")}
            >
                결제하기
            </button>
        </aside>
    );
}

export default CartSummary;
