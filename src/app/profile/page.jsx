"use client";

import ProfileInfo from "@/components/ProfileInfo/ProfileInfo";
import ProfileOrders from "@/components/ProfileOrders/ProfileOrders";
import { useSession } from "next-auth/react";
import { useDispatch, useSelector } from "react-redux";

export default function Profile() {
  const user = useSelector((state) => state.auth.user);
  // const description = useSelector((state) => state.auth.description);
  const dispatch = useDispatch();
  const { data: session, status } = useSession();

  // useEffect(() => {
  //   dispatch(authGetUser(user));
  // }, [dispatch]);

  return (
    <div className="profile-page min-h-screen bg-neutral-900 text-neutral-100 flex flex-col pt-16">
      <div className="max-w-5xl mx-auto w-full px-8">
        <div className="bg-neutral-800 shadow-lg flex flex-col overflow-hidden">
          {/* Profile Banner */}
          <section className="py-8 px-8 border-b border-neutral-700">
            <div className="profile-banner-content flex items-start justify-between">
              <div className="profile-avatar-section flex items-center gap-6">
                <div className="avatar w-28 h-28 rounded-md border-4 border-neutral-950 bg-neutral-700 shadow-lg overflow-hidden" />
                <div className="user-details flex flex-col gap-1">
                  <h2 className="username text-3xl font-semibold leading-tight">
                    {user.name || session?.user.name || "Username"}
                  </h2>
                  <p className="country text-neutral-400 text-lg">
                    {user.description || "Description"}
                  </p>
                </div>
              </div>
              <div className="profile-settings-section">
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
    </div>
  );
}
