
import HeroSection from '../components/HeroSection'
import AboutSection from '../components/AboutSection'
import ProductsSection from '../components/ProductsSection'
const Home = () => {
  return (
    <>
    <div className="flex flex-col items-center justify-center">
        <HeroSection />
        <AboutSection />
        <ProductsSection />
    </div>
    </>

  )
}

export default Home