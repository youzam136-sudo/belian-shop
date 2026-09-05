import "../styles/footer.css";
import instagramIcon from "../assets/icons/instagram.svg";
import youtubeIcon from "../assets/icons/youtube.svg";

function Footer() {
    return (
        <footer className="footer">
            <div className="footer-top">
                <div className="footer-col footer-col--brand">
                    <p>
                        긍정 스위치를 켜고
                        <br />
                        활력을 머무르게 하다
                    </p>
                    <small>© 2026 belian</small>
                </div>

                <div className="footer-col footer-col--info">
                    <p>
                        상호명 주식회사 벨리안 &nbsp;대표자 김미나
                        <br />
                        고객센터 010-3620-2562
                        <br />
                        주소 대전시 서구 남선로68
                        <br />
                        개인정보보호책임자 김미나(mnkim@belian.com)
                    </p>
                </div>

                <div className="footer-col footer-col--links">
                    <nav className="footer-links">
                        <a href="#">이용약관</a>
                        <a href="#">개인정보처리방침</a>
                        <a href="#">이용안내</a>
                    </nav>
                    <div className="footer-socials">
                        <a href="#" aria-label="Instagram">
                            <img src={instagramIcon} alt="Instagram" />
                        </a>
                        <a href="#" aria-label="YouTube">
                            <img src={youtubeIcon} alt="YouTube" />
                        </a>
                    </div>
                </div>
            </div>

            <div className="footer-marquee">
                <div className="footer-marquee-track">
                    <span>povelo</span>
                    <span>povelo</span>
                    <span>povelo</span>
                    <span>povelo</span>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
