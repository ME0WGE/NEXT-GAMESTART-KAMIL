"use client";

import {
  updateUserDescription,
  addUserCredits,
} from "@/lib/features/authSlice";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { X, CreditCard, Wallet, PlusCircle } from "lucide-react";
import { useSession } from "next-auth/react";

export default function ProfileInfo() {
  const [profileModal, setProfileModal] = useState(false);
  const [creditsModal, setCreditsModal] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });
  const [creditAmount, setCreditAmount] = useState("");
  const [creditError, setCreditError] = useState("");

  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const isLoading = useSelector((state) => state.auth.isLoading);
  const { data: session } = useSession();

  // Initialize form data from user when modal opens
  const handleProfileModal = () => {
    setFormData({
      name: user.name || session?.user?.name || "",
      description: user.description || "",
    });
    setProfileModal(!profileModal);
  };

  // Open credits modal
  const handleCreditsModal = () => {
    setCreditAmount("");
    setCreditError("");
    setCreditsModal(!creditsModal);
  };

  const handleClickOutside = (e) => {
    if (e.target === e.currentTarget) {
      setProfileModal(false);
      setCreditsModal(false);
    }
  };

  const handleSave = (e) => {
    e.preventDefault();

    if (!user.id) {
      alert("Please wait for user data to synchronize");
      return;
    }

    dispatch(
      updateUserDescription({
        userId: user.id,
        name: formData.name,
        description: formData.description,
      })
    ).then(() => {
      setProfileModal(false);
    });
  };

  const handleAddCredits = (e) => {
    e.preventDefault();
    setCreditError("");

    // Validate input
    const amount = parseFloat(creditAmount);
    if (isNaN(amount) || amount <= 0) {
      setCreditError("Please enter a valid amount greater than 0");
      return;
    }

    if (!user.id) {
      setCreditError("Please wait for user data to synchronize");
      return;
    }

    dispatch(
      addUserCredits({
        userId: user.id,
        amount,
      })
    )
      .unwrap()
      .then(() => {
        setCreditsModal(false);
      })
      .catch((error) => {
        setCreditError(error || "Failed to add credits");
      });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const isOAuthUser = !!session && !user.id;

  // Profile Edit Modal
  if (profileModal) {
    return (
      <div
        className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
        onClick={handleClickOutside}>
        <div className="bg-neutral-800 p-6 rounded-md w-full max-w-md shadow-lg">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-neutral-100 text-xl font-semibold">
              Edit Profile
            </h2>
            <button
              className="text-neutral-400 hover:text-neutral-100"
              onClick={() => setProfileModal(false)}>
              <X size={20} />
            </button>
          </div>
          {isOAuthUser ? (
            <div className="text-neutral-300 p-4 bg-neutral-700/50 rounded-md">
              <p>
                Your profile is being synchronized. Please try again in a
                moment.
              </p>
            </div>
          ) : (
            <form className="space-y-4" onSubmit={handleSave}>
              <div className="flex flex-col gap-2">
                <label htmlFor="name" className="text-neutral-300">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="bg-neutral-700 text-neutral-100 px-4 py-2 rounded-md border border-neutral-600 focus:outline-none focus:border-rosy"
                  placeholder="Enter your name"
                  onChange={handleChange}
                  value={formData.name}
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="description" className="text-neutral-300">
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  className="bg-neutral-700 text-neutral-100 px-4 py-2 rounded-md border border-neutral-600 focus:outline-none focus:border-rosy"
                  placeholder="Enter your description"
                  onChange={handleChange}
                  value={formData.description}
                  rows={4}
                />
              </div>
              <button
                type="submit"
                disabled={isLoading}
                className="bg-rosy text-neutral-900 px-4 py-2 rounded-md hover:bg-rosy/80 transition-colors duration-200 text-center font-mono text-sm w-full cursor-pointer">
                {isLoading ? "Saving..." : "Save Changes"}
              </button>
            </form>
          )}
        </div>
      </div>
    );
  }

  // Credits Modal
  if (creditsModal) {
    return (
      <div
        className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
        onClick={handleClickOutside}>
        <div className="bg-neutral-800 p-6 rounded-md w-full max-w-md shadow-lg">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-neutral-100 text-xl font-semibold flex items-center">
              <Wallet className="mr-2" size={20} />
              Add Credits
            </h2>
            <button
              className="text-neutral-400 hover:text-neutral-100"
              onClick={() => setCreditsModal(false)}>
              <X size={20} />
            </button>
          </div>

          <div className="mb-4 p-3 bg-neutral-700/30 rounded-md">
            <div className="flex items-center justify-between">
              <span className="text-neutral-300">Current Balance:</span>
              <span className="text-pine font-bold">
                ${user.credits?.toFixed(2) || "0.00"}
              </span>
            </div>
          </div>

          <form className="space-y-4" onSubmit={handleAddCredits}>
            <div className="flex flex-col gap-2">
              <label htmlFor="creditAmount" className="text-neutral-300">
                Amount to Add
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400">
                  $
                </span>
                <input
                  type="number"
                  id="creditAmount"
                  name="creditAmount"
                  min="1"
                  step="0.01"
                  className="bg-neutral-700 text-neutral-100 pl-8 pr-4 py-2 rounded-md border border-neutral-600 focus:outline-none focus:border-pine w-full"
                  placeholder="0.00"
                  value={creditAmount}
                  onChange={(e) => setCreditAmount(e.target.value)}
                />
              </div>
              {creditError && (
                <p className="text-red-400 text-sm">{creditError}</p>
              )}
            </div>

            <div className="bg-neutral-700/30 p-3 rounded-md text-sm text-neutral-400">
              <p>This is a simulation. No actual payment will be processed.</p>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="bg-pine text-white px-4 py-2 rounded-md hover:bg-pine/80 transition-colors duration-200 text-center font-mono text-sm w-full cursor-pointer flex items-center justify-center">
              {isLoading ? (
                "Processing..."
              ) : (
                <>
                  <PlusCircle className="mr-2" size={16} />
                  Add Credits
                </>
              )}
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
            onClick={handleProfileModal}>
            Edit Profile
          </button>
        </li>
        <li className="flex justify-between text-neutral-300">
          <button
            className="bg-neutral-800 text-neutral-100 px-4 py-2 rounded-md hover:bg-plum/20 transition-colors duration-200 text-center font-mono text-sm hover:text-pine hover:border-rosy border-2 border-white w-35 cursor-pointer flex items-center justify-center"
            onClick={handleCreditsModal}>
            <CreditCard size={16} className="mr-2" />
            Add Credits
            <span className="ml-2 bg-pine/20 text-pine px-2 py-0.5 rounded-full text-xs">
              ${user.credits?.toFixed(2) || "0.00"}
            </span>
          </button>
        </li>
      </ul>
    </section>
  );
}
