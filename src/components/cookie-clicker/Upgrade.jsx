export default function Upgrade({
  cookies,
  handleBuyUpgrade,
  upgrade_name,
  upgrade_price,
  upgrade_value,
  upgrade_icon,
}) {
  return (
    <>
      <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700 hover:border-yellow-500/50 transition-all duration-300">
        <div className="flex items-center justify-between mb-4">
          <div className="text-2xl">{upgrade_icon}</div>
          <div className="text-right">
            <p className="text-yellow-400 font-bold">{upgrade_name}</p>
            <p className="text-gray-400 text-sm">
              +{upgrade_value} cookies/sec
            </p>
          </div>
        </div>
        <button
          className="w-full bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-bold py-3 px-4 rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={() =>
            handleBuyUpgrade({ price: upgrade_price, value: upgrade_value })
          }
          disabled={cookies < upgrade_price}>
          Acheter ({upgrade_price} cookies)
        </button>
      </div>
    </>
  );
}
