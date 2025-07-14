import FilterSideBar from "@/components/FilterSideBar/FilterSideBar";
import SearchBar from "@/components/SearchBar/SearchBar";

export default function Library() {
  return (
    <>
      <div className="flex flex-row pt-40 justify-center h-screen bg-slate">
        <SearchBar />
      </div>
    </>
  );
}

/**
 * Layout:
 * 1. Filter side bar
 * 2. SearchBar
 * 3. Game cards section
 */
