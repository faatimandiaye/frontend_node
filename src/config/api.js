export const API_URL =
  import.meta.env.VITE_API_URL || "https://backend-node-udx0.onrender.com";

export const fetchApi = async (url, options = {}) => {
  return fetch(`${API_URL}${url}`, options);
};

export const readApiResponse = async (response) => {
  const text = await response.text();

  try {
    return JSON.parse(text);
  } catch {
    return {
      message: text,
    };
  }
};