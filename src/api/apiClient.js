import axios from 'axios';

/**
 * Configure une instance Axios pour se connecter au backend FastAPI.
 * L'URL de base est rcupre depuis la variable d'environnement VITE_API_URL ou '/api' par dfaut.
 */
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Intercepteur pour ajouter le token d'authentification si ncessaire
api.interceptors.request.use(
  (config) => {
    // Exemple d'ajout de token:
    // const token = localStorage.getItem('token');
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Intercepteur pour grer les erreurs de rponse (ex: token expir, erreurs serveur)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Logique globale de gestion des erreurs
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export default api;
