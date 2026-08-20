import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../styles/header.css";

function Header() {
    const [mobileOpen, setMobileOpen] = useState(false);
    const [shopOpen, setShopOpen] = useState(false);
    const [communityOpen, setCommunityOpen] = useState(false);
    const [mypageOpen, setMypageOpen] = useState(false);
    const [languageOpen, setLanguageOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    // 헤더가 화면 상단에 고정된(sticky) 상태에서 스크롤이 조금이라도
    // 내려가면 살짝 그림자를 줘서 "떠 있는" 느낌을 자연스럽게 표현한다.
    useEffect(() => {
        let ticking = false;

        const updateScrolled = () => {
            setIsScrolled(window.scrollY > 4);
            ticking = false;
        };

        const handleScroll = () => {
            if (ticking) return;
            ticking = true;
            window.requestAnimationFrame(updateScrolled);
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        handleScroll();

        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const closeMobileMenu = () => {
        setMobileOpen(false);
        setShopOpen(false);
        setCommunityOpen(false);
        setMypageOpen(false);
        setLanguageOpen(false);
    };

    return (
        <header className={`header${isScrolled ? " is-scrolled" : ""}`}>
            <div className="header-inner">
                {/* =========================
            PC LEFT
        ========================= */}
                <nav className="header-left">
                    <Link to="/brand">
                        브랜드소개
                    </Link>

                    <div className="header-menu-item">
                        <Link to="/shop">
                            SHOP
                        </Link>

                        <div className="header-submenu">
                            <Link to="/shop/skin">스킨</Link>
                            <Link to="/shop/cream">크림</Link>
                            <Link to="/shop/cleanser">폼클렌징</Link>
                            <Link to="/shop/etc">기타</Link>
                        </div>
                    </div>

                    <div className="header-menu-item">
                        <Link to="/">
                            커뮤니티
                        </Link>

                        <div className="header-submenu">
                            <Link to="/">공지사항</Link>
                            <Link to="/community/inquiry">상품문의</Link>
                            <Link to="/community/event">이벤트</Link>
                        </div>
                    </div>
                </nav>

                {/* =========================
            LOGO
        ========================= */}
                <Link
                    to="/"
                    className="header-logo"
                    onClick={closeMobileMenu}
                >
                    ONETWO
                </Link>

                {/* =========================
            PC RIGHT
        ========================= */}
                <nav className="header-right">
                    <Link to="/login">
                        로그인
                    </Link>

                    <Link to="/signup">
                        회원가입
                    </Link>

                    <Link to="/mypage" className="header-arrow-link">
                        마이페이지 <span className="header-arrow" />
                    </Link>

                    <Link to="/cart">
                        장바구니 <b>0</b>
                    </Link>

                    <Link to="/">
                        한국어 <span className="header-arrow" />
                    </Link>
                </nav>

                {/* =========================
            MOBILE HAMBURGER
        ========================= */}
                <button
                    type="button"
                    className={`mobile-menu-button ${mobileOpen ? "is-open" : ""
                        }`}
                    onClick={() =>
                        setMobileOpen((prev) => !prev)
                    }
                    aria-label="메뉴"
                >
                    <span />
                    <span />
                    <span />
                </button>
            </div>

            {/* =========================
          PC MEGA BACKGROUND
      ========================= */}
            <div className="header-dropdown-background" />

            {/* =========================
          MOBILE MENU
      ========================= */}
            <div
                className={`mobile-menu ${mobileOpen ? "is-open" : ""
                    }`}
            >
                <div className="mobile-menu-inner">

                    <Link
                        to="/brand"
                        className="mobile-main-link"
                        onClick={closeMobileMenu}
                    >
                        브랜드소개
                    </Link>

                    {/* SHOP */}
                    <div className="mobile-dropdown">
                        <button
                            type="button"
                            className="mobile-dropdown-button"
                            onClick={() =>
                                setShopOpen((prev) => !prev)
                            }
                        >
                            <span>SHOP</span>

                            <span
                                className={`mobile-arrow ${shopOpen ? "is-open" : ""
                                    }`}
                            >
                                ▾
                            </span>
                        </button>

                        <div
                            className={`mobile-submenu ${shopOpen ? "is-open" : ""
                                }`}
                        >
                            <Link to="/shop/skin" onClick={closeMobileMenu}>
                                스킨
                            </Link>

                            <Link to="/shop/cream" onClick={closeMobileMenu}>
                                크림
                            </Link>

                            <Link to="/shop/cleanser" onClick={closeMobileMenu}>
                                폼클렌징
                            </Link>

                            <Link to="/shop/etc" onClick={closeMobileMenu}>
                                기타
                            </Link>
                        </div>
                    </div>

                    {/* COMMUNITY */}
                    <div className="mobile-dropdown">
                        <button
                            type="button"
                            className="mobile-dropdown-button"
                            onClick={() =>
                                setCommunityOpen((prev) => !prev)
                            }
                        >
                            <span>커뮤니티</span>

                            <span
                                className={`mobile-arrow ${communityOpen ? "is-open" : ""
                                    }`}
                            >
                                ▾
                            </span>
                        </button>

                        <div
                            className={`mobile-submenu ${communityOpen ? "is-open" : ""
                                }`}
                        >
                            <Link to="/" onClick={closeMobileMenu}>
                                공지사항
                            </Link>

                            <Link to="/community/inquiry" onClick={closeMobileMenu}>
                                상품문의
                            </Link>

                            <Link to="/community/event" onClick={closeMobileMenu}>
                                이벤트
                            </Link>
                        </div>
                    </div>

                    <div className="mobile-menu-gap" />

                    <Link
                        to="/login"
                        className="mobile-secondary-link"
                        onClick={closeMobileMenu}
                    >
                        로그인
                    </Link>

                    <Link
                        to="/signup"
                        className="mobile-secondary-link"
                        onClick={closeMobileMenu}
                    >
                        회원가입
                    </Link>

                    {/* MY PAGE */}
                    <div className="mobile-dropdown secondary">
                        <button
                            type="button"
                            className="mobile-dropdown-button mobile-secondary-link"
                            onClick={() =>
                                setMypageOpen((prev) => !prev)
                            }
                        >
                            <span>마이페이지</span>

                            <span
                                className={`mobile-arrow ${mypageOpen ? "is-open" : ""
                                    }`}
                            >
                                ▾
                            </span>
                        </button>

                        <div
                            className={`mobile-submenu ${mypageOpen ? "is-open" : ""
                                }`}
                        >
                            <Link
                                to="/mypage"
                                onClick={closeMobileMenu}
                            >
                                마이페이지
                            </Link>

                            <Link to="/" onClick={closeMobileMenu}>
                                쇼핑정보
                            </Link>

                            <Link to="/" onClick={closeMobileMenu}>
                                최근 본 상품
                            </Link>

                            <Link to="/" onClick={closeMobileMenu}>
                                리뷰 작성
                            </Link>
                        </div>
                    </div>

                    <Link
                        to="/cart"
                        className="mobile-secondary-link"
                        onClick={closeMobileMenu}
                    >
                        장바구니 <b>0</b>
                    </Link>

                    {/* LANGUAGE */}
                    <div className="mobile-dropdown secondary">
                        <button
                            type="button"
                            className="mobile-dropdown-button mobile-secondary-link"
                            onClick={() =>
                                setLanguageOpen((prev) => !prev)
                            }
                        >
                            <span>한국어</span>

                            <span
                                className={`mobile-arrow ${languageOpen ? "is-open" : ""
                                    }`}
                            >
                                ▾
                            </span>
                        </button>

                        <div
                            className={`mobile-submenu ${languageOpen ? "is-open" : ""
                                }`}
                        >
                            <button type="button">
                                한국어
                            </button>

                            <button type="button">
                                English
                            </button>

                            <button type="button">
                                日本語
                            </button>
                        </div>
                    </div>

                </div>
            </div>
        </header>
    );
}

export default Header;
