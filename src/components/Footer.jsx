import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

export default function Footer() {
  return (
    <>
      <footer className="bg-white dark:bg-gray-900">
        <div className="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
          <div className="md:flex md:justify-between">
            <div className="mb-6 md:mb-0">
              <Link href={"/"} className="flex items-center">
                <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
                  GameStart
                </span>
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">
              <div>
                <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">
                  GameStart
                </h2>
                <ul className="text-gray-500 dark:text-gray-400 font-medium">
                  <Link href={"/"}>
                    <li className="mb-4">
                      <p className="hover:underline">Accueil</p>
                    </li>
                  </Link>
                  <Link href={"/"}>
                    <li className="mb-4">
                      <p className="hover:underline">Boutique</p>
                    </li>
                  </Link>
                  <Link href={"/"}>
                    <li className="mb-4">
                      <p className="hover:underline">Panier</p>
                    </li>
                  </Link>
                </ul>
              </div>
              <div>
                <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">
                  Compte
                </h2>
                <ul className="text-gray-500 dark:text-gray-400 font-medium">
                  <Link href={"/"}>
                    <li className="mb-4">
                      <p className="hover:underline">Mon Compte</p>
                    </li>
                  </Link>
                  <Link href={"/"}>
                    <li className="mb-4">
                      <p className="hover:underline">Ma bibliothèque</p>
                    </li>
                  </Link>
                </ul>
              </div>
              <div>
                <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">
                  Contact
                </h2>
                <ul className="text-gray-500 dark:text-gray-400 font-medium list-none p-0 m-0">
                  <Link href={"https://github.com/me0wge"} target="_blank">
                    <li className="mb-4">
                      <p className="hover:underline">GitHub</p>
                    </li>
                  </Link>
                  <Link
                    href={"https://www.linkedin.com/in/kamil-baldyga/"}
                    target="_blank">
                    <li className="mb-4">
                      <p className="hover:underline">LinkedIn</p>
                    </li>
                  </Link>
                </ul>
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
