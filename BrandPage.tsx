import type { ReactNode } from "react";
import "../styles/brand.css";

import Header from "../components/Header";
import Footer from "../components/Footer";
import { useReveal, revealClass } from "../hooks/useReveal";

import heroBg from "../assets/brand-hero.jpg";
import dailyBg from "../assets/brand-daily.jpg";
import storyImg1 from "../assets/brand-story-1.jpg";
import storyImg2 from "../assets/brand-story-2.jpg";
import storyImg3 from "../assets/brand-story-3.jpg";

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
                            당신의 피부를 더 건강하게 만드는
                            <br />
                            '스킨케어 파트너'
                        </h1>

                        <p>
                            원투는 2012년 설립 이후 13년 넘게 오직 원료와 포뮬러 연구에만
                            집중해온 브랜드입니다.
                        </p>
                    </div>
                </section>

                {/* INTRO */}
                <div ref={introRef} className={revealClass("brand-intro", introVisible)}>
                    <p>
                        우리는 단순히 화장품을 판매하는 회사를 넘어 고객이 스스로 원하는
                        <br />
                        피부를 만들고 실천할 수 있도록 돕는 스킨 솔루션 기업으로 성장해 왔습니다.
                    </p>
                </div>

                {/* 매일 만드는 건강한 피부 */}
                <section className="brand-daily">
                    <div
                        ref={dailyHeadRef}
                        className={revealClass("brand-daily-head", dailyHeadVisible)}
                    >
                        <h2>매일 만드는 건강한 피부</h2>

                        <p>
                            우리가 매일 사용하는 두 가지 요소, 원료와 기술이 만나야 온전한
                            결과가 나온다는 작은 '믿음'을 자라지 않고 담아냅니다.
                            <br />
                            명확한 형태를 브랜드의 상징으로 선택했습니다. 성분을 가장
                            진솔한 구조로 바탕으로 이루어진 스킨을 더 정돈하고, 더
                            자연스럽게 어울리도록 완성할 수 있도록 이 방식입니다.
                        </p>

                        <p>
                            일상을 구성하는 작은 조각 하나하나가 모여 완전한 피부가 되듯,
                            원투프레임도 그 과정을 함께하는 조용한 동반자가 되고자 합니다.
                        </p>
                    </div>

                    <div
                        ref={dailyBannerRef}
                        className={revealClass("brand-daily-banner", dailyBannerVisible, 1)}
                        style={{ backgroundImage: `url(${dailyBg})` }}
                    >
                        <div className="brand-daily-banner-frame">
                            <span className="brand-daily-logo">ONETWO</span>
                            <span className="brand-daily-caption">매일 만드는 건강한 피부</span>
                        </div>
                    </div>
                </section>

                {/* 원투는 무엇을 하는 회사인가? */}
                <section className="brand-what">
                    <div
                        ref={whatHeadRef}
                        className={revealClass("brand-what-head", whatHeadVisible)}
                    >
                        <h2>원투는 무엇을 하는 회사인가?</h2>
                    </div>

                    <StoryRow
                        image={storyImg1}
                        title="고객의 피부 고민을 함께 해결하는 회사"
                        lines={[
                            "고객이 스스로 원하는 피부 상태를 찾아갈 수 있도록 돕는 스킨케어 브랜드입니다.",
                            "우리는 화장품을 단순한 소비재가 아니라 스스로의 피부를 이해하고 관리하는 과정이라고 보고 있습니다.",
                        ]}
                    />

                    <StoryRow
                        image={storyImg2}
                        reverse
                        title="엄격한 기준으로 만드는 믿을 수 있는 제품"
                        lines={[
                            "원료 선정부터 제형 개발까지 까다로운 기준을 거쳐 제품을 만듭니다. 피부에 자극이 될 수 있는 성분은 최소화하고, 효과가 검증된 성분만을 사용합니다.",
                            "또한 우리는 높은 품질을 유지하면서도 합리적인 가격을 제공하는 것을 중요한 가치로 삼고 있습니다. 덕분에 원투는 많은 고객들에게 꾸준히 신뢰받는 브랜드로 자리잡아 왔습니다.",
                        ]}
                    />

                    <StoryRow
                        image={storyImg3}
                        title={
                            <>
                                단순한 제조·유통을 넘어선
                                <br />
                                '토탈 스킨 솔루션 제공자'
                            </>
                        }
                        lines={[
                            "목표는 단순히 화장품을 판매하는 것이 아닙니다.",
                            "우리는 고객의 피부 관리를 더 편리하게, 더 정확하게, 더 의미 있게 만드는 정보와 서비스를 함께 제공하는 브랜드로 발전하고자 합니다.",
                            "좋은 제품을 판매하는 것을 넘어, 정확한 성분 정보 제공, 안전한 사용법 안내, 피부 고민에 공감하는 제안까지 함께하는 것이 원투가 생각하는 '서비스의 본질'입니다.",
                        ]}
                    />
                </section>

            </main>

            <Footer />
        </>
    );
}

export default BrandPage;
