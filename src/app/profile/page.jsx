"use client";

import ProfileInfo from "@/components/ProfileInfo/ProfileInfo";
import ProfileOrders from "@/components/ProfileOrders/ProfileOrders";
import ProtectedRoute from "@/components/ProtectedRoute";
import AddCreditsModal from "@/components/AddCreditsModal";
import { useSelector } from "react-redux";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { CreditCard, Plus } from "lucide-react";

export default function Profile() {
  const { user, isLoading } = useSelector((state) => state.auth);
  const { data: session } = useSession();
  const [isCreditsModalOpen, setIsCreditsModalOpen] = useState(false);

  // Show loading state if data is loading
  if (isLoading) {
    return (
      <div className="profile-page min-h-screen bg-neutral-900 text-neutral-100 flex flex-col items-center justify-center pt-16">
        <div className="animate-pulse text-xl">Loading profile data...</div>
      </div>
    );
  }

  return (
    <ProtectedRoute redirectTo="/profile">
      <div className="profile-page min-h-screen bg-neutral-900 text-neutral-100 flex flex-col pt-16">
        <div className="max-w-5xl mx-auto w-full px-8">
          <div className="bg-neutral-800 shadow-lg flex flex-col overflow-hidden">
            {/* Profile Banner */}
            <section className="py-8 px-8 border-b border-neutral-700">
              <div className="profile-banner-content flex items-start justify-between">
                <div className="profile-avatar-section flex items-center gap-6">
                  <div className="avatar w-28 h-28 rounded-md border-4 border-neutral-950 bg-neutral-700 shadow-lg overflow-hidden">
                    {(user.avatar_url || session?.user?.image) && (
                      <img
                        src={user.avatar_url || session?.user?.image}
                        alt="Profile"
                        className="w-full h-full object-cover"
                      />
                    )}
                  </div>
                  <div className="user-details flex flex-col gap-1">
                    <h2 className="username text-3xl font-semibold leading-tight">
                      {user.name || session?.user?.name || "Username"}
                    </h2>
                    <p className="email text-neutral-400">
                      {user.email || session?.user?.email || ""}
                    </p>
                    <p className="description text-neutral-300 text-lg mt-2">
                      {user.description || "No description provided"}
                    </p>
                  </div>
                </div>
                <div className="profile-settings-section flex flex-col gap-4">
                  {/* Credit Balance Display */}
                  <div className="bg-neutral-700/50 rounded-lg p-4 border border-neutral-600">
                    <div className="flex items-center gap-2 mb-2">
                      <CreditCard size={16} className="text-pine" />
                      <span className="text-sm font-medium text-neutral-300">
                        Solde de crédit
                      </span>
                    </div>
                    <p className="text-2xl font-bold text-white">
                      {(user.creditBalance || 0).toFixed(2)} €
                    </p>
                    <button
                      onClick={() => setIsCreditsModalOpen(true)}
                      className="mt-3 w-full flex items-center justify-center gap-2 px-4 py-2 bg-pine text-white rounded-md hover:bg-pine/90 transition-colors text-sm font-medium">
                      <Plus size={16} />
                      Ajouter des crédits
                    </button>
                  </div>

                  <ProfileInfo />
                </div>
              </div>
            </section>
            {/* Main Content */}
            <div className="flex items-stretch">
              <main className="flex-1 p-6">
                <ProfileOrders />
              </main>
            </div>
          </div>
        </div>

        {/* Add Credits Modal */}
        <AddCreditsModal
          isOpen={isCreditsModalOpen}
          onClose={() => setIsCreditsModalOpen(false)}
        />
      </div>
    </ProtectedRoute>
  );
}
