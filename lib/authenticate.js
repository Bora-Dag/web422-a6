import jwtDecode from 'jwt-decode';

export function setToken(token) {
  console.log("setToken() called. Saving token to localStorage:", token);
  localStorage.setItem('token', token);
}

export function getToken() {
  const token = localStorage.getItem('token');
  console.log("getToken() read from localStorage:", token);
  return token;
}

export function removeToken() {
  console.log("removeToken() called. Removing token from localStorage.");
  localStorage.removeItem('token');
}

export function readToken() {
  try {
    const token = getToken();
    console.log("readToken() decoding token:", token);
    return jwtDecode(token);
  } catch (err) {
    console.log("readToken() failed. Invalid token or no token.");
    return null;
  }
}

export function isAuthenticated() {
  const token = readToken();
  const isAuth = token ? true : false;
  console.log("isAuthenticated():", isAuth, "Decoded token:", token);
  return isAuth;
}

export async function authenticateUser(user, password) {
  console.log(`Sending login request for user: ${user}`);

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ userName: user, password: password })
  });

  console.log("Login API response status:", res.status);

  if (res.status === 200) {
    const data = await res.json();
    console.log("Login API response data:", data);
    setToken(data.token);
    return true;
  } else {
    const errorData = await res.json().catch(() => ({}));
    console.log("Login API failed. Error:", errorData);
    return false;
  }
}

export async function registerUser(user, password, password2) {
  console.log(`Sending register request for user: ${user}`);

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ userName: user, password: password, password2: password2 })
  });

  console.log("Register API response status:", res.status);
  return res.status === 200;
}
