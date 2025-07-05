import Rules from "./Tooltip";

export default function StatsBar({ clicker }) {
  return (
    <>
      <div className="bg-gradient-to-r from-gray-900/80 to-gray-800/80 backdrop-blur-xl rounded-3xl p-8 mb-12 border border-gray-700/50 shadow-2xl relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/5 to-orange-500/5"></div>
        <div className="relative z-10">
          <div className="grid grid-cols-2 gap-8 text-center">
            <div className="group">
              <p className="text-gray-400 text-sm font-medium uppercase tracking-wider mb-2">
                Cookies
              </p>
              <p className="text-4xl font-black text-yellow-400 group-hover:text-yellow-300 transition-colors duration-300">
                {clicker.cookies}
              </p>
            </div>
            <div className="group">
              <p className="text-gray-400 text-sm font-medium uppercase tracking-wider mb-2">
                Par seconde
              </p>
              <p className="text-4xl font-black text-green-400 group-hover:text-green-300 transition-colors duration-300">
                {clicker.cookiesPerSecond}
              </p>
            </div>
          </div>
        </div>
        <div className="absolute top-4 right-4">
          <Rules right="0" top="0" size={35} />
        </div>
      </div>
    </>
  );
}
