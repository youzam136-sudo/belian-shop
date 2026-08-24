import { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/auth.css";

import Header from "../components/Header";
import Footer from "../components/Footer";

function SignupPage() {
    const [agreeAll, setAgreeAll] = useState(false);
    const [agreePrivacy, setAgreePrivacy] = useState(false);
    const [agreeThirdParty, setAgreeThirdParty] = useState(false);

    const handleAgreeAll = (checked: boolean) => {
        setAgreeAll(checked);
        setAgreePrivacy(checked);
        setAgreeThirdParty(checked);
    };

    const syncAgreeAll = (privacy: boolean, thirdParty: boolean) => {
        setAgreeAll(privacy && thirdParty);
    };

    return (
        <>
            <Header />

            <main className="auth-page">
                <div className="auth-container">

                    <h1>회원가입</h1>

                    <p className="auth-sub">
                        오직 공식몰 회원만을 위한 평생 혜택!
                        <br />
                        지금 가입하시면 바로 누릴 수 있습니다.
                    </p>

                    <form
                        className="auth-form"
                        onSubmit={(event) => event.preventDefault()}
                    >
                        <input
                            type="text"
                            placeholder="아이디"
                            autoComplete="username"
                        />

                        <input
                            type="password"
                            placeholder="비밀번호"
                            autoComplete="new-password"
                        />

                        <input
                            type="password"
                            placeholder="비밀번호 확인"
                            autoComplete="new-password"
                        />

                        <input
                            type="email"
                            placeholder="이메일"
                            autoComplete="email"
                        />

                        <div className="auth-phone-block">
                            <span className="auth-phone-label">
                                휴대폰 인증
                                <span className="auth-required">*</span>
                                <span className="auth-phone-note">
                                    -를 빼고 입력해주세요.
                                </span>
                            </span>

                            <input
                                type="tel"
                                defaultValue="+82"
                            />

                            <div className="auth-phone-verify">
                                <input
                                    type="text"
                                    placeholder="인증번호를 입력해주세요."
                                />

                                <button type="button">
                                    인증하기
                                </button>
                            </div>
                        </div>

                        <div className="auth-agree-block">
                            <label className="auth-checkbox is-all">
                                <input
                                    type="checkbox"
                                    checked={agreeAll}
                                    onChange={(event) =>
                                        handleAgreeAll(event.target.checked)
                                    }
                                />
                                아래 약관에 모두 동의합니다.
                            </label>

                            <label className="auth-checkbox">
                                <input
                                    type="checkbox"
                                    checked={agreePrivacy}
                                    onChange={(event) => {
                                        setAgreePrivacy(event.target.checked);
                                        syncAgreeAll(
                                            event.target.checked,
                                            agreeThirdParty,
                                        );
                                    }}
                                />
                                <span className="auth-required">(필수)</span> 개인정보 처리방침에 동의
                            </label>

                            <label className="auth-checkbox">
                                <input
                                    type="checkbox"
                                    checked={agreeThirdParty}
                                    onChange={(event) => {
                                        setAgreeThirdParty(event.target.checked);
                                        syncAgreeAll(
                                            agreePrivacy,
                                            event.target.checked,
                                        );
                                    }}
                                />
                                <span className="auth-required">(필수)</span> 개인정보 제2자 제공에 동의
                            </label>
                        </div>

                        <button type="submit" className="auth-submit">
                            회원가입
                        </button>
                    </form>

                    <div className="auth-links">
                        <span>이미 계정이 있으신가요?</span>
                        <span className="auth-links-divider">|</span>
                        <Link to="/login">로그인</Link>
                    </div>

                </div>
            </main>

            <Footer />
        </>
    );
}

export default SignupPage;
