import { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/auth.css";

import Header from "../components/Header";
import Footer from "../components/Footer";

import naverIcon from "../assets/auth/naver-icon.png";
import kakaoIcon from "../assets/auth/kakao-icon.png";

function LoginPage() {
    const [rememberId, setRememberId] = useState(false);

    return (
        <>
            <Header />

            <main className="auth-page">
                <div className="auth-container">

                    <h1>로그인</h1>

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
                            autoComplete="current-password"
                        />

                        <label className="auth-checkbox">
                            <input
                                type="checkbox"
                                checked={rememberId}
                                onChange={(event) =>
                                    setRememberId(event.target.checked)
                                }
                            />
                            아이디 저장
                        </label>

                        <button type="submit" className="auth-submit">
                            로그인
                        </button>
                    </form>

                    <div className="auth-links">
                        <Link to="/signup">회원가입</Link>
                        <span className="auth-links-divider">|</span>
                        <Link to="/">아이디찾기</Link>
                        <span className="auth-links-divider">|</span>
                        <Link to="/">비밀번호 찾기</Link>
                    </div>

                    <div className="auth-sns">
                        <h2>SNS 계정 간편 로그인</h2>

                        <button type="button" className="auth-sns-btn is-naver">
                            <img src={naverIcon} alt="" />
                            네이버로 1초 회원 가입
                        </button>

                        <button type="button" className="auth-sns-btn is-kakao">
                            <img src={kakaoIcon} alt="" />
                            카카오톡 1초 회원 가입
                        </button>
                    </div>

                </div>
            </main>

            <Footer />
        </>
    );
}

export default LoginPage;
