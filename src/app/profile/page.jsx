import ProfileInfo from "@/components/ProfileInfo/ProfileInfo";
import ProfileOrders from "@/components/ProfileOrders/ProfileOrders";

export default function ProfilePage() {
  return (
    <div className="profile-page min-h-screen bg-neutral-900 text-neutral-100 flex flex-col pt-16 pb-16">
      {/* Profile Banner */}
      <section className="profile-banner w-full bg-gradient-to-r from-neutral-800 to-neutral-700 py-8 px-8 mb-6 shadow-lg">
        <div className="profile-banner-content flex items-center justify-between max-w-5xl mx-auto">
          <div className="profile-avatar-section flex items-center gap-6">
            <div className="avatar w-28 h-28 rounded-md border-4 border-neutral-950 bg-neutral-700 shadow-lg overflow-hidden">
              {/* Avatar image placeholder */}
            </div>
            <div className="user-details flex flex-col gap-1">
              <h2 className="username text-3xl font-semibold leading-tight">
                Username
              </h2>
              <p className="country text-neutral-400 text-lg">Description</p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="profile-main-content flex-1 flex max-w-5xl mx-auto w-full gap-8 px-8">
        <aside className="profile-sidebar w-72 bg-neutral-800 rounded-lg shadow-md p-6 h-fit">
          <ProfileInfo />
        </aside>
        <main className="profile-orders flex-1 bg-neutral-800 rounded-lg shadow-md p-6">
          <ProfileOrders />
        </main>
      </div>
    </div>
  );
}
