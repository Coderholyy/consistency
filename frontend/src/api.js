const API_BASE_URL =
  process.env.API_BASE_URL || "https://consistency.onrender.com:5001/"; // Fallback for local dev

export async function apiFetch(endpoint, options = {}) {
  const url = `${API_BASE_URL}${endpoint}`;

  const defaultHeaders = {
    "Content-Type": "application/json",
    ...(options.headers || {}),
  };

  const config = {
    ...options,
    body: options.body ? JSON.stringify(options.body) : undefined,
    headers: defaultHeaders,
  };

  try {
    const response = await fetch(url, config);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json();
  } catch (error) {
    console.error("API Fetch Error:", error);
    throw error;
  }
}
