import Header from "../components/Header";
import Hero from "../components/Hero";
import ProductSection from "../components/ProductSection";
import BrandSection from "../components/BrandSection";
import PromotionSection from "../components/PromotionSection";
import KeywordSection from "../components/KeywordSection";
import GallerySection from "../components/GallerySection";
import Footer from "../components/Footer";
import "../styles/home.css";

function HomePage() {
    return (
        <>
            <Header />

            <main>
                <Hero />

                <ProductSection />

                <BrandSection />

                <ProductSection />

                <PromotionSection />

                <KeywordSection />

                <GallerySection />
            </main>

            <Footer />
        </>
    );
}

export default HomePage;
