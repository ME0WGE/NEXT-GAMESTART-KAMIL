"use client";

import { useState } from "react";
import { Edit3, Save, X, User, Mail, MapPin, Calendar } from "lucide-react";

export default function Profile() {
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState({
    username: "CYBER_HACKER_42",
    email: "hacker@cyberpunk.net",
    location: "Night City",
    joinDate: "2024-01-15",
    description:
      "Professional cyberpunk gamer. Hacking the matrix one game at a time. Specialized in FPS and RPG games. Always looking for the next challenge in the digital realm.",
    avatar: null,
  });

  const [editingData, setEditingData] = useState({ ...userData });

  const [recentPurchases] = useState([
    {
      id: 1,
      title: "Cyberpunk 2077",
      thumbnail: "https://www.freetogame.com/g/1/thumbnail.jpg",
      purchaseDate: "2024-01-20",
      price: 59.99,
    },
    {
      id: 2,
      title: "Deus Ex: Mankind Divided",
      thumbnail: "https://www.freetogame.com/g/2/thumbnail.jpg",
      purchaseDate: "2024-01-18",
      price: 29.99,
    },
    {
      id: 3,
      title: "Ghostrunner",
      thumbnail: "https://www.freetogame.com/g/3/thumbnail.jpg",
      purchaseDate: "2024-01-15",
      price: 24.99,
    },
  ]);

  const [myGames] = useState([
    {
      id: 1,
      title: "Cyberpunk 2077",
      thumbnail: "https://www.freetogame.com/g/1/thumbnail.jpg",
      playTime: "127h",
      lastPlayed: "2024-01-22",
    },
    {
      id: 2,
      title: "Deus Ex: Mankind Divided",
      thumbnail: "https://www.freetogame.com/g/2/thumbnail.jpg",
      playTime: "89h",
      lastPlayed: "2024-01-20",
    },
    {
      id: 3,
      title: "Ghostrunner",
      thumbnail: "https://www.freetogame.com/g/3/thumbnail.jpg",
      playTime: "45h",
      lastPlayed: "2024-01-18",
    },
    {
      id: 4,
      title: "The Witcher 3",
      thumbnail: "https://www.freetogame.com/g/4/thumbnail.jpg",
      playTime: "234h",
      lastPlayed: "2024-01-10",
    },
  ]);

  const handleSave = () => {
    setUserData({ ...editingData });
    setIsEditing(false);
    // Here you would typically save to backend
    console.log("Saving user data:", editingData);
  };

  const handleCancel = () => {
    setEditingData({ ...userData });
    setIsEditing(false);
  };

  const handleInputChange = (field, value) => {
    setEditingData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const currentData = isEditing ? editingData : userData;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-cyan-950 text-white relative overflow-hidden pt-20">
      {/* Cyberpunk grid background */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(147,51,234,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(147,51,234,0.1)_1px,transparent_1px)] bg-[size:50px_50px]"></div>

      {/* Animated scan lines */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-500/5 to-transparent animate-pulse"></div>

      {/* Glitch effect overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-fuchsia-500/5 to-transparent opacity-50"></div>

      {/* Neon glow effects */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-fuchsia-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      <div className="absolute top-1/2 left-0 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-500"></div>

      <div className="container mx-auto px-4 py-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-6xl font-black mb-4 neon-text">
            <span className="bg-gradient-to-r from-cyan-400 via-fuchsia-400 to-purple-400 bg-clip-text text-transparent tracking-wider">
              CYBER PROFILE
            </span>
          </h1>
          <p className="text-cyan-300 text-xl font-mono tracking-wider animate-neon-flicker">
            <span className="text-fuchsia-400">[</span>
            HACK YOUR IDENTITY • DOMINATE THE MATRIX
            <span className="text-purple-400">]</span>
          </p>
        </div>

        {/* Profile Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* Profile Card */}
          <div className="lg:col-span-1">
            <div className="bg-slate-900/90 backdrop-blur-xl rounded-2xl p-6 border border-cyan-500/30 shadow-2xl shadow-cyan-500/20 relative overflow-hidden">
              {/* Cyberpunk background effects */}
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-fuchsia-500/5"></div>
              <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(147,51,234,0.1)_25%,rgba(147,51,234,0.1)_75%,transparent_75%)] bg-[size:20px_20px]"></div>

              {/* Scan line effect */}
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-500/10 to-transparent animate-scan-line"></div>

              <div className="relative z-10">
                {/* Avatar Section */}
                <div className="text-center mb-6">
                  <div className="relative inline-block group">
                    <div className="w-32 h-32 bg-gradient-to-br from-cyan-500 via-fuchsia-500 to-purple-600 rounded-full flex items-center justify-center border-4 border-cyan-300/50 shadow-2xl shadow-cyan-500/20 relative overflow-hidden">
                      {currentData.avatar ? (
                        <img
                          src={currentData.avatar}
                          alt="Profile"
                          className="w-full h-full object-cover rounded-full"
                        />
                      ) : (
                        <User size={64} className="text-white" />
                      )}

                      {/* Circuit pattern overlay */}
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(147,51,234,0.3),transparent_50%)]"></div>
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_70%,rgba(236,72,153,0.3),transparent_50%)]"></div>
                    </div>

                    {/* Edit button overlay */}
                    {isEditing && (
                      <button className="absolute bottom-0 right-0 bg-cyan-500 hover:bg-cyan-400 text-slate-900 p-2 rounded-full transition-all duration-200 hover:scale-110 shadow-lg">
                        <Edit3 size={16} />
                      </button>
                    )}
                  </div>
                </div>

                {/* User Info */}
                <div className="space-y-4">
                  <div className="text-center">
                    {isEditing ? (
                      <input
                        type="text"
                        value={currentData.username}
                        onChange={(e) =>
                          handleInputChange("username", e.target.value)
                        }
                        className="text-2xl font-black text-cyan-400 mb-2 tracking-wider bg-transparent border-b-2 border-cyan-400/50 focus:border-cyan-400 outline-none text-center w-full font-mono"
                      />
                    ) : (
                      <h2 className="text-2xl font-black text-cyan-400 mb-2 tracking-wider">
                        <span className="text-fuchsia-400">[</span>
                        {currentData.username}
                        <span className="text-purple-400">]</span>
                      </h2>
                    )}

                    {isEditing ? (
                      <textarea
                        value={currentData.description}
                        onChange={(e) =>
                          handleInputChange("description", e.target.value)
                        }
                        className="text-cyan-300 text-sm font-mono bg-transparent border border-cyan-400/30 rounded-lg p-2 w-full h-20 resize-none focus:border-cyan-400 outline-none"
                        placeholder="Enter your description..."
                      />
                    ) : (
                      <p className="text-cyan-300 text-sm font-mono">
                        {currentData.description}
                      </p>
                    )}
                  </div>

                  {/* User Details */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 text-cyan-300">
                      <Mail size={16} className="text-fuchsia-400" />
                      {isEditing ? (
                        <input
                          type="email"
                          value={currentData.email}
                          onChange={(e) =>
                            handleInputChange("email", e.target.value)
                          }
                          className="font-mono text-sm bg-transparent border-b border-cyan-400/50 focus:border-cyan-400 outline-none flex-1"
                        />
                      ) : (
                        <span className="font-mono text-sm">
                          {currentData.email}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-3 text-cyan-300">
                      <MapPin size={16} className="text-fuchsia-400" />
                      {isEditing ? (
                        <input
                          type="text"
                          value={currentData.location}
                          onChange={(e) =>
                            handleInputChange("location", e.target.value)
                          }
                          className="font-mono text-sm bg-transparent border-b border-cyan-400/50 focus:border-cyan-400 outline-none flex-1"
                        />
                      ) : (
                        <span className="font-mono text-sm">
                          {currentData.location}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-3 text-cyan-300">
                      <Calendar size={16} className="text-fuchsia-400" />
                      <span className="font-mono text-sm">
                        Joined: {currentData.joinDate}
                      </span>
                    </div>
                  </div>

                  {/* Edit/Save Buttons */}
                  <div className="flex gap-2 mt-6">
                    {!isEditing ? (
                      <button
                        onClick={() => setIsEditing(true)}
                        className="flex-1 bg-gradient-to-r from-cyan-500 to-fuchsia-500 hover:from-cyan-400 hover:to-fuchsia-400 text-slate-900 font-black py-2 px-4 rounded-lg transition-all duration-200 hover:scale-105 shadow-lg border border-cyan-300/50 tracking-wider uppercase text-sm">
                        <Edit3 size={16} className="mr-2" />
                        HACK PROFILE
                      </button>
                    ) : (
                      <>
                        <button
                          onClick={handleSave}
                          className="flex-1 bg-gradient-to-r from-cyan-500 to-fuchsia-500 hover:from-cyan-400 hover:to-fuchsia-400 text-slate-900 font-black py-2 px-4 rounded-lg transition-all duration-200 hover:scale-105 shadow-lg border border-cyan-300/50 tracking-wider uppercase text-sm">
                          <Save size={16} className="mr-2" />
                          SAVE
                        </button>
                        <button
                          onClick={handleCancel}
                          className="flex-1 bg-slate-800 hover:bg-slate-700 text-cyan-300 font-black py-2 px-4 rounded-lg transition-all duration-200 hover:scale-105 border border-slate-600 tracking-wider uppercase text-sm">
                          <X size={16} className="mr-2" />
                          CANCEL
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>

              {/* Corner brackets */}
              <div className="absolute top-4 left-4 w-6 h-6 border-l-2 border-t-2 border-cyan-400 animate-neon-flicker"></div>
              <div className="absolute top-4 right-4 w-6 h-6 border-r-2 border-t-2 border-fuchsia-400 animate-neon-flicker delay-300"></div>
              <div className="absolute bottom-4 left-4 w-6 h-6 border-l-2 border-b-2 border-purple-400 animate-neon-flicker delay-500"></div>
              <div className="absolute bottom-4 right-4 w-6 h-6 border-r-2 border-b-2 border-cyan-400 animate-neon-flicker delay-700"></div>
            </div>
          </div>

          {/* Recent Purchases */}
          <div className="lg:col-span-2">
            <div className="bg-slate-900/90 backdrop-blur-xl rounded-2xl p-6 border border-cyan-500/30 shadow-2xl shadow-cyan-500/20 relative overflow-hidden">
              {/* Cyberpunk background effects */}
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-fuchsia-500/5"></div>
              <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(147,51,234,0.1)_25%,rgba(147,51,234,0.1)_75%,transparent_75%)] bg-[size:20px_20px]"></div>

              <div className="relative z-10">
                <h3 className="text-2xl font-black text-cyan-400 mb-6 tracking-wider">
                  <span className="text-fuchsia-400">[</span>
                  RECENT HACKS
                  <span className="text-purple-400">]</span>
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {recentPurchases.map((game) => (
                    <div
                      key={game.id}
                      className="bg-slate-800/50 rounded-lg p-4 border border-cyan-500/30 hover:border-fuchsia-500/50 transition-all duration-300 hover:scale-105 group relative overflow-hidden">
                      {/* Cyberpunk background effects */}
                      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-fuchsia-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                      <div className="relative z-10">
                        <div className="w-full h-32 bg-slate-700 rounded-lg mb-3 flex items-center justify-center">
                          <img
                            src={game.thumbnail}
                            alt={game.title}
                            className="w-full h-full object-cover rounded-lg"
                            onError={(e) => {
                              e.target.style.display = "none";
                              e.target.nextSibling.style.display = "flex";
                            }}
                          />
                          <div className="hidden w-full h-full bg-gradient-to-br from-cyan-500 via-fuchsia-500 to-purple-600 rounded-lg items-center justify-center">
                            <span className="text-white font-black text-lg">
                              GAME
                            </span>
                          </div>
                        </div>

                        <h4 className="font-black text-cyan-300 mb-2 tracking-wider">
                          {game.title}
                        </h4>
                        <div className="flex justify-between text-sm text-cyan-200 font-mono">
                          <span>{game.purchaseDate}</span>
                          <span className="text-fuchsia-400">
                            ${game.price}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Corner brackets */}
              <div className="absolute top-4 left-4 w-6 h-6 border-l-2 border-t-2 border-cyan-400 animate-neon-flicker"></div>
              <div className="absolute top-4 right-4 w-6 h-6 border-r-2 border-t-2 border-fuchsia-400 animate-neon-flicker delay-300"></div>
            </div>
          </div>
        </div>

        {/* My Games Section */}
        <div className="bg-slate-900/90 backdrop-blur-xl rounded-2xl p-6 border border-cyan-500/30 shadow-2xl shadow-cyan-500/20 relative overflow-hidden">
          {/* Cyberpunk background effects */}
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-fuchsia-500/5"></div>
          <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(147,51,234,0.1)_25%,rgba(147,51,234,0.1)_75%,transparent_75%)] bg-[size:20px_20px]"></div>

          <div className="relative z-10">
            <h3 className="text-2xl font-black text-cyan-400 mb-6 tracking-wider">
              <span className="text-fuchsia-400">[</span>
              MY CYBER LIBRARY
              <span className="text-purple-400">]</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {myGames.map((game) => (
                <div
                  key={game.id}
                  className="bg-slate-800/50 rounded-lg p-4 border border-cyan-500/30 hover:border-fuchsia-500/50 transition-all duration-300 hover:scale-105 group relative overflow-hidden">
                  {/* Cyberpunk background effects */}
                  <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-fuchsia-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                  <div className="relative z-10">
                    <div className="w-full h-32 bg-slate-700 rounded-lg mb-3 flex items-center justify-center">
                      <img
                        src={game.thumbnail}
                        alt={game.title}
                        className="w-full h-full object-cover rounded-lg"
                        onError={(e) => {
                          e.target.style.display = "none";
                          e.target.nextSibling.style.display = "flex";
                        }}
                      />
                      <div className="hidden w-full h-full bg-gradient-to-br from-cyan-500 via-fuchsia-500 to-purple-600 rounded-lg items-center justify-center">
                        <span className="text-white font-black text-lg">
                          GAME
                        </span>
                      </div>
                    </div>

                    <h4 className="font-black text-cyan-300 mb-2 tracking-wider">
                      {game.title}
                    </h4>
                    <div className="space-y-1 text-sm text-cyan-200 font-mono">
                      <div className="flex justify-between">
                        <span>Play Time:</span>
                        <span className="text-fuchsia-400">
                          {game.playTime}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Last Played:</span>
                        <span className="text-purple-400">
                          {game.lastPlayed}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Corner brackets */}
          <div className="absolute top-4 left-4 w-6 h-6 border-l-2 border-t-2 border-cyan-400 animate-neon-flicker"></div>
          <div className="absolute top-4 right-4 w-6 h-6 border-r-2 border-t-2 border-fuchsia-400 animate-neon-flicker delay-300"></div>
          <div className="absolute bottom-4 left-4 w-6 h-6 border-l-2 border-b-2 border-purple-400 animate-neon-flicker delay-500"></div>
          <div className="absolute bottom-4 right-4 w-6 h-6 border-r-2 border-b-2 border-cyan-400 animate-neon-flicker delay-700"></div>
        </div>
      </div>
    </div>
  );
}
