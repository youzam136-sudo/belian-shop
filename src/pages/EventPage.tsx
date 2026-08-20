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

// 실제로는 페이지당 3개씩, 총 5페이지 분량(15개)이 있다고 가정하고
// 지금은 준비된 사진 3장을 돌려가며 채운다.
const baseImages = [eventImg1, eventImg2, eventImg3];

const allEvents: EventItem[] = Array.from({ length: 15 }, (_, index) => ({
    id: index + 1,
    image: baseImages[index % baseImages.length],
    title: "이벤트명",
    description: "이벤트 설명",
}));

const PAGE_SIZE = 3;
const totalPages = Math.ceil(allEvents.length / PAGE_SIZE);

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
        window.scrollTo({ top: 0, behavior: "smooth" });
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
                <div className="event-grid">
                    {pageItems.map((event, index) => (
                        <EventCard
                            key={event.id}
                            event={event}
                            delay={((index % 4) + 1) as 1 | 2 | 3 | 4}
                        />
                    ))}
                </div>

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
