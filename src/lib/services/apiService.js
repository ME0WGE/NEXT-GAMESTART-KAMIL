import axios from "axios";

// Configuration axios
const api = axios.create({
  baseURL: "/api/games", // Use the Next.js proxy
  timeout: 15000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// Interceptor to handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Error:", error);
    return Promise.reject(error);
  }
);

export const apiService = {
  // Get all games
  async getAllGames() {
    try {
      const response = await api.get("");
      return response.data;
    } catch (error) {
      console.error("Erreur lors de la récupération des jeux:", error);

      // In case of error, throw the error to keep the loading active
      throw error;
    }
  },

  // Get a game by ID
  async getGameById(id) {
    try {
      const response = await api.get(`/game?id=${id}`);
      return response.data;
    } catch (error) {
      console.error(`Erreur lors de la récupération du jeu ${id}:`, error);

      // In case of error, throw the error to keep the loading active
      throw error;
    }
  },

  // Get games by platform
  async getGamesByPlatform(platform) {
    try {
      const response = await api.get(`?platform=${platform}`);
      return response.data;
    } catch (error) {
      console.error(
        `Erreur lors de la récupération des jeux ${platform}:`,
        error
      );

      // In case of error, throw the error to keep the loading active
      throw error;
    }
  },

  // Get games by genre
  async getGamesByGenre(genre) {
    try {
      const response = await api.get(`?category=${genre}`);
      return response.data;
    } catch (error) {
      console.error(`Erreur lors de la récupération des jeux ${genre}:`, error);

      // In case of error, throw the error to keep the loading active
      throw error;
    }
  },

  // Get popular games (random selection)
  async getPopularGames(limit = 16) {
    try {
      const response = await api.get("");
      const games = response.data;

      // Shuffle the array and take the first games
      const shuffled = games.sort(() => 0.5 - Math.random());
      return shuffled.slice(0, limit);
    } catch (error) {
      console.error(
        "Erreur lors de la récupération des jeux populaires:",
        error
      );

      // In case of error, throw the error to keep the loading active
      throw error;
    }
  },
  // Set random price of all games
  async getRandomPriceOfAllGames() {
    try {
      const response = await api.get("");
      const games = response.data;

      return games.map((game) => ({
        ...game,
        price: `${Math.floor(Math.random() * 96) + 5}`,
      }));
    } catch (error) {
      console.error("Erreur lors de la récupération des prix des jeux:", error);

      // In case of error, throw the error to keep the loading active
      throw error;
    }
  },

  // Get discounted games (random selection)
  async getDiscountedGames(limit = 6) {
    try {
      const response = await api.get("");
      const games = response.data;

      // Shuffle the array and take the first games
      const shuffled = games.sort(() => 0.5 - Math.random());
      return shuffled.slice(0, limit);
    } catch (error) {
      console.error(
        "Erreur lors de la récupération des jeux en promotion:",
        error
      );

      // In case of error, throw the error to keep the loading active
      throw error;
    }
  },
};
