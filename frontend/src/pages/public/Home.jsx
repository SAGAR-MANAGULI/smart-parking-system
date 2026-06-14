import Navbar from "../../components/Navbar";
import HeroSection from "../../components/HeroSection";
import FeaturesSection from "../../components/FeaturesSection";
import Footer from "../../components/Footer";

/* Import the new CSS layers */
import "../../styles/components/stars.css";
import "../../styles/components/nebula.css";

function Home() {
    return (
        /* Outer container – dark‑navy gradient (still kept from index.css) */
        <div className="relative min-h-screen text-white flex flex-col animated-bg">
            {/* Background layers – placed first so they stay behind content */}
            <div className="nebula" />
            <div className="stars" />

            <Navbar />

            {/* UI layers need a higher z-index */}
            <main className="flex-grow relative z-20">
                <HeroSection />
                <FeaturesSection />
            </main>

            <Footer />
        </div>
    );
}

export default Home;
