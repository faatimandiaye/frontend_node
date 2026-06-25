const API_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:3000'

const fetchApi = (endpoint, options = {}) => {
  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), 10000) // 10s timeout

  return fetch(`${API_URL}${endpoint}`, {
    ...options,
    signal: controller.signal,
  }).finally(() => clearTimeout(timeout))
}

const readApiResponse = async (response) => {
  try {
    return await response.json()
  } catch {
    return {}
  }
}

export { API_URL, fetchApi, readApiResponse }