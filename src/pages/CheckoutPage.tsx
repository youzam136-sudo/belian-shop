import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../styles/checkout.css";

import Header from "../components/Header";
import Footer from "../components/Footer";

import productImage from "../assets/shop/product.png";

type CheckoutState = {
    productName?: string;
    optionLabel?: string;
    quantity?: number;
    price?: number;
};

function CheckoutPage() {
    const navigate = useNavigate();
    const location = useLocation();
    const state = (location.state as CheckoutState) ?? {};

    // 장바구니에서 오면 상태값이 없을 수 있으니 기본값을 채워둔다.
    const productName = state.productName ?? "스킨케어 제품";
    const optionLabel = state.optionLabel ?? "";
    const quantity = state.quantity ?? 1;
    const unitPrice = state.price ?? 4300;
    const orderAmount = unitPrice * quantity;

    const [agreeAll, setAgreeAll] = useState(false);
    const [agreeTerms, setAgreeTerms] = useState(false);
    const [agreePrivacy, setAgreePrivacy] = useState(false);
    const [agreeThirdParty, setAgreeThirdParty] = useState(false);
    const [usePoint, setUsePoint] = useState(0);
    const [completed, setCompleted] = useState(false);

    const shippingFee = 0;
    const couponDiscount = 0;
    const finalAmount = Math.max(
        0,
        orderAmount + shippingFee - couponDiscount - usePoint,
    );

    const allChecked = agreeTerms && agreePrivacy && agreeThirdParty;

    const handleAgreeAll = (checked: boolean) => {
        setAgreeAll(checked);
        setAgreeTerms(checked);
        setAgreePrivacy(checked);
        setAgreeThirdParty(checked);
    };

    const syncAgreeAll = (
        terms: boolean,
        privacy: boolean,
        thirdParty: boolean,
    ) => {
        setAgreeAll(terms && privacy && thirdParty);
    };

    const handleUsePointMax = () => {
        setUsePoint(Math.floor(orderAmount * 0.1));
    };

    const handlePay = () => {
        if (!allChecked) return;
        setCompleted(true);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    if (completed) {
        return (
            <>
                <Header />

                <main className="checkout-page">
                    <div className="checkout-container">
                        <div className="checkout-complete">
                            <h1>주문이 완료되었습니다</h1>

                            <p>
                                결제 예상 금액 {finalAmount.toLocaleString()}원으로
                                <br />
                                주문이 정상적으로 접수되었어요.
                            </p>

                            <div className="checkout-complete-actions">
                                <button
                                    type="button"
                                    onClick={() => navigate("/mypage")}
                                >
                                    주문내역 보기
                                </button>

                                <button
                                    type="button"
                                    className="is-primary"
                                    onClick={() => navigate("/")}
                                >
                                    홈으로
                                </button>
                            </div>
                        </div>
                    </div>
                </main>

                <Footer />
            </>
        );
    }

    return (
        <>
            <Header />

            <main className="checkout-page">
                <div className="checkout-container">

                    <h1>주문하기</h1>

                    {/* 주문상품 정보 */}
                    <section className="checkout-section">
                        <h2>주문상품 정보</h2>

                        <div className="checkout-order-item">
                            <div className="checkout-item-image">
                                <img src={productImage} alt={productName} />
                            </div>

                            <div className="checkout-item-info">
                                <h3>{productName}</h3>
                                {optionLabel && <span>{optionLabel}</span>}
                                <span>수량 {quantity}개</span>
                            </div>

                            <div className="checkout-item-amount">
                                {orderAmount.toLocaleString()}원
                            </div>
                        </div>

                        <div className="checkout-order-total">
                            총 주문금액 <strong>{orderAmount.toLocaleString()}원</strong>
                        </div>
                    </section>

                    {/* 주문자 정보 */}
                    <section className="checkout-section">
                        <h2>주문자 정보</h2>

                        <div className="checkout-field">
                            <span>이름</span>
                            <input type="text" defaultValue="이주희" />
                        </div>

                        <div className="checkout-field">
                            <span>휴대폰</span>
                            <input type="tel" defaultValue="010-0000-0000" />
                        </div>

                        <div className="checkout-field">
                            <span>이메일</span>
                            <input type="email" defaultValue="user@onetwo.com" />
                        </div>
                    </section>

                    {/* 배송지 정보 */}
                    <section className="checkout-section">
                        <div className="checkout-section-head">
                            <h2>배송지 정보</h2>
                            <button type="button" className="checkout-link-btn">
                                변경하기
                            </button>
                        </div>

                        <div className="checkout-field">
                            <span>수령인</span>
                            <input type="text" defaultValue="이주희" />
                        </div>

                        <div className="checkout-field">
                            <span>휴대폰</span>
                            <input type="tel" defaultValue="010-0000-0000" />
                        </div>

                        <div className="checkout-field">
                            <span>배송주소</span>
                            <input type="text" defaultValue="서울특별시 강남구 강남대로 622" />
                        </div>

                        <div className="checkout-field">
                            <span>배송메모</span>
                            <select defaultValue="문 앞에 놓아주세요.">
                                <option>문 앞에 놓아주세요.</option>
                                <option>경비실에 맡겨주세요.</option>
                                <option>부재 시 연락 부탁드려요.</option>
                            </select>
                        </div>
                    </section>

                    {/* 포인트 사용 */}
                    <section className="checkout-section">
                        <h2>포인트 사용</h2>

                        <div className="checkout-field">
                            <span>보유</span>
                            <span className="checkout-static">0원</span>
                        </div>

                        <div className="checkout-point-row">
                            <input
                                type="number"
                                min={0}
                                value={usePoint}
                                onChange={(event) =>
                                    setUsePoint(Number(event.target.value) || 0)
                                }
                            />

                            <button type="button" onClick={handleUsePointMax}>
                                전액사용
                            </button>
                        </div>

                        <p className="checkout-note">
                            최종 결제 금액의 10%까지만 사용할 수 있어요.
                        </p>
                    </section>

                    {/* 최종 결제 금액 */}
                    <section className="checkout-section">
                        <h2>최종 결제 금액</h2>

                        <div className="checkout-summary-row">
                            <span>총 상품금액</span>
                            <span>{orderAmount.toLocaleString()}원</span>
                        </div>

                        <div className="checkout-summary-row">
                            <span>총 배송비</span>
                            <span>{shippingFee.toLocaleString()}원</span>
                        </div>

                        <div className="checkout-summary-row">
                            <span>쿠폰 할인</span>
                            <span>-{couponDiscount.toLocaleString()}원</span>
                        </div>

                        <div className="checkout-summary-row">
                            <span>포인트 할인</span>
                            <span>-{usePoint.toLocaleString()}원</span>
                        </div>

                        <div className="checkout-summary-total">
                            <span>결제 예상 금액</span>
                            <strong>{finalAmount.toLocaleString()}원</strong>
                        </div>
                    </section>

                    {/* 결제수단 */}
                    <section className="checkout-section">
                        <h2>결제수단</h2>

                        <div className="checkout-payment-methods">
                            <button type="button" className="is-selected">신용/체크카드</button>
                            <button type="button">무통장 입금</button>
                            <button type="button">휴대폰 결제</button>
                            <button type="button">간편결제</button>
                        </div>
                    </section>

                    {/* 약관 동의 */}
                    <section className="checkout-section">
                        <h2>구매조건/약관 및 개인정보 이용 동의</h2>

                        <div className="checkout-agree-block">
                            <label className="checkout-checkbox is-all">
                                <input
                                    type="checkbox"
                                    checked={agreeAll}
                                    onChange={(event) =>
                                        handleAgreeAll(event.target.checked)
                                    }
                                />
                                전체 동의하기
                            </label>

                            <label className="checkout-checkbox">
                                <input
                                    type="checkbox"
                                    checked={agreeTerms}
                                    onChange={(event) => {
                                        setAgreeTerms(event.target.checked);
                                        syncAgreeAll(
                                            event.target.checked,
                                            agreePrivacy,
                                            agreeThirdParty,
                                        );
                                    }}
                                />
                                이용약관 동의 <span className="checkout-required">(필수)</span>
                            </label>

                            <label className="checkout-checkbox">
                                <input
                                    type="checkbox"
                                    checked={agreePrivacy}
                                    onChange={(event) => {
                                        setAgreePrivacy(event.target.checked);
                                        syncAgreeAll(
                                            agreeTerms,
                                            event.target.checked,
                                            agreeThirdParty,
                                        );
                                    }}
                                />
                                개인정보 수집 및 이용 동의 <span className="checkout-required">(필수)</span>
                            </label>

                            <label className="checkout-checkbox">
                                <input
                                    type="checkbox"
                                    checked={agreeThirdParty}
                                    onChange={(event) => {
                                        setAgreeThirdParty(event.target.checked);
                                        syncAgreeAll(
                                            agreeTerms,
                                            agreePrivacy,
                                            event.target.checked,
                                        );
                                    }}
                                />
                                구매조건 및 개인정보 제3자 제공 동의 <span className="checkout-required">(필수)</span>
                            </label>
                        </div>
                    </section>

                    <button
                        type="button"
                        className="checkout-pay-btn"
                        disabled={!allChecked}
                        onClick={handlePay}
                    >
                        {finalAmount.toLocaleString()}원 결제하기
                    </button>

                </div>
            </main>

            <Footer />
        </>
    );
}

export default CheckoutPage;
