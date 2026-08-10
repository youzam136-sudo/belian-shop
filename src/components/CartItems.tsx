import { useState } from "react";
import { useReveal, revealClass } from "../hooks/useReveal";

function CartItems() {
    const [quantity, setQuantity] = useState(1);
    const [selected, setSelected] = useState(true);
    const { ref, isVisible } = useReveal<HTMLElement>();

    const decreaseQuantity = () => {
        setQuantity((prev) => Math.max(1, prev - 1));
    };

    const increaseQuantity = () => {
        setQuantity((prev) => prev + 1);
    };

    return (
        <section ref={ref} className={revealClass("cart-items", isVisible, 1)}>
            <div className="cart-items-header">
                <h2>담은 상품 1</h2>
            </div>

            <div className="cart-select-row">
                <label className="cart-checkbox-label">
                    <input
                        type="checkbox"
                        checked={selected}
                        onChange={(e) =>
                            setSelected(e.target.checked)
                        }
                    />

                    <span className="custom-checkbox" />

                    <strong>
                        전체선택 {selected ? "1" : "0"}/1
                    </strong>
                </label>

                <button
                    type="button"
                    className="delete-selected"
                >
                    선택 삭제
                </button>
            </div>

            <div className="cart-line" />

            <article className="cart-product">
                <div className="cart-product-top">
                    <label className="cart-checkbox-label">
                        <input
                            type="checkbox"
                            checked={selected}
                            onChange={(e) =>
                                setSelected(e.target.checked)
                            }
                        />

                        <span className="custom-checkbox" />

                        <strong>스킨케어 제품</strong>
                    </label>

                    <button
                        className="cart-remove"
                        type="button"
                    >
                        ×
                    </button>
                </div>

                <div className="cart-product-content">
                    <div className="cart-product-image">
                        <div className="mock-cart-product" />
                    </div>

                    <div className="cart-product-info">
                        <div className="cart-price-row">
                            <del>120,000원</del>
                            <strong>68,000원</strong>
                        </div>

                        <div className="quantity-box">
                            <button
                                type="button"
                                onClick={decreaseQuantity}
                            >
                                −
                            </button>

                            <span>
                                {quantity}
                            </span>

                            <button
                                type="button"
                                onClick={increaseQuantity}
                            >
                                +
                            </button>
                        </div>
                    </div>
                </div>
            </article>
        </section>
    );
}

export default CartItems;
