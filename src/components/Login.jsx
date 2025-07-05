"use client";

import {
  authLogin,
  authLogout,
  authRegister,
  authResetError,
  authSetMail,
  authSetName,
  authSetPassword,
} from "@/lib/features/authSlice";
import { User, X } from "lucide-react";
import { signIn, signOut, useSession } from "next-auth/react";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGoogle,
  faFacebook,
  faGithub,
} from "@fortawesome/free-brands-svg-icons";

// Toast Message
function Toast({ message, type, onClose }) {
  return (
    <div
      className={`fixed top-6 left-1/2 -translate-x-1/2 z-[100] px-6 py-3 rounded shadow-lg text-white text-center transition-all duration-300
        ${type === "success" ? "bg-green-600" : "bg-red-600"}`}
      role="alert">
      {message}
      <button
        className="ml-4 text-white/80 hover:text-white font-bold"
        onClick={onClose}
        aria-label="Fermer le toast">
        ×
      </button>
    </div>
  );
}

// Social Login Buttons
function SocialLoginButtons() {
  return (
    <div className="flex flex-col gap-3">
      {/* Google Button */}
      <button
        className="flex items-center justify-center gap-3 w-full py-3 px-4 bg-white text-gray-700 rounded-lg border border-gray-300 hover:bg-gray-50 hover:shadow-md transition-all duration-200 font-medium"
        onClick={() => console.log("Google login not implemented yet")}>
        <FontAwesomeIcon icon={faGoogle} className="text-red-500 text-lg" />
        <span>Continuer avec Google</span>
      </button>

      {/* Facebook Button */}
      <button
        className="flex items-center justify-center gap-3 w-full py-3 px-4 bg-[#1877F2] text-white rounded-lg hover:bg-[#166FE5] hover:shadow-md transition-all duration-200 font-medium"
        onClick={() => console.log("Facebook login not implemented yet")}>
        <FontAwesomeIcon icon={faFacebook} className="text-white text-lg" />
        <span>Continuer avec Facebook</span>
      </button>

      {/* GitHub Button */}
      <button
        className="flex items-center justify-center gap-3 w-full py-3 px-4 bg-gray-900 text-white rounded-lg hover:bg-gray-800 hover:shadow-md transition-all duration-200 font-medium border border-gray-700"
        onClick={() => signIn("github")}>
        <FontAwesomeIcon icon={faGithub} className="text-white text-lg" />
        <span>Continuer avec GitHub</span>
      </button>
    </div>
  );
}

// Main function
export default function Login() {
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const { data: session, status } = useSession();

  const [modal, setModal] = useState(false);
  const [profileModal, setProfileModal] = useState(false);
  const [toggle, setToggle] = useState(false);
  const [toast, setToast] = useState({
    show: false,
    message: "",
    type: "success",
  });
  const toastTimeout = useRef();
  const modalRef = useRef(null);
  const profileRef = useRef(null);

  const handleModal = () => {
    setModal(true);
    setToggle(!toggle);
  };

  // If user is connected, close modal
  useEffect(() => {
    setModal(false);
  }, [auth.user.isConnected]);

  // Close modal if clicked outside of its body
  useEffect(() => {
    if (!modal) return;
    function handleClickOutside(e) {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        setModal(false);
      }
    }
    window.addEventListener("mousedown", handleClickOutside);
    return () => window.removeEventListener("mousedown", handleClickOutside);
  }, [modal]);

  // Close profile dropdown if clicked outside
  useEffect(() => {
    if (!profileModal) return;
    function handleClickOutside(e) {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setProfileModal(false);
      }
    }
    window.addEventListener("mousedown", handleClickOutside);
    return () => window.removeEventListener("mousedown", handleClickOutside);
  }, [profileModal]);

  // Display welcome toast when user has succesfully connected
  useEffect(() => {
    if (session?.user) {
      setToast({
        show: true,
        message: `Bienvenue, ${session.user.name || session.user.username}`,
        type: "success",
      });
      toastTimeout.current = setTimeout(
        () => setToast((t) => ({ ...t, show: false })),
        3000
      );
    } else if (auth.user.isConnected) {
      setToast({
        show: true,
        message: `Bienvenue, ${auth.user.name}`,
        type: "success",
      });
      toastTimeout.current = setTimeout(
        () => setToast((t) => ({ ...t, show: false })),
        3000
      );
    }
    return () => clearTimeout(toastTimeout.current);
  }, [session?.user, auth.user.isConnected]);

  // Display error toast
  useEffect(() => {
    if (auth.isError && (auth.error.login || auth.error.register)) {
      setToast({
        show: true,
        message: auth.error.login || auth.error.register,
        type: "error",
      });
      toastTimeout.current = setTimeout(
        () => setToast((t) => ({ ...t, show: false })),
        3000
      );
    }
    return () => clearTimeout(toastTimeout.current);
  }, [auth.isError, auth.error.login, auth.error.register]);

  // If user is authenticated with NextAuth (GitHub)
  if (session?.user) {
    return (
      <>
        {toast.show && (
          <Toast
            message={toast.message}
            type={toast.type}
            onClose={() => setToast((t) => ({ ...t, show: false }))}
          />
        )}
        <div className="relative" ref={profileRef}>
          <div
            className="flex items-center text-slate-300 hover:text-blue-400 hover:bg-slate-800 p-2 rounded-full transition-all duration-200 cursor-pointer"
            onClick={() => setProfileModal(!profileModal)}>
            {/* Profile Picture */}
            {session.user.avatar_url ? (
              <Image
                src={session.user.avatar_url}
                alt="Profile"
                width={32}
                height={32}
                className="rounded-full mr-2"
              />
            ) : (
              <User size={20} className="mr-2" />
            )}

            {/* Username */}
            <span className="font-bold text-white">
              {session.user.username || session.user.name}
            </span>
          </div>

          {/* Profile Dropdown */}
          {profileModal && (
            <div className="absolute top-12 right-0 bg-slate-800 border border-slate-700 rounded-lg shadow-lg p-2 min-w-48 z-50">
              <div className="flex items-center p-2 border-b border-slate-700 mb-2">
                {session.user.avatar_url ? (
                  <Image
                    src={session.user.avatar_url}
                    alt="Profile"
                    width={40}
                    height={40}
                    className="rounded-full mr-3"
                  />
                ) : (
                  <User size={20} className="mr-3" />
                )}
                <div>
                  <p className="font-bold text-white">{session.user.name}</p>
                  <p className="text-sm text-gray-400">
                    @{session.user.username}
                  </p>
                </div>
              </div>
              <ul className="space-y-1">
                <li className="cursor-pointer px-2 py-1 hover:bg-slate-700 rounded text-sm">
                  Mon Profil
                </li>
                <li className="cursor-pointer px-2 py-1 hover:bg-slate-700 rounded text-sm">
                  Ma Bibliothèque
                </li>
                <li
                  className="cursor-pointer px-2 py-1 hover:bg-slate-700 rounded text-sm text-red-400 hover:text-red-300"
                  onClick={() => {
                    signOut();
                    setProfileModal(false);
                  }}>
                  Déconnexion
                </li>
              </ul>
            </div>
          )}
        </div>
      </>
    );
  }

  // If user is authenticated with email/password
  if (auth.user.isConnected) {
    return (
      <>
        {toast.show && (
          <Toast
            message={toast.message}
            type={toast.type}
            onClose={() => setToast((t) => ({ ...t, show: false }))}
          />
        )}
        <div className="relative" ref={profileRef}>
          <div
            className="flex items-center text-slate-300 hover:text-blue-400 hover:bg-slate-800 p-2 rounded-full transition-all duration-200 cursor-pointer"
            onClick={() => setProfileModal(!profileModal)}>
            {/* Profile Icon */}
            <User size={20} className="mr-2" />

            {/* Username */}
            <span className="font-bold text-white">{auth.user.name}</span>
          </div>

          {/* Profile Dropdown */}
          {profileModal && (
            <div className="absolute top-12 right-0 bg-slate-800 border border-slate-700 rounded-lg shadow-lg p-2 min-w-48 z-50">
              <div className="flex items-center p-2 border-b border-slate-700 mb-2">
                <User size={20} className="mr-3" />
                <div>
                  <p className="font-bold text-white">{auth.user.name}</p>
                  <p className="text-sm text-gray-400">{auth.user.mail}</p>
                </div>
              </div>
              <ul className="space-y-1">
                <li className="cursor-pointer px-2 py-1 hover:bg-slate-700 rounded text-sm">
                  Mon Profil
                </li>
                <li className="cursor-pointer px-2 py-1 hover:bg-slate-700 rounded text-sm">
                  Ma Bibliothèque
                </li>
                <li
                  className="cursor-pointer px-2 py-1 hover:bg-slate-700 rounded text-sm text-red-400 hover:text-red-300"
                  onClick={() => {
                    dispatch(authLogout());
                    setProfileModal(false);
                  }}>
                  Déconnexion
                </li>
              </ul>
            </div>
          )}
        </div>
      </>
    );
  }

  // If user is not authenticated
  return (
    <>
      {toast.show && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast((t) => ({ ...t, show: false }))}
        />
      )}
      <button className="text-slate-300 hover:text-blue-400 hover:bg-slate-800 p-2 rounded-full transition-all duration-200">
        <User size={20} onClick={handleModal} />
      </button>
      {modal &&
        (toggle ? ( // Inscription Modal
          <div
            ref={modalRef}
            className="fixed inset-0 z-50 w-full min-h-screen h-full bg-slate-900 flex flex-col justify-center p-4 rounded-none shadow-none sm:bg-slate-900/95 sm:absolute sm:left-1/2 sm:top-12 sm:-translate-x-1/2 sm:w-80 sm:h-auto sm:max-h-[90vh] sm:rounded-xl sm:shadow-lg sm:p-6 sm:border border-gray-700 sm:min-h-[55vh] sm:justify-start gap-3">
            <span
              onClick={() => setModal(false)}
              className="absolute top-3 right-3 cursor-pointer text-gray-400 hover:text-gray-200">
              <X size={20} />
            </span>
            <h2 className="text-xl font-semibold mb-4 text-center text-gray-100">
              Inscription
            </h2>
            <form
              className="flex flex-col gap-3"
              onSubmit={(e) => {
                e.preventDefault();
                dispatch(authRegister());
              }}>
              <input
                className="border border-gray-700 bg-gray-800 text-gray-100 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400"
                required
                type="text"
                placeholder="Nom"
                value={auth.setName}
                onChange={(e) => dispatch(authSetName(e.target.value))}
              />
              <input
                className="border border-gray-700 bg-gray-800 text-gray-100 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400"
                required
                type="email"
                placeholder="Mail"
                value={auth.setMail}
                onChange={(e) => dispatch(authSetMail(e.target.value))}
              />
              <input
                className="border border-gray-700 bg-gray-800 text-gray-100 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400"
                required
                type="password"
                placeholder="Password"
                value={auth.setPassword}
                onChange={(e) => dispatch(authSetPassword(e.target.value))}
              />
              <button
                className="bg-blue-600 text-white rounded py-2 mt-2 hover:bg-blue-700 transition"
                type="submit">
                S'inscrire
              </button>
            </form>
            <p className="text-center text-gray-400 text-sm">ou</p>
            <SocialLoginButtons />
            <p className="text-center text-gray-400 text-sm">
              Vous avez déjà un compte?
            </p>
            <span
              className="cursor-pointer text-blue-400 hover:underline text-center"
              onClick={() => {
                dispatch(authResetError());
                setToggle(false);
              }}>
              Connectez-vous
            </span>
            {auth.isError ? (
              <p className="text-red-400 text-center">{auth.error.register}</p>
            ) : (
              ""
            )}
          </div>
        ) : (
          // Connexion Modal
          <div
            ref={modalRef}
            className="fixed inset-0 z-50 w-full min-h-screen h-full bg-slate-900 flex flex-col justify-center p-4 rounded-none shadow-none sm:bg-slate-900/95 sm:absolute sm:left-1/2 sm:top-12 sm:-translate-x-1/2 sm:w-80 sm:h-auto sm:max-h-[90vh] sm:rounded-xl sm:shadow-lg sm:p-6 sm:border border-gray-700 sm:min-h-[50vh] sm:justify-start gap-3">
            <span
              onClick={() => setModal(false)}
              className="absolute top-3 right-3 cursor-pointer text-gray-400 hover:text-gray-200">
              <X size={20} />
            </span>
            <h2 className="text-xl font-semibold mb-4 text-center text-gray-100">
              Connexion
            </h2>
            <form
              className="flex flex-col gap-3"
              onSubmit={(e) => {
                e.preventDefault();
                dispatch(authLogin());
              }}>
              <input
                className="border border-gray-700 bg-gray-800 text-gray-100 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400"
                required
                type="email"
                placeholder="Mail"
                value={auth.setMail}
                onChange={(e) => dispatch(authSetMail(e.target.value))}
              />
              <input
                className="border border-gray-700 bg-gray-800 text-gray-100 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400"
                required
                type="password"
                placeholder="Password"
                value={auth.setPassword}
                onChange={(e) => dispatch(authSetPassword(e.target.value))}
              />
              <button
                className="bg-blue-600 text-white rounded py-2 mt-2 hover:bg-blue-700 transition"
                type="submit">
                Se connecter
              </button>
            </form>
            <p className="text-center text-gray-400 text-sm">ou</p>
            <SocialLoginButtons />
            <p className="text-center text-gray-400 text-sm">
              Vous n'avez pas encore de compte?
            </p>
            <span
              className="cursor-pointer text-blue-400 hover:underline text-center"
              onClick={() => {
                dispatch(authResetError());
                setToggle(true);
              }}>
              Inscrivez-vous
            </span>
            {auth.isError ? (
              <p className="text-red-400 text-center">{auth.error.login}</p>
            ) : (
              ""
            )}
          </div>
        ))}
    </>
  );
}
