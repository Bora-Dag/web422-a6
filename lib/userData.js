import { getToken } from './authenticate';

export async function addToFavourites(id) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/favourites/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json', Authorization: `jwt ${getToken()}` }
  });
  return res.status === 200 ? await res.json() : [];
}

export async function removeFromFavourites(id) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/favourites/${id}`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json', Authorization: `jwt ${getToken()}` }
  });
  return res.status === 200 ? await res.json() : [];
}

export async function getFavourites() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/favourites`, {
    headers: { 'Content-Type': 'application/json', Authorization: `jwt ${getToken()}` }
  });
  return res.status === 200 ? await res.json() : [];
}

export async function addToHistory(id) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/history/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json', Authorization: `jwt ${getToken()}` }
  });
  return res.status === 200 ? await res.json() : [];
}

export async function removeFromHistory(id) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/history/${id}`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json', Authorization: `jwt ${getToken()}` }
  });
  return res.status === 200 ? await res.json() : [];
}

export async function getHistory() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/history`, {
    headers: { 'Content-Type': 'application/json', Authorization: `jwt ${getToken()}` }
  });
  return res.status === 200 ? await res.json() : [];
}
