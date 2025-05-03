import { session } from "electron";

const COOKIE_NAME = "loggedInEmployee";

function getCookieUrl(): string {
  const port = process.argv[2] || 8888;
  const isProd = process.env.NODE_ENV === "production";
  return isProd ? "http://localhost" : `http://localhost:${port}`;
}

export async function setEmployeeCookie(employee: object) {
  const cookie = {
    url: getCookieUrl(),
    name: COOKIE_NAME,
    value: JSON.stringify(employee),
    expirationDate: Math.floor(Date.now() / 1000) + 60 * 60 * 24,
  };
  await session.defaultSession.cookies.set(cookie);
}

export async function getEmployeeCookie() {
  const cookies = await session.defaultSession.cookies.get({
    name: COOKIE_NAME,
  });
  return cookies.length > 0 ? JSON.parse(cookies[0].value) : null;
}

export async function clearEmployeeCookie() {
  await session.defaultSession.cookies.remove(getCookieUrl(), COOKIE_NAME);
}
