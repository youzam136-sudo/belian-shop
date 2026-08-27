import Header from "../components/Header";
import Hero from "../components/Hero";
import BrandSection from "../components/BrandSection";
import PromotionSection from "../components/PromotionSection";
import GallerySection from "../components/GallerySection";
import Footer from "../components/Footer";
import "../styles/home.css";

function HomePage() {
    return (
        <>
            <Header />

            <main>
                <Hero />

                <BrandSection />

                <PromotionSection />

                <GallerySection />
            </main>

            <Footer />
        </>
    );
}

export default HomePage;
