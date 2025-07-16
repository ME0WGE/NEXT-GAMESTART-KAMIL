import FilterSideBar from "@/components/FilterSideBar/FilterSideBar";
import AllGames from "@/components/AllGames/AllGames";
import SearchBar from "@/components/SearchBar/SearchBar";
import CouponSection from "@/components/CouponSection/CouponSection";
import { Gamepad } from "lucide-react";

export default function Games() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-midnight to-midnight/90">
      <div className="container mx-auto px-4 py-24">
        {/* Header section */}
        <div className="mb-8 text-center">
          <div className="flex items-center justify-center mb-2">
            <Gamepad className="text-rosy mr-2" size={28} />
            <h1 className="text-3xl font-bold text-ivory">Catalogue de jeux</h1>
          </div>
          <p className="text-ivory/70">
            Découvrez notre collection de jeux incroyables
          </p>
        </div>

        {/* Search bar*/}
        <div className="mb-8 max-w-2xl mx-auto">
          <SearchBar />
        </div>

        {/* Coupon banner */}
        <div className="mb-8">
          <CouponSection />
        </div>

        {/* Main content area with responsive layout */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar with filters */}
          <aside className="w-full lg:w-64 shrink-0">
            <div className="sticky top-24 bg-midnight/70 backdrop-blur-md p-4 rounded-lg border border-ivory/10">
              <FilterSideBar />
            </div>
          </aside>

          {/* Games grid */}
          <div className="flex-1">
            <AllGames />
          </div>
        </div>
      </div>
    </main>
  );
}
