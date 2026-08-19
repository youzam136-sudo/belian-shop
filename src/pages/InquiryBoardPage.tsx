import "../styles/inquiry-board.css";

import Header from "../components/Header";
import Footer from "../components/Footer";
import { useReveal, revealClass } from "../hooks/useReveal";

import productImage from "../assets/shop/product.png";

type Inquiry = {
    id: number;
    productName: string;
    productDesc: string;
    content: string;
    timeAgo: string;
};

const inquiries: Inquiry[] = Array.from({ length: 3 }, (_, index) => ({
    id: index + 1,
    productName: "상품명",
    productDesc: "상품설명",
    content:
        "상품 문의에 대한 설명 상품 문의에 대한 설명 상품 문의에 대한 설명 상품 문의에 대한 설명 " +
        "상품 문의에 대한 설명 상품 문의에 대한 설명 상품 문의에 대한 설명",
    timeAgo: "4시간전",
}));

function InquiryCard({ inquiry, delay }: { inquiry: Inquiry; delay?: 1 | 2 | 3 | 4 }) {
    const { ref, isVisible } = useReveal<HTMLElement>();

    return (
        <article
            ref={ref}
            className={revealClass("inquiry-card", isVisible, delay)}
        >
            <div className="inquiry-image">
                <img src={productImage} alt={inquiry.productName} />
            </div>

            <div className="inquiry-body">
                <h3>{inquiry.productName}</h3>

                <p className="inquiry-product-desc">
                    {inquiry.productDesc}
                </p>

                <p className="inquiry-content">
                    {inquiry.content}
                </p>

                <span className="inquiry-time">
                    {inquiry.timeAgo}
                </span>
            </div>

            <button type="button" className="inquiry-more-btn">
                더보기
            </button>
        </article>
    );
}

function InquiryBoardPage() {
    const { ref: headingRef, isVisible: headingVisible } = useReveal<HTMLDivElement>();

    return (
        <>
            <Header />

            <main className="inquiry-board-page">
                <div
                    ref={headingRef}
                    className={revealClass("inquiry-board-heading", headingVisible)}
                >
                    <h1>상품 문의 게시판</h1>
                </div>

                <div className="inquiry-list">
                    {inquiries.map((inquiry, index) => (
                        <InquiryCard
                            key={inquiry.id}
                            inquiry={inquiry}
                            delay={((index % 4) + 1) as 1 | 2 | 3 | 4}
                        />
                    ))}
                </div>
            </main>

            <Footer />
        </>
    );
}

export default InquiryBoardPage;
