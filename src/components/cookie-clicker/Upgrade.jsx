function UpgradeComponent({
  cookies,
  handleBuyUpgrade,
  upgrade_name,
  upgrade_price,
  upgrade_value,
  upgrade_icon,
}) {
  const canAfford = cookies >= upgrade_price;

  return (
    <>
      <div className="group bg-gradient-to-br from-gray-900/90 to-gray-800/90 backdrop-blur-xl rounded-2xl p-6 border border-gray-700/50 hover:border-yellow-500/50 transition-all duration-500 hover:shadow-2xl hover:shadow-yellow-500/10 relative overflow-hidden">
        {/* Background gradient effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/5 to-orange-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

        <div className="relative z-10">
          <div className="flex items-center justify-between mb-6">
            <div className="text-3xl transform group-hover:scale-110 transition-transform duration-300">
              {upgrade_icon}
            </div>
            <div className="text-right">
              <p className="text-yellow-400 font-bold text-lg mb-1 group-hover:text-yellow-300 transition-colors duration-300">
                {upgrade_name}
              </p>
              <p className="text-gray-400 text-sm font-medium">
                +{upgrade_value} cookies/sec
              </p>
            </div>
          </div>

          <button
            className={`w-full font-bold py-4 px-6 rounded-xl transition-all duration-300 transform group-hover:scale-105 ${
              canAfford
                ? "bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-400 hover:to-orange-400 text-gray-900 shadow-lg hover:shadow-xl hover:shadow-yellow-500/25"
                : "bg-gray-700 text-gray-500 cursor-not-allowed opacity-50"
            }`}
            onClick={() =>
              handleBuyUpgrade({ price: upgrade_price, value: upgrade_value })
            }
            disabled={!canAfford}>
            <span className="flex items-center justify-center gap-2">
              <span>Acheter</span>
              <span className="text-sm">
                ({upgrade_price.toLocaleString()} cookies)
              </span>
            </span>
          </button>
        </div>
      </div>
    </>
  );
}

export default function Upgrade({ upgrades, clicker, handleBuyUpgrade }) {
  return (
    <>
      {upgrades.map((upgrade, index) => (
        <div
          key={upgrade.id}
          className="transform transition-all duration-500 hover:-translate-y-2"
          style={{ animationDelay: `${index * 100}ms` }}>
          <UpgradeComponent
            cookies={clicker.cookies}
            handleBuyUpgrade={handleBuyUpgrade}
            upgrade_name={upgrade.name}
            upgrade_price={upgrade.price}
            upgrade_value={upgrade.value}
            upgrade_icon={upgrade.icon}
          />
        </div>
      ))}
    </>
  );
}
