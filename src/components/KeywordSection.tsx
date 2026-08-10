import { useState } from "react";
import productImage from "../assets/prd-img02.png";
import { useReveal, revealClass } from "../hooks/useReveal";

const keywords = [
    "스킨케어",
    "세럼",
    "크림",
    "로션",
];

const items = [1, 2, 3];

function KeywordSection() {
    const [activeKeyword, setActiveKeyword] = useState(keywords[0]);
    const { ref: headerRef, isVisible: headerVisible } = useReveal<HTMLDivElement>();
    const { ref: gridRef, isVisible: gridVisible } = useReveal<HTMLDivElement>();

    return (
        <section className="keyword-section">
            <div ref={headerRef} className={revealClass("keyword-header", headerVisible)}>
                <h2>Shop by keywords</h2>
                <p>대표 상품과  전체 상품에 대한 키워드.</p>

                <div className="keyword-list" role="tablist">
                    {keywords.map((keyword) => (
                        <button
                            type="button"
                            key={keyword}
                            role="tab"
                            aria-selected={activeKeyword === keyword}
                            className={
                                activeKeyword === keyword ? "is-active" : ""
                            }
                            onClick={() => setActiveKeyword(keyword)}
                        >
                            #{keyword}
                        </button>
                    ))}
                </div>
            </div>

            <div
                ref={gridRef}
                className={revealClass("keyword-grid", gridVisible, 1)}
                role="tabpanel"
                aria-label={activeKeyword}
            >
                {items.map((item) => (
                    <article key={`${activeKeyword}-${item}`}>
                        <div className="keyword-thumb">
                            <img
                                src={productImage}
                                alt={`${activeKeyword} 시그니처 제품`}
                                loading="lazy"
                            />
                        </div>

                        <h3>{activeKeyword} 시그니처 제품</h3>

                        <p>피부 본연의 아름다움을 위한 제품</p>
                    </article>
                ))}
            </div>
        </section>
    );
}

export default KeywordSection;
