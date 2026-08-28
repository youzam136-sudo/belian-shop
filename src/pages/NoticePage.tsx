import { useState } from "react";
import "../styles/notice.css";

import Header from "../components/Header";
import Footer from "../components/Footer";
import { useReveal, revealClass } from "../hooks/useReveal";

import heroV1 from "../assets/notice-hero-1.jpg";

type NoticeItem = {
    id: number;
    title: string;
    description: string;
    author: string;
    time: string;
    views: number;
};

const allNotices: NoticeItem[] = Array.from({ length: 6 }, (_, index) => ({
    id: index + 1,
    title:
        index % 2 === 0
            ? "홈페이지 오픈 했습니다"
            : "홈페이지 오픈하였습니다.",
    description:
        "홈페이지가 오픈된 내용에 대한 설명문, 홈페이지가 오픈된 내용에 대한 설명문, " +
        "홈페이지가 오픈된 내용에 대한 설명문,",
    author: "쥬쥬위니비",
    time: "19:13",
    views: 346,
}));

const PAGE_SIZE = 3;
const totalPages = 5;

const hero = {
    image: heroV1,
    title: "건강한 피부의 시작, 지금 시작하는 이유",
    subtitle: "당신의 피부가 달라지는 시간 · 런칭 기념 이벤트",
};

function NoticePage() {
    const [page, setPage] = useState(1);

    const { ref: heroRef, isVisible: heroVisible } = useReveal<HTMLElement>();
    const { ref: headingRef, isVisible: headingVisible } = useReveal<HTMLDivElement>();
    const { ref: listRef, isVisible: listVisible } = useReveal<HTMLDivElement>();

    const pageItems = allNotices.slice(
        (page - 1) * PAGE_SIZE,
        page * PAGE_SIZE,
    );

    const goToPage = (next: number) => {
        const clamped = Math.min(Math.max(next, 1), totalPages);
        setPage(clamped);
    };

    return (
        <>
            <Header />

            <main className="notice-page">

                {/* HERO */}
                <section
                    ref={heroRef}
                    className={revealClass("notice-hero", heroVisible)}
                    style={{ backgroundImage: `url(${hero.image})` }}
                >
                    <div className="notice-hero-inner">
                        <h1>{hero.title}</h1>
                        <p>{hero.subtitle}</p>
                    </div>
                </section>

                <div
                    ref={headingRef}
                    className={revealClass("notice-heading", headingVisible)}
                >
                    <h2>공지사항</h2>
                </div>

                {/* LIST */}
                <div
                    ref={listRef}
                    className={revealClass("notice-list-wrap", listVisible, 1)}
                >
                    {pageItems.length === 0 ? (
                        <div className="notice-empty">
                            등록된 게시물이 없습니다.
                        </div>
                    ) : (
                        <div className="notice-list-v1">
                            {pageItems.map((item) => (
                                <div className="notice-row-v1" key={item.id}>
                                    <span className="notice-row-v1-title">
                                        {item.title}
                                    </span>

                                    <span className="notice-row-v1-meta">
                                        {item.author} &nbsp; {item.time} &nbsp; 조회 {item.views}
                                    </span>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* PAGINATION */}
                <nav className="notice-pagination">
                    <button
                        type="button"
                        onClick={() => goToPage(1)}
                        disabled={page === 1}
                        aria-label="첫 페이지"
                    >
                        «
                    </button>

                    <button
                        type="button"
                        onClick={() => goToPage(page - 1)}
                        disabled={page === 1}
                        aria-label="이전 페이지"
                    >
                        ‹
                    </button>

                    {Array.from({ length: totalPages }, (_, index) => index + 1).map(
                        (num) => (
                            <button
                                key={num}
                                type="button"
                                className={num === page ? "is-active" : ""}
                                onClick={() => goToPage(num)}
                            >
                                {num}
                            </button>
                        ),
                    )}

                    <button
                        type="button"
                        onClick={() => goToPage(page + 1)}
                        disabled={page === totalPages}
                        aria-label="다음 페이지"
                    >
                        ›
                    </button>

                    <button
                        type="button"
                        onClick={() => goToPage(totalPages)}
                        disabled={page === totalPages}
                        aria-label="마지막 페이지"
                    >
                        »
                    </button>
                </nav>

            </main>

            <Footer />
        </>
    );
}

export default NoticePage;
