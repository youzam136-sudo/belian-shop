import Header from "../components/Header";
import Hero from "../components/Hero";
import ProductPromoSection from "../components/ProductPromoSection";
import BrandSection from "../components/BrandSection";
import LifestyleBanner from "../components/LifestyleBanner";
import GallerySection from "../components/GallerySection";
import Footer from "../components/Footer";
import "../styles/home.css";

function HomePage() {
    return (
        <>
            <Header />
            <main>
                <Hero />
                <ProductPromoSection />
                <BrandSection />
                <LifestyleBanner />
                <GallerySection />
            </main>
            <Footer />
        </>
    );
}

export default HomePage;
