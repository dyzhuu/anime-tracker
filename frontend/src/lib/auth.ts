import { getCookie, setCookie } from 'cookies-next';

export function setAuthToken(token: string) {
  const expiryDate = new Date();
  expiryDate.setDate(expiryDate.getDate() + 7);
  setCookie('jwtToken', token, {
    httpOnly: true,
    expires: expiryDate,
    sameSite: "lax"
  });
}

export function getAuthToken() {
  return getCookie('jwtToken');
}

export async function isAuthenticated() {
  try {
    const response = await fetch('http://localhost:5148/api/auth/verify', {
      headers: { Authorization: `Bearer ${getAuthToken()}` },
      cache: 'no-store'
    });

    if (response.status === 200) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    return false;
  }
}
