import "../styles/footer.css";
import instagramIcon from "../assets/icons/instagram.svg";
import youtubeIcon from "../assets/icons/youtube.svg";

function Footer() {
    return (
        <footer className="pv-footer">
            <div className="pv-footer-top">
                <div className="pv-footer-col pv-footer-col--brand">
                    <p>
                        긍정 스위치를 켜고
                        <br />
                        활력을 머무르게 하다
                    </p>
                    <small>© 2026 belian</small>
                </div>

                <div className="pv-footer-col pv-footer-col--info">
                    <p>
                        <span className="pv-footer-label">상호명</span> 주식회사 벨리안{" "}
                        <span className="pv-footer-value">대표자 김미나</span>
                        <br />
                        <span className="pv-footer-label">고객센터</span>{" "}
                        <span className="pv-footer-value">010-3620-2562</span>
                        <br />
                        <span className="pv-footer-label">주소</span> 대전시 서구 남선로68
                        <br />
                        <span className="pv-footer-label">개인정보보호책임자</span> 김미나
                        (mnkim@belian.com)
                    </p>
                </div>

                <div className="pv-footer-col pv-footer-col--links">
                    <nav className="pv-footer-links">
                        <a href="#">이용약관</a>
                        <a href="#">개인정보처리방침</a>
                        <a href="#">이용안내</a>
                    </nav>
                </div>

                <div className="pv-footer-col pv-footer-col--socials">
                    <div className="pv-footer-socials">
                        <a href="#" aria-label="Instagram">
                            <img src={instagramIcon} alt="Instagram" />
                        </a>
                        <a href="#" aria-label="YouTube">
                            <img src={youtubeIcon} alt="YouTube" />
                        </a>
                    </div>
                </div>
            </div>

            <div className="pv-footer-marquee">
                <div className="pv-footer-marquee-track">
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
