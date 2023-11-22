import axios from "axios";

const api = axios.create({
  baseURL: "https://api.example.com", // Your API base URL
});

// Interceptor for adding authorization header
api.interceptors.request.use(
  (config) => {
    const token = getToken(); // Implement this function to get the authentication token
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor for handling 401 Unauthorized responses
api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    // If the error status is 401 and the request has not been retried
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      // Implement your token refresh logic or login logic here
      // e.g., await refreshToken();

      // Retry the original request
      return api(originalRequest);
    }

    return Promise.reject(error);
  }
);

export default api;
