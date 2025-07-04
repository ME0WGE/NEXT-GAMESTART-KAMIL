"use client";

import {
  authRegister,
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
  const [toggle, setToggle] = useState(true);

  const handleModal = () => {
    setModal(true);
    setToggle(!toggle);
  };

  return (
    <>
      {auth.user.isConnected ? (
        <h1>Connected as {auth.user}</h1>
      ) : (
        <>
          <User size={20} onClick={handleModal} />
          {modal &&
            (toggle ? (
              <div className="absolute">
                <span onClick={() => setModal(false)}>
                  <X size={20} />
                </span>
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
                <p>ou s'inscrire avec</p>
                <span>Google</span>
                <span>Facebook</span>
                <span>Github</span>
              </div>
            ) : (
              ""
            ))}
        </>
      )}
    </>
  );
}
