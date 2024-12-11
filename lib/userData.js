import { getToken } from "@/lib/authenticate";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

// Simplified fetcher function
const fetcher = (url, options = {}) => {
  const token = getToken();
  if (!token) {
    throw new Error('User is not authenticated');
  }

  const headers = {
    'Content-Type': 'application/json',
    Authorization: `JWT ${token}`,
    ...options.headers, // Merge additional headers if provided
  };

  return fetch(url, { ...options, headers }).then((res) => {
    if (res.ok) {
      return res.json(); // Return JSON response for successful requests
    }
    console.error(`Failed request: ${res.status} ${res.statusText}`);
    return []; // Return empty array for failed requests
  });
};

// CRUD functions using the simplified fetcher
export async function addToFavourites(id) {
  return fetcher(`${API_URL}/favourites/${id}`, {
    method: 'PUT',
  });
}

export async function removeFromFavourites(id) {
  return fetcher(`${API_URL}/favourites/${id}`, {
    method: 'DELETE',
  });
}

export async function getFavourites() {
  return fetcher(`${API_URL}/favourites`, {
    method: 'GET',
  });
}

export async function addToHistory(id) {
  return fetcher(`${API_URL}/history/${id}`, {
    method: 'PUT',
  });
}

export async function removeFromHistory(id) {
  return fetcher(`${API_URL}/history/${id}`, {
    method: 'DELETE',
  });
}

export async function getHistory() {
  return fetcher(`${API_URL}/history`, {
    method: 'GET',
  });
}
