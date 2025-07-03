"use client";

import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useState } from "react";

export default function Footer() {
  const [newsletterSuccess, setNewsletterSuccess] = useState(false);
  const handleNewsletter = (e) => {
    e.preventDefault();
    setNewsletterSuccess(true);
    setTimeout(() => setNewsletterSuccess(false), 2500);
  };

  return (
    <>
      <footer className="bg-gradient-to-t from-yellow-50 via-white to-white dark:from-gray-900 dark:via-gray-900 dark:to-gray-800 transition-colors duration-500">
        <div className="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
          <div className="md:flex md:justify-between">
            <div className="mb-6 md:mb-0 pr-12 transition-all duration-100 translate-y-8">
              <Link href={"/"} className="flex items-center">
                <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
                  GameStart
                </span>
              </Link>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-5 gap-2 md:gap-0">
              <div className="transition-all duration-100 translate-y-8 hover:scale-105 hover:shadow-lg rounded-lg mb-2">
                <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white cursor-default">
                  Général
                </h2>
                <ul className="text-gray-500 dark:text-gray-400 font-medium">
                  <li className="mb-4">
                    <Link href={"/"} className="inline-block group">
                      <p className="relative inline-block after:content-[''] after:block after:absolute after:left-0 after:bottom-0 after:h-[2px] after:bg-yellow-400 after:w-0 after:transition-all after:duration-300 group-hover:after:w-full">
                        Accueil
                      </p>
                    </Link>
                  </li>
                  <li className="mb-4">
                    <Link href={"/"} className="inline-block group">
                      <p className="relative inline-block after:content-[''] after:block after:absolute after:left-0 after:bottom-0 after:h-[2px] after:bg-yellow-400 after:w-0 after:transition-all after:duration-300 group-hover:after:w-full">
                        Boutique
                      </p>
                    </Link>
                  </li>
                  <li className="mb-4">
                    <Link href={"/"} className="inline-block group">
                      <p className="relative inline-block after:content-[''] after:block after:absolute after:left-0 after:bottom-0 after:h-[2px] after:bg-yellow-400 after:w-0 after:transition-all after:duration-300 group-hover:after:w-full">
                        Panier
                      </p>
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="transition-all duration-100 translate-y-8 hover:scale-105 hover:shadow-lg rounded-lg mb-2">
                <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white cursor-default">
                  Compte
                </h2>
                <ul className="text-gray-500 dark:text-gray-400 font-medium">
                  <li className="mb-4">
                    <Link href={"/"} className="inline-block group">
                      <p className="relative inline-block after:content-[''] after:block after:absolute after:left-0 after:bottom-0 after:h-[2px] after:bg-yellow-400 after:w-0 after:transition-all after:duration-300 group-hover:after:w-full">
                        Mon Compte
                      </p>
                    </Link>
                  </li>
                  <li className="mb-4">
                    <Link href={"/"} className="inline-block group">
                      <p className="relative inline-block after:content-[''] after:block after:absolute after:left-0 after:bottom-0 after:h-[2px] after:bg-yellow-400 after:w-0 after:transition-all after:duration-300 group-hover:after:w-full">
                        Ma bibliothèque
                      </p>
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="transition-all duration-100 translate-y-8 hover:scale-105 hover:shadow-lg rounded-lg mb-2">
                <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white cursor-default">
                  Contact
                </h2>
                <ul className="text-gray-500 dark:text-gray-400 font-medium list-none p-0 m-0">
                  <li className="mb-4">
                    <Link
                      href={"https://github.com/me0wge"}
                      target="_blank"
                      className="inline-block group">
                      <p className="relative inline-block after:content-[''] after:block after:absolute after:left-0 after:bottom-0 after:h-[2px] after:bg-yellow-400 after:w-0 after:transition-all after:duration-300 group-hover:after:w-full">
                        GitHub
                      </p>
                    </Link>
                  </li>
                  <li className="mb-4">
                    <Link
                      href={"https://www.linkedin.com/in/kamil-baldyga/"}
                      target="_blank"
                      className="inline-block group">
                      <p className="relative inline-block after:content-[''] after:block after:absolute after:left-0 after:bottom-0 after:h-[2px] after:bg-yellow-400 after:w-0 after:transition-all after:duration-300 group-hover:after:w-full">
                        LinkedIn
                      </p>
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="transition-all duration-200 translate-y-8 hover:scale-105 hover:shadow-lg rounded-lg mb-6">
                <h2 className="mb-4 text-sm font-semibold text-gray-900 uppercase dark:text-white cursor-default">
                  Newsletter
                </h2>
                <p className="mb-2 text-gray-500 dark:text-gray-400 text-xs cursor-default">
                  Promotions qui choquent, nouvelles sorties et actualités
                  directement dans votre boîte mail !
                </p>
                <form
                  className="flex flex-col sm:flex-row gap-2"
                  onSubmit={handleNewsletter}>
                  <input
                    type="email"
                    required
                    placeholder="Votre email..."
                    className="rounded-lg px-3 py-2 text-sm border border-gray-300 focus:outline-none focus:ring-4 focus:ring-yellow-300 dark:bg-gray-800 dark:text-white dark:border-gray-700 transition-all duration-300 shadow-sm focus:shadow-yellow-200 max-w-full sm:flex-1"
                  />
                  <button
                    type="submit"
                    className="rounded-lg bg-yellow-400 hover:bg-yellow-500 text-white font-semibold px-4 py-2 text-sm transition-all duration-200 relative overflow-hidden focus:outline-none focus:ring-2 focus:ring-yellow-400 animate-pulse-once flex-shrink-0 min-w-[90px] max-w-full">
                    <span className="relative z-10">S'inscrire</span>
                  </button>
                </form>
                {newsletterSuccess && (
                  <div className="mt-3 px-4 py-2 bg-blue-500 text-white rounded-lg shadow-lg animate-toast-in text-sm font-semibold inline-block absolute lg:top-[8rem] left-0">
                    Inscription réussie !
                  </div>
                )}
              </div>
            </div>
          </div>
          <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
          <div className="sm:flex sm:items-center sm:justify-between">
            <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400 cursor-default">
              © 2025 GameStart™. Projet à but éducatif. Réalisé par{" "}
              <span className="font-bold text-yellow-400">Kamil Baldyga</span>
            </span>
            <div className="flex mt-4 sm:justify-center sm:mt-0 gap-2">
              <Link href={"https://github.com/me0wge"} target="_blank">
                <span className="text-gray-500 hover:text-gray-900 dark:hover:text-white ms-5 text-2xl">
                  <FontAwesomeIcon icon={faGithub} />
                </span>
              </Link>
              <Link
                href={"https://www.linkedin.com/in/kamil-baldyga/"}
                target="_blank">
                <span className="text-gray-500 hover:text-gray-900 dark:hover:text-white ms-5 text-2xl">
                  <FontAwesomeIcon icon={faLinkedin} />
                </span>
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
