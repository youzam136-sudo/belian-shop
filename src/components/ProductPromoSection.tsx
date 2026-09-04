import { Link } from "react-router-dom";
import promoProduct from "../assets/prd-img.png";
import promoLifestyle from "../assets/brand-daily.jpg";
import { useReveal, revealClass } from "../hooks/useReveal";

function ProductPromoSection() {
    const { ref: productRef, isVisible: productVisible } =
        useReveal<HTMLDivElement>();
    const { ref: grapesRef, isVisible: grapesVisible } =
        useReveal<HTMLDivElement>();

    return (
        <section className="product-promo-section">
            <div
                ref={productRef}
                className={revealClass("product-promo-card product-promo-card--pink", productVisible)}
            >
                <span className="product-promo-badge">MORE VIEW +</span>

                <img
                    src={promoProduct}
                    alt="스킨케어 제품"
                    className="product-promo-img"
                />

                <div className="product-promo-info">
                    <h3>Daily Moisture Serum</h3>
                    <p>피부에 촉촉한 수분감을 채워주는 데일리 세럼</p>
                    <Link to="/shop/skin" className="product-promo-link">
                        MORE VIEW +
                    </Link>
                </div>
            </div>

            <div
                ref={grapesRef}
                className={revealClass("product-promo-card product-promo-card--beige", grapesVisible, 1)}
            >
                <img src={promoLifestyle} alt="" className="product-promo-img" />
            </div>
        </section>
    );
}

export default ProductPromoSection;
