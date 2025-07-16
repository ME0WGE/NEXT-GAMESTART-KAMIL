import FilterSideBar from "@/components/FilterSideBar/FilterSideBar";
import AllGames from "@/components/AllGames/AllGames";
import SearchBar from "@/components/SearchBar/SearchBar";
import CouponSection from "@/components/CouponSection/CouponSection";
import { Gamepad } from "lucide-react";

export default function Games() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-midnight to-midnight/90">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-24">
        {/* Header section */}
        <div className="mb-8 sm:mb-12 text-center">
          <div className="flex items-center justify-center mb-4">
            <Gamepad className="text-rosy mr-3 transition-smooth" size={32} />
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-ivory">
              Catalogue de jeux
            </h1>
          </div>
          <p className="text-ivory/70 text-lg sm:text-xl max-w-2xl mx-auto">
            Découvrez notre collection de jeux incroyables
          </p>
        </div>

        {/* Search and Filter section */}
        <div className="mb-8 sm:mb-12 flex flex-col xl:flex-row gap-6 lg:gap-8 items-start">
          {/* Filter component */}
          <div className="w-full xl:w-96 shrink-0">
            <div className="bg-midnight/70 backdrop-blur-md p-6 rounded-xl border border-ivory/10 shadow-lg hover-lift">
              <FilterSideBar />
            </div>
          </div>

          {/* Search bar */}
          <div className="flex-1 min-w-0">
            <SearchBar />
          </div>
        </div>

        {/* Coupon banner */}
        <div className="mb-8 sm:mb-12">
          <CouponSection />
        </div>

        {/* Games grid - full width */}
        <div className="w-full">
          <AllGames />
        </div>
      </div>
    </main>
  );
}
