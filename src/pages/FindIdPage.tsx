import { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/auth.css";

import Header from "../components/Header";
import Footer from "../components/Footer";

function FindIdPage() {
    const [submitted, setSubmitted] = useState(false);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        setSubmitted(true);
    };

    return (
        <>
            <Header />

            <main className="auth-page">
                <div className="auth-container">

                    <h1>아이디 찾기</h1>

                    <p className="auth-sub">
                        가입 시 등록하신 이름과 이메일로
                        <br />
                        아이디를 찾아드립니다.
                    </p>

                    {!submitted ? (
                        <form className="auth-form" onSubmit={handleSubmit}>
                            <input
                                type="text"
                                placeholder="이름"
                                value={name}
                                onChange={(event) => setName(event.target.value)}
                                autoComplete="name"
                            />

                            <input
                                type="email"
                                placeholder="이메일"
                                value={email}
                                onChange={(event) => setEmail(event.target.value)}
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

                                <input type="tel" defaultValue="+82" />

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

                            <button type="submit" className="auth-submit">
                                아이디 찾기
                            </button>
                        </form>
                    ) : (
                        <div className="auth-result">
                            <p>
                                입력하신 정보로 가입된 아이디를 찾았어요.
                            </p>

                            <strong>on***two</strong>

                            <Link to="/login" className="auth-submit auth-result-btn">
                                로그인하러 가기
                            </Link>
                        </div>
                    )}

                    <div className="auth-links">
                        <Link to="/login">로그인</Link>
                        <span className="auth-links-divider">|</span>
                        <Link to="/signup">회원가입</Link>
                        <span className="auth-links-divider">|</span>
                        <Link to="/find-password">비밀번호 찾기</Link>
                    </div>

                </div>
            </main>

            <Footer />
        </>
    );
}

export default FindIdPage;
