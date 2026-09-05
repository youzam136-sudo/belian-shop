import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import "../styles/header.css";
import logoBlack from "../assets/logo_black.png";
import { MyPageIcon, CartIcon } from "./icons/HeaderIcons";

function Header() {
    const headerRef = useRef<HTMLElement>(null);
    const [mobileOpen, setMobileOpen] = useState(false);
    const [communityOpen, setCommunityOpen] = useState(false);
    const [mypageOpen, setMypageOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

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

    // 실제 렌더링된 헤더 높이를 측정해서 CSS 변수(--header-height)로 저장.
    // 모바일 메뉴가 헤더 바로 아래 정확히 붙도록, 고정 px값 대신 이 변수를 사용한다.
    useEffect(() => {
        const updateHeaderHeight = () => {
            if (headerRef.current) {
                const height = headerRef.current.getBoundingClientRect().height;
                document.documentElement.style.setProperty(
                    "--header-height",
                    `${height}px`
                );
            }
        };

        updateHeaderHeight();

        window.addEventListener("resize", updateHeaderHeight);
        const timeoutId = window.setTimeout(updateHeaderHeight, 50);

        return () => {
            window.removeEventListener("resize", updateHeaderHeight);
            window.clearTimeout(timeoutId);
        };
    }, [mobileOpen]);

    const closeMobileMenu = () => {
        setMobileOpen(false);
        setCommunityOpen(false);
        setMypageOpen(false);
    };

    return (
        <header
            ref={headerRef}
            className={`header${isScrolled ? " is-scrolled" : ""}`}
        >
            <div className="header-inner">
                {/* =========================
            PC LEFT
        ========================= */}
                <nav className="header-left">
                    <Link to="/shop/skin">
                        SHOP
                    </Link>

                    <Link to="/brand">
                        BRAND STORY
                    </Link>

                    <div className="header-menu-item">
                        <Link to="/community/notice">
                            COMMUNITY
                        </Link>

                        <div className="header-submenu">
                            <Link to="/community/notice">공지사항</Link>
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
                    <img src={logoBlack} alt="povelo" className="header-logo-img" />
                </Link>

                {/* =========================
            PC RIGHT
        ========================= */}
                <nav className="header-right">
                    <Link to="/login">
                        LOGIN
                    </Link>

                    <Link to="/signup">
                        JOIN
                    </Link>

                    <div className="header-menu-item">
                        <Link to="/mypage" className="header-icon-link">
                            <MyPageIcon className="header-icon-svg" />
                        </Link>

                        <div className="header-submenu header-submenu-compact">
                            <Link to="/mypage">마이페이지</Link>
                            <Link to="/mypage/refund">취소/환불 내역</Link>
                            <Link to="/mypage/recent">최근 본 상품</Link>
                            <Link to="/mypage/review">리뷰 작성</Link>
                            <Link to="/mypage/coupon">나의 쿠폰</Link>
                            <Link to="/mypage/profile">내 정보 관리</Link>
                        </div>
                    </div>

                    <Link to="/cart" className="header-icon-link">
                        <CartIcon className="header-icon-svg" />
                        <span className="header-icon-badge">0</span>
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
                        to="/shop/skin"
                        className="mobile-main-link"
                        onClick={closeMobileMenu}
                    >
                        SHOP
                    </Link>

                    <Link
                        to="/brand"
                        className="mobile-main-link"
                        onClick={closeMobileMenu}
                    >
                        BRAND STORY
                    </Link>

                    {/* COMMUNITY */}
                    <div className="mobile-dropdown">
                        <button
                            type="button"
                            className="mobile-dropdown-button"
                            onClick={() =>
                                setCommunityOpen((prev) => !prev)
                            }
                        >
                            <span>COMMUNITY</span>

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
                            <Link to="/community/notice" onClick={closeMobileMenu}>
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
                        LOGIN
                    </Link>

                    <Link
                        to="/signup"
                        className="mobile-secondary-link"
                        onClick={closeMobileMenu}
                    >
                        JOIN
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
                            <span>
                                <MyPageIcon className="header-icon-svg" /> 마이페이지
                            </span>

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

                            <Link to="/mypage/refund" onClick={closeMobileMenu}>
                                취소/환불 내역
                            </Link>

                            <Link to="/mypage/recent" onClick={closeMobileMenu}>
                                최근 본 상품
                            </Link>

                            <Link to="/mypage/review" onClick={closeMobileMenu}>
                                리뷰 작성
                            </Link>

                            <Link to="/mypage/coupon" onClick={closeMobileMenu}>
                                나의 쿠폰
                            </Link>

                            <Link to="/mypage/profile" onClick={closeMobileMenu}>
                                내 정보 관리
                            </Link>
                        </div>
                    </div>

                    <Link
                        to="/cart"
                        className="mobile-secondary-link"
                        onClick={closeMobileMenu}
                    >
                        <CartIcon className="header-icon-svg" /> 장바구니 <b>0</b>
                    </Link>

                </div>
            </div>
        </header>
    );
}

export default Header;
