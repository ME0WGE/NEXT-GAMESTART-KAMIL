"use client";

import { useEffect, useState } from "react";
import SearchBar from "../SearchBar/SearchBar";
import { useDispatch, useSelector } from "react-redux";
import AllGames from "../AllGames/AllGames";
import CouponSection from "../CouponSection/CouponSection";

export default function FilterSideBar() {
  const dispatch = useDispatch();
  const search = useSelector((state) => state.search);

  const [filter, setFilter] = useState("");
  const [category, setCategory] = useState("");

  const handleFilter = (e) => {
    return setCategory(e.target.value);
  };

  // useEffect(() => {
  //   setFilter(category);
  // }, [handleClick]);

  return (
    <>
      <div className="flex flex-col text-start text-ivory">
        <SearchBar />
        <span>Filter</span>
        <ul className="flex flex-col w-max gap-2">
          <li className="text-start cursor-pointer">Title</li>
          <li className="text-start cursor-pointer">Genre</li>
          <li className="text-start cursor-pointer">Publisher</li>
        </ul>
        <CouponSection />
      </div>
      <div>
        <AllGames />
      </div>
    </>
  );
}

/**
 * Features:
 * 1. Filter side bar: Filter by title
 * 2. Filter side bar: Filter by category
 * 3. Filter side bar: Filter by publisher
 * LocalStorage
 */
