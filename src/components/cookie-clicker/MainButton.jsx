export default function MainButton({ handleCookieClick }) {
  return (
    <>
      <div className="flex justify-center mb-12">
        <button
          onClick={handleCookieClick}
          className="group relative transition-all duration-300 hover:scale-105 active:scale-95">
          <div className="w-48 h-48 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full shadow-2xl border-4 border-yellow-300 flex items-center justify-center text-6xl transform transition-all duration-200 hover:shadow-yellow-400/25 hover:shadow-3xl">
            🍪
          </div>
          <div className="absolute inset-0 rounded-full bg-yellow-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </button>
      </div>
    </>
  );
}
