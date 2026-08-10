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
                상호명 coss    대표자 홍길동    사업자등록번호 통신판매업신고번호 고객센터  1588-0000
                <br />
                주소06035 서울특별시 강남구 강남대로 622 (신사동)   개인정보보호책임자  홍길동(idio20@naver.com)
            </p>

            <small>
                © 2026 COSS
            </small>
        </footer>
    );
}

export default Footer;