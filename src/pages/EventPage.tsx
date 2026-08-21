import { useState } from "react";
import "../styles/event.css";

import Header from "../components/Header";
import Footer from "../components/Footer";
import { useReveal, revealClass } from "../hooks/useReveal";

import eventHero from "../assets/event-hero.jpg";
import eventImg1 from "../assets/event-1.jpg";
import eventImg2 from "../assets/event-2.jpg";
import eventImg3 from "../assets/event-3.jpg";

type EventItem = {
    id: number;
    image: string;
    title: string;
    description: string;
};

// 실제 데이터는 6개(2페이지 분량)만 채우고,
// 나머지 3~5페이지는 게시물이 없는 빈 상태로 둔다.
const baseImages = [eventImg1, eventImg2, eventImg3];

const allEvents: EventItem[] = Array.from({ length: 6 }, (_, index) => ({
    id: index + 1,
    image: baseImages[index % baseImages.length],
    title: "이벤트명",
    description: "이벤트 설명",
}));

const PAGE_SIZE = 3;

// 페이지 번호는 디자인대로 5개까지 항상 보여준다.
// (실제 게시물은 1~2페이지에만 존재하고 3~5페이지는 비어있다)
const totalPages = 5;

function EventCard({ event, delay }: { event: EventItem; delay?: 1 | 2 | 3 | 4 }) {
    const { ref, isVisible } = useReveal<HTMLElement>();

    return (
        <article
            ref={ref}
            className={revealClass("event-card", isVisible, delay)}
        >
            <div className="event-card-image">
                <img src={event.image} alt={event.title} />
            </div>

            <h3>{event.title}</h3>
            <p>{event.description}</p>
        </article>
    );
}

function EventPage() {
    const { ref: heroRef, isVisible: heroVisible } = useReveal<HTMLElement>();
    const { ref: headingRef, isVisible: headingVisible } = useReveal<HTMLDivElement>();
    const [page, setPage] = useState(1);

    const pageItems = allEvents.slice(
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

            <main className="event-page">

                {/* HERO */}
                <section
                    ref={heroRef}
                    className={revealClass("event-hero", heroVisible)}
                    style={{ backgroundImage: `url(${eventHero})` }}
                >
                    <div className="event-hero-inner">
                        <h1>
                            첫 구매 20% 할인, 지금 만나보세요
                        </h1>

                        <p>
                            여름맞이 스킨케어 기획전 · 최대 30% 할인
                        </p>
                    </div>
                </section>

                <div
                    ref={headingRef}
                    className={revealClass("event-heading", headingVisible)}
                >
                    <h2>이벤트</h2>
                </div>

                {/* GRID */}
                {pageItems.length > 0 ? (
                    <div className="event-grid">
                        {pageItems.map((event, index) => (
                            <EventCard
                                key={event.id}
                                event={event}
                                delay={((index % 4) + 1) as 1 | 2 | 3 | 4}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="event-empty">
                        등록된 게시물이 없습니다.
                    </div>
                )}

                {/* PAGINATION */}
                <nav className="event-pagination">
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

export default EventPage;
