import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

export default function CopyrightDisclaimer() {
  return (
    <>
      <div className="sm:flex sm:items-center sm:justify-between">
        <span className="text-sm text-cyan-300 sm:text-center font-mono tracking-wider cursor-default">
          <span className="text-fuchsia-400">[</span>© 2025 GAMESTART™ •
          EDUCATIONAL PROJECT • CREATED BY{" "}
          <span className="font-black text-cyan-400 neon-text">
            KAMIL BALDYGA
          </span>
          <span className="text-purple-400">]</span>
        </span>
        <div className="flex mt-4 sm:justify-center sm:mt-0 gap-2">
          <Link
            href={"https://github.com/me0wge"}
            target="_blank"
            className="group">
            <span className="text-cyan-300 hover:text-cyan-400 ms-5 text-2xl transition-colors duration-200 relative">
              <FontAwesomeIcon
                icon={faGithub}
                className="group-hover:scale-110 transition-transform duration-200"
              />
              {/* Neon glow effect */}
              <div className="absolute inset-0 bg-cyan-400/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </span>
          </Link>
          <Link
            href={"https://www.linkedin.com/in/kamil-baldyga/"}
            target="_blank"
            className="group">
            <span className="text-cyan-300 hover:text-cyan-400 ms-5 text-2xl transition-colors duration-200 relative">
              <FontAwesomeIcon
                icon={faLinkedin}
                className="group-hover:scale-110 transition-transform duration-200"
              />
              {/* Neon glow effect */}
              <div className="absolute inset-0 bg-cyan-400/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </span>
          </Link>
        </div>
      </div>
    </>
  );
}
