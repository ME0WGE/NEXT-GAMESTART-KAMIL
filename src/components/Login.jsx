"use client";

import {
  authLogin,
  authRegister,
  authResetError,
  authSetMail,
  authSetName,
  authSetPassword,
} from "@/lib/features/authSlice";
import { Cross, CrossIcon, User, X, XCircle } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

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

export default function Login() {
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const [modal, setModal] = useState(false);
  const [toggle, setToggle] = useState(false);
  const [toast, setToast] = useState({
    show: false,
    message: "",
    type: "success",
  });
  const toastTimeout = useRef();

  const handleModal = () => {
    setModal(true);
    setToggle(!toggle);
  };

  useEffect(() => {
    setModal(false);
  }, [auth.user.isConnected]);

  // Affiche le toast de bienvenue lors de la connexion
  useEffect(() => {
    if (auth.user.isConnected) {
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
  }, [auth.user.isConnected]);

  // Affiche le toast d'erreur lors d'une erreur
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

  return (
    <>
      {toast.show && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast((t) => ({ ...t, show: false }))}
        />
      )}
      {auth.user.isConnected ? (
        <h1>Connected as {auth.user.name}</h1>
      ) : (
        <>
          <button className="text-slate-300 hover:text-blue-400 hover:bg-slate-800 p-2 rounded-full transition-all duration-200">
            <User size={20} onClick={handleModal} />
          </button>
          {modal &&
            (toggle ? (
              <div className="absolute left-1/2 top-12 -translate-x-1/2 z-50 w-80 bg-slate-900 sm:bg-slate-900/90 rounded-xl shadow-lg p-6 border border-gray-700 flex flex-col gap-3">
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
                <p className="text-center text-gray-400 text-sm">
                  ou inscrivez-vous avec
                </p>
                <div className="flex justify-center gap-2">
                  <span className="cursor-pointer hover:text-blue-400 text-gray-300">
                    Google
                  </span>
                  <span className="cursor-pointer hover:text-blue-400 text-gray-300">
                    Facebook
                  </span>
                  <span className="cursor-pointer hover:text-blue-400 text-gray-300">
                    Github
                  </span>
                </div>
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
                  <p className="text-red-400 text-center">
                    {auth.error.register}
                  </p>
                ) : (
                  ""
                )}
              </div>
            ) : (
              <div className="absolute left-1/2 top-12 -translate-x-1/2 z-50 w-80 bg-slate-900 sm:bg-slate-900/90 rounded-xl shadow-lg p-6 border border-gray-700 flex flex-col gap-3">
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
                <p className="text-center text-gray-400 text-sm">
                  ou connectez-vous avec
                </p>
                <div className="flex justify-center gap-2">
                  <span className="cursor-pointer hover:text-blue-400 text-gray-300">
                    Google
                  </span>
                  <span className="cursor-pointer hover:text-blue-400 text-gray-300">
                    Facebook
                  </span>
                  <span className="cursor-pointer hover:text-blue-400 text-gray-300">
                    Github
                  </span>
                </div>
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
      )}
    </>
  );
}
