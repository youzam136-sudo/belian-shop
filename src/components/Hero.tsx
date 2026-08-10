import { useReveal, revealClass } from "../hooks/useReveal";

function Hero() {
    const { ref, isVisible } = useReveal<HTMLElement>();

    return (
        <section ref={ref} className="hero">
            <div className="hero-inner">
                {/* hero-copy 자체는 위치 정렬용 transform(translateY(-50%))을 쓰고 있어서
                    페이드인 애니메이션은 내부 wrapper에 따로 적용한다 */}
                <div className="hero-copy">
                    <div className={revealClass("hero-copy-reveal", isVisible)}>
                        <h1>BRAND</h1>

                        <p>
                            넓은 공간 활용 효율적인 공간
                            <br />
                            독특한 형태의 프레임
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Hero;
