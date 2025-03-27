import Store from "electron-store";

const store = new Store({
  encryptionKey: "asdasd",
});

export function getStoreData(key: string) {
  const value = store.get(key);
  return value ?? null;
}

export function setStoreData(key: string, value: any) {
  store.set(key, value);
  return getStoreData(key);
}

export function removeStoreData(key: string) {
  try {
    store.delete(key);
    return true;
  } catch (e) {
    console.error(e);
    return false;
  }
}
