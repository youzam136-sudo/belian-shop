import type { ReactNode } from "react";
import "../styles/brand.css";

import Header from "../components/Header";
import Footer from "../components/Footer";
import { useReveal, revealClass } from "../hooks/useReveal";

import heroBg from "../assets/brand-hero.png";
import dailyBg from "../assets/brand-daily.png";
import storyImg1 from "../assets/brand-story-1.png";
import storyImg2 from "../assets/brand-story-2.png";
import storyImg3 from "../assets/brand-story-3.png";

function StoryRow({
    image,
    reverse,
    eyebrow,
    title,
    lines,
    delay,
}: {
    image: string;
    reverse?: boolean;
    eyebrow?: string;
    title: ReactNode;
    lines: string[];
    delay?: 1 | 2 | 3 | 4;
}) {
    const { ref: imageRef, isVisible: imageVisible } = useReveal<HTMLDivElement>();
    const { ref: copyRef, isVisible: copyVisible } = useReveal<HTMLDivElement>();

    return (
        <div className={`brand-story-row${reverse ? " is-reverse" : ""}`}>
            <div
                ref={imageRef}
                className={revealClass("brand-story-image", imageVisible)}
            >
                <img src={image} alt="" loading="lazy" />
            </div>

            <div
                ref={copyRef}
                className={revealClass("brand-story-copy", copyVisible, delay)}
            >
                {eyebrow && <span className="brand-story-eyebrow">{eyebrow}</span>}

                <h3>{title}</h3>

                {lines.map((line, index) => (
                    <p key={index}>{line}</p>
                ))}
            </div>
        </div>
    );
}

function BrandPage() {
    const { ref: heroRef, isVisible: heroVisible } = useReveal<HTMLElement>();
    const { ref: introRef, isVisible: introVisible } = useReveal<HTMLDivElement>();
    const { ref: dailyHeadRef, isVisible: dailyHeadVisible } = useReveal<HTMLDivElement>();
    const { ref: dailyBannerRef, isVisible: dailyBannerVisible } = useReveal<HTMLDivElement>();
    const { ref: whatHeadRef, isVisible: whatHeadVisible } = useReveal<HTMLDivElement>();

    return (
        <>
            <Header />

            <main className="brand-page">

                {/* HERO */}
                <section
                    ref={heroRef}
                    className={revealClass("brand-hero", heroVisible)}
                    style={{ backgroundImage: `url(${heroBg})` }}
                >
                    <div className="brand-hero-inner">
                        <h1>
                            눈에 보이는 효과를 넘어 내면까지 작동하는
                        </h1>

                        <p>
                            내면과 외면의 완전한 웰빙을 추구하는 모던 프리미엄 이너뷰티 브랜드입니다.
                        </p>
                    </div>
                </section>

                {/* INTRO */}
                <div ref={introRef} className={revealClass("brand-intro", introVisible)}>
                    <p>
                        Positive ON. Vital Stay
                        <br />
                        긍정 스위치를 켜고 활력을 머무르게 하다
                    </p>
                </div>

                {/* 벨리안를 만나면 */}
                <section className="brand-daily">
                    <div
                        ref={dailyHeadRef}
                        className={revealClass("brand-daily-head", dailyHeadVisible)}
                    >
                        <h2>벨리안를 만나면</h2>

                        <p>
                            벨리안는 눈에 보이는 피부 고민에만 집중하지 않습니다.
                        </p>

                        <p>
                            300Da 초저분자 콜라겐으로 채우고, 포도씨추출물로 콜라겐을 지키고
                            무너진 내면의 활력과 일상의 리듬을 다시 깨우는 근본적인 메커니즘에 집중한
                            프리미엄 모던 웰니스 루틴 입니다.
                        </p>
                    </div>

                </section>

                {/* 벨리안는 무엇을 하는 회사인가? */}
                <section className="brand-what">
                    <div
                        ref={whatHeadRef}
                        className={revealClass("brand-what-head", whatHeadVisible)}
                    >
                        <h2>벨리안는 무엇을 하는 회사인가?</h2>
                    </div>

                    <StoryRow
                        image={storyImg1}
                        title={
                            <>
                                눈에 보이는 변화를 넘어,
                                <br />
                                내면의 활력까지 설계하는 웰니스 브랜드
                            </>
                        }
                        lines={[
                            "벨리안는 눈에 보이는 피부 고민을 넘어 내면의 컨디션과 일상의 리듬까지 생각합니다.",
                            "채우고 지키는 근본적인 메커니즘을 바탕으로 매일 지속할 수 있는 모던 웰니스 루틴을 제안합니다.",
                        ]}
                    />

                    <StoryRow
                        image={storyImg2}
                        reverse
                        title="근본적인 설계로 만드는 믿을 수 있는 웰니스"
                        lines={[
                            "300Da 초저분자 콜라겐과 OPC 95%를 기반으로 채우는 관리와 지키는 관리를 동시에 설계합니다.",
                            "성분의 기능성과 과학적 설계는 물론, 맛과 휴대성까지 고려해 복용 장벽을 낮추고 매일 지속할 수 있는 웰니스 루틴을 만듭니다.",
                        ]}
                    />

                    <StoryRow
                        image={storyImg3}
                        title={
                            <>
                                지키고 채우는
                                <br />
                                '듀얼 액션 웰니스 솔루션'
                            </>
                        }
                        lines={[
                            "벨리안는 단순히 콜라겐을 채우는 것에 그치지 않습니다.",
                            "300Da 초저분자 콜라겐으로 촘촘히 채우고, 포도씨추출물 OPC 95%로 콜라겐을 지키는 이중 메커니즘을 설계했습니다.",
                            "맛과 휴대성까지 고려한 한 포의 젤리로 매일 부담 없이 지속할 수 있는 마시는 스킨케어를 넘어선 웰니스 루틴을 제안합니다.",
                        ]}
                    />
                </section>

            </main>

            <Footer />
        </>
    );
}

export default BrandPage;
