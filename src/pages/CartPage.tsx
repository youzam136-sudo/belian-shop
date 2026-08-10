import Header from "../components/Header";
import Footer from "../components/Footer";
import CartSummary from "../components/CartSummary";
import CartItems from "../components/CartItems";
import "../styles/cart.css";

function CartPage() {
    return (
        <>
            <Header />

            <main className="cart-page">
                <div className="cart-container">
                    <CartSummary />
                    <CartItems />
                </div>
            </main>

            <Footer />
        </>
    );
}

export default CartPage;
