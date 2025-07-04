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

export default function Login() {
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const [modal, setModal] = useState(false);
  const [toggle, setToggle] = useState(false);

  const handleModal = () => {
    setModal(true);
    setToggle(!toggle);
  };

  useEffect(() => {
    setModal(false);
  }, [auth.user.isConnected]);

  return (
    <>
      {auth.user.isConnected ? (
        <h1>Connected as {auth.user.name}</h1>
      ) : (
        <>
          <button className="text-slate-300 hover:text-blue-400 hover:bg-slate-800 p-2 rounded-full transition-all duration-200">
            <User size={20} onClick={handleModal} />
          </button>
          {modal &&
            (toggle ? (
              <div className="absolute top-10">
                <span onClick={() => setModal(false)}>
                  <X size={20} />
                </span>
                <h2>Inscription</h2>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    dispatch(authRegister());
                  }}>
                  <input
                    required
                    type="text"
                    placeholder="Nom"
                    value={auth.setName}
                    onChange={(e) => dispatch(authSetName(e.target.value))}
                  />
                  <input
                    required
                    type="email"
                    placeholder="Mail"
                    value={auth.setMail}
                    onChange={(e) => dispatch(authSetMail(e.target.value))}
                  />
                  <input
                    required
                    type="password"
                    placeholder="Password"
                    value={auth.setPassword}
                    onChange={(e) => dispatch(authSetPassword(e.target.value))}
                  />
                  <button type="submit">S'inscrire</button>
                </form>
                <p>ou inscrivez-vous avec</p>
                <span>Google</span>
                <span>Facebook</span>
                <span>Github</span>
                <p>Vous avez déjà un compte?</p>
                <span
                  className="cursor-pointer"
                  onClick={() => {
                    dispatch(authResetError());
                    setToggle(false);
                  }}>
                  Connectez-vous
                </span>
                {auth.isError ? <p>{auth.error.register}</p> : ""}
              </div>
            ) : (
              <div className="absolute top-10">
                <span onClick={() => setModal(false)}>
                  <X size={20} />
                </span>
                <h2>Connexion</h2>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    dispatch(authLogin());
                  }}>
                  <input
                    required
                    type="email"
                    placeholder="Mail"
                    value={auth.setMail}
                    onChange={(e) => dispatch(authSetMail(e.target.value))}
                  />
                  <input
                    required
                    type="password"
                    placeholder="Password"
                    value={auth.setPassword}
                    onChange={(e) => dispatch(authSetPassword(e.target.value))}
                  />
                  <button type="submit">Se connecter</button>
                </form>
                <p>ou connectez-vous avec</p>
                <span>Google</span>
                <span>Facebook</span>
                <span>Github</span>
                <p>Vous n'avez pas encore de compte?</p>
                <span
                  className="cursor-pointer"
                  onClick={() => {
                    dispatch(authResetError());
                    setToggle(true);
                  }}>
                  Inscrivez-vous
                </span>
                {auth.isError ? <p>{auth.error.login}</p> : ""}
              </div>
            ))}
        </>
      )}
    </>
  );
}
