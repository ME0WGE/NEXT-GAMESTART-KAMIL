export default function MainButton({ handleCookieClick, icon }) {
  return (
    <>
      <div className="flex justify-center mb-16">
        <button
          onClick={handleCookieClick}
          className="group relative transition-all duration-500 hover:scale-110 active:scale-95 animate-float">
          {/* Glow effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 via-orange-400/20 to-yellow-400/20 rounded-full blur-2xl group-hover:blur-3xl transition-all duration-500 animate-glow"></div>

          {/* Main button */}
          <div className="relative w-56 h-56 bg-gradient-to-br from-yellow-400 via-orange-400 to-yellow-500 rounded-full shadow-2xl border-4 border-yellow-300/50 flex items-center justify-center transform transition-all duration-300 hover:shadow-yellow-400/40 hover:shadow-4xl group-hover:rotate-12 glass">
            <div className="text-7xl transform transition-all duration-300 group-hover:scale-110 group-active:scale-90">
              {icon}
            </div>
          </div>

          {/* Click effect */}
          <div className="absolute inset-0 rounded-full bg-yellow-400/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

          {/* Particle effect */}
          <div className="absolute -top-2 -left-2 w-4 h-4 bg-yellow-400 rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-bounce transition-all duration-300 animate-sparkle"></div>
          <div className="absolute -top-2 -right-2 w-3 h-3 bg-orange-400 rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-bounce transition-all duration-300 delay-100 animate-sparkle"></div>
          <div className="absolute -bottom-2 -left-2 w-3 h-3 bg-yellow-300 rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-bounce transition-all duration-300 delay-200 animate-sparkle"></div>
          <div className="absolute -bottom-2 -right-2 w-4 h-4 bg-orange-300 rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-bounce transition-all duration-300 delay-300 animate-sparkle"></div>
        </button>
      </div>
    </>
  );
}
