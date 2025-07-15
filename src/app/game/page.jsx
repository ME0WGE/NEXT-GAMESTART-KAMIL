"use client";

import Link from "next/link";

export default function Game() {
  return (
    <>
      <div className="pt-20">
        <h1>
          Découvrez nos promotions LUNAIRES et notre sélection des jeux vidéos!
        </h1>
        or contact support
        <Link href={"/"}>
          <button>Cliquez-moi!</button>
        </Link>
      </div>
    </>
  );
}
