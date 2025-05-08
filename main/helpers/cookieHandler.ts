import { session } from "electron";

const COOKIE_NAME = "loggedInEmployee";

function getCookieUrl(): string {
  const port = process.argv[2] || 8888;
  const isProd = process.env.NODE_ENV === "production";
  return isProd ? "http://localhost" : `http://localhost:${port}`;
}

export async function setEmployeeCookie(employee: {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  storeId: string;
  role: {
    id: string;
    name: string;
    userManagement: boolean;
    orderManagement: boolean;
    inventoryManagement: boolean;
    reportManagement: boolean;
    menuManagement: boolean;
    settingManagement: boolean;
    roleManagement: boolean;
    kitchenManagement: boolean;
    cashManagement: boolean;
    customerManagement: boolean;
    supplierManagement: boolean;
  };
}) {
  const cookie = {
    url: getCookieUrl(),
    name: COOKIE_NAME,
    value: JSON.stringify({
      id: employee.id,
      firstName: employee.firstName,
      lastName: employee.lastName,
      email: employee.email,
      storeId: employee.storeId,
      role: employee.role, 
    }),
    expirationDate: Math.floor(Date.now() / 1000) + 60 * 60 * 24, // 1 day
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
