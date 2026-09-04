import "../styles/footer.css";
import logoWhite from "../assets/logo_white.png";

function Footer() {
    return (
        <footer className="footer">
            <div className="footer-logo">
                <img src={logoWhite} alt="" />
            </div>

            <div className="footer-links">
                <a href="#">홈</a>
                |
                <a href="#">이용약관</a>
                |
                <a href="#">개인정보처리방침</a>
                |
                <a href="#">이용안내</a>
            </div>

            <p>
                상호명 주식회사 벨리안    대표자 김미나    고객센터 010-3620-2562
                <br />
                주소 대전시 서구 남선로68   개인정보보호책임자 김미나(mnkim@belian.com)
            </p>

            <small>
                © 2026 BELIAN
            </small>
        </footer>
    );
}

export default Footer;
