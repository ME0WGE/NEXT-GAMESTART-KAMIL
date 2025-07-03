import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

export default function Footer() {
  return (
    <>
      <footer className="bg-white dark:bg-gray-900">
        <div className="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
          <div className="md:flex md:justify-between">
            <div className="mb-6 md:mb-0 pr-12">
              <Link href={"/"} className="flex items-center">
                <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
                  GameStart
                </span>
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-1 sm:gap-1 md:grid-cols-4 lg:grid-cols-5">
              <div>
                <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">
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
              <div>
                <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">
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
              <div>
                <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">
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
              {/* Newsletter Section */}
              <div>
                <h2 className="mb-4 text-sm font-semibold text-gray-900 uppercase dark:text-white">
                  Newsletter
                </h2>
                <p className="mb-2 text-gray-500 dark:text-gray-400 text-xs">
                  Recevez les dernières promos et nouveautés directement dans
                  votre boîte mail !
                </p>
                <form className="flex flex-col sm:flex-row gap-2">
                  <input
                    type="email"
                    required
                    placeholder="Votre email..."
                    className="rounded-lg px-3 py-2 text-sm border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400 dark:bg-gray-800 dark:text-white dark:border-gray-700"
                  />
                  <button
                    type="submit"
                    className="rounded-lg bg-yellow-400 hover:bg-yellow-500 text-white font-semibold px-4 py-2 text-sm transition-colors duration-200">
                    S'inscrire
                  </button>
                </form>
              </div>
            </div>
          </div>
          <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
          <div className="sm:flex sm:items-center sm:justify-between">
            <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
              © 2025{" "}
              <a href="https://flowbite.com/" className="hover:underline">
                GameStart™
              </a>
              . Projet à but éducatif. Réalisé par Kamil Baldyga
            </span>
            <div className="flex mt-4 sm:justify-center sm:mt-0 gap-2">
              <Link href={"https://github.com/me0wge"} target="_blank">
                <span className="text-gray-500 hover:text-gray-900 dark:hover:text-white ms-5">
                  <FontAwesomeIcon icon={faGithub} />
                </span>
              </Link>
              <Link
                href={"https://www.linkedin.com/in/kamil-baldyga/"}
                target="_blank">
                <span className="text-gray-500 hover:text-gray-900 dark:hover:text-white ms-5">
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
