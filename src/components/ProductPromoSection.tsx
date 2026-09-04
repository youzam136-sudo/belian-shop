import { Link } from "react-router-dom";
import promoProduct from "../assets/povelo/promo-product.jpg";
import promoGrapes from "../assets/povelo/promo-grapes.jpg";
import { useReveal, revealClass } from "../hooks/useReveal";

function ProductPromoSection() {
    const { ref: productRef, isVisible: productVisible } =
        useReveal<HTMLDivElement>();
    const { ref: grapesRef, isVisible: grapesVisible } =
        useReveal<HTMLDivElement>();

    return (
        <section className="product-promo-section">
            <div ref={productRef} className={revealClass("product-promo-wrap", productVisible)}>
                <div className="product-promo-card product-promo-card--pink">
                    <span className="product-promo-badge">MORE VIEW +</span>
                    <img
                        src={promoProduct}
                        alt="Wineberry Firming Collagen Jelly"
                        className="product-promo-img"
                    />
                    <div className="product-promo-info">
                        <h3>Wineberry Firming Collagen jelly</h3>
                        <p>와인베리 퍼밍 콜라겐 젤리</p>
                        <Link to="/shop/skin" className="product-promo-link">
                            MORE VIEW +
                        </Link>
                    </div>
                </div>
            </div>
            <div ref={grapesRef} className={revealClass("product-promo-wrap", grapesVisible, 1)}>
                <div className="product-promo-card product-promo-card--beige">
                    <img src={promoGrapes} alt="" className="product-promo-img" />
                </div>
            </div>
        </section>
    );
}

export default ProductPromoSection;
