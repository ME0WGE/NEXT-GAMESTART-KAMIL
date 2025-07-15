import DiscountCarousel from "@/components/Carousel/DiscountCarousel";
import CouponSection from "@/components/CouponSection/CouponSection";
import Header from "@/components/Header";
import PopularGames from "@/components/PopularGames";

export default function Home() {
  return (
    <>
      <Header />
      <DiscountCarousel />
      <CouponSection />
      <PopularGames />
    </>
  );
}
