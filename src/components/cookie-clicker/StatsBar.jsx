import Rules from "./Tooltip";

export default function StatsBar({ clicker }) {
  return (
    <>
      <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 mb-8 border border-gray-700">
        <div className="grid grid-cols-2 gap-4 text-center">
          <div>
            <p className="text-gray-400 text-sm font-medium">Cookies</p>
            <p className="text-3xl font-bold text-yellow-400">
              {clicker.cookies}
            </p>
          </div>
          <div>
            <p className="text-gray-400 text-sm font-medium">Par seconde</p>
            <p className="text-3xl font-bold text-green-400">
              {clicker.cookiesPerSecond}
            </p>
          </div>
          <Rules right="0" top="0" size={35} />
        </div>
      </div>
    </>
  );
}
