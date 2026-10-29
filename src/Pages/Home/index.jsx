import Hero from "../Home/HeroSection";
import Categories from "../Home/CategoriesSection";
import BestSellers from "../Home/BestSellerSection";
import SpecialOffer from "../Home/SpecialOffer";
import PopularBrands from "../Home/PopularBrandSection";

export default function Home() {
  return (
    <>
      <Hero />
      <Categories />
      <BestSellers />
      <SpecialOffer />
      <PopularBrands />
    </>
  );
}
