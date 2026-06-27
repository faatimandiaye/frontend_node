export const API_URL =
  import.meta.env.VITE_API_URL || "http://localhost:3000";

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