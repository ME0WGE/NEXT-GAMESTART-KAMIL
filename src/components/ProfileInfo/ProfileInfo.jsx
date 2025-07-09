"use client";

import { authSetDescription, authSetName } from "@/lib/features/authSlice";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function ProfileInfo() {
  const [profileModal, setProfileModal] = useState(false);
  const [toggle, setToggle] = useState(false);
  const dispatch = useDispatch();
  const description = useSelector((state) => state.auth.user.description);
  const name = useSelector((state) => state.auth.user.name);
  const handleModal = () => {
    setToggle(!toggle);
    setProfileModal(!profileModal);
  };

  const handleClickOutside = (e) => {
    if (e.target === e.currentTarget) {
      setProfileModal(false);
    }
  };

  const handleSave = (e) => {
    setProfileModal(!profileModal);
    dispatch(authSetDescription(e.target.description.value));
    dispatch(authSetName(e.target.name.value));
  };

  const handleChangeDescription = (e) => {
    dispatch(authSetDescription(e.target.value));
  };

  const handleChangeName = (e) => {
    dispatch(authSetName(e.target.value));
  };

  if (profileModal) {
    return (
      <div
        className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
        onClick={handleClickOutside}>
        <div className="bg-neutral-800 p-4 rounded-md">
          <h2 className="text-neutral-100 text-lg font-semibold mb-4">
            Edit Profile
          </h2>
          <form
            className="space-y-4"
            onSubmit={(e) => {
              e.preventDefault();
              handleSave(e);
            }}>
            <div className="flex flex-col gap-2">
              <label htmlFor="name" className="text-neutral-300">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                className="bg-neutral-800 text-neutral-100 px-4 py-2 rounded-md border border-neutral-700 focus:outline-none focus:border-rosy"
                placeholder="Enter your name"
                onChange={handleChangeName}
                value={name}
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="description" className="text-neutral-300">
                Description
              </label>
              <textarea
                id="description"
                name="description"
                className="bg-neutral-800 text-neutral-100 px-4 py-2 rounded-md border border-neutral-700 focus:outline-none focus:border-rosy"
                placeholder="Enter your description"
                onChange={handleChangeDescription}
                value={description}
              />
            </div>
            <button
              type="submit"
              className="bg-rosy text-neutral-900 px-4 py-2 rounded-md hover:bg-rosy/80 transition-colors duration-200 text-center font-mono text-sm w-full cursor-pointer">
              Save Changes
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <section className="profile-info">
      <ul className="profile-info-list space-y-3">
        <li className="flex justify-between text-neutral-300">
          <button
            className="bg-neutral-800 text-neutral-100 px-4 py-2 rounded-md hover:bg-plum/10 transition-colors duration-200 text-center font-mono text-sm hover:text-pine hover:border-rosy border-2 border-white w-35 cursor-pointer"
            onClick={handleModal}>
            Edit Profile
          </button>
        </li>
        <li className="flex justify-between text-neutral-300">
          <button className="bg-neutral-800 text-neutral-100 px-4 py-2 rounded-md hover:bg-plum/20 transition-colors duration-200 text-center font-mono text-sm hover:text-pine hover:border-rosy border-2 border-white w-35 cursor-pointer">
            Add Credits
          </button>
        </li>
      </ul>
    </section>
  );
}
