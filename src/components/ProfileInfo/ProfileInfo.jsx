export default function ProfileInfo() {
  return (
    <section className="profile-info">
      <ul className="profile-info-list space-y-3">
        <li className="flex justify-between text-neutral-300">
          <button className="bg-neutral-800 text-neutral-100 px-4 py-2 rounded-md hover:bg-neutral-700 transition-colors duration-300 text-center font-mono text-sm hover:text-yellow-400 hover:border-yellow-400 border-2 border-white w-35 cursor-pointer">
            Edit Profile
          </button>
        </li>
        <li className="flex justify-between text-neutral-300">
          <button className="bg-neutral-800 text-neutral-100 px-4 py-2 rounded-md hover:bg-neutral-700 transition-colors duration-300 text-center font-mono text-sm hover:text-yellow-400 hover:border-yellow-400 border-2 border-white w-35 cursor-pointer">
            Add Credits
          </button>
        </li>
      </ul>
    </section>
  );
}
