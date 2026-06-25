export const API_URL = "http://localhost:3000";

export const fetchApi = async (endpoint, options = {}) => {
  const response = await fetch(`${API_URL}${endpoint}`, {
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
    ...options,
  });
  return response;
};

export const readApiResponse = async (response) => {
  const data = await response.json();
  return data;
};