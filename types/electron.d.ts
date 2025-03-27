// electron.d.ts or types/electron.d.ts
declare global {
  interface Window {
    electronAPI: {
      getStores: () => any;
      insertStore: (store: {
        id: string;
        name: string;
        location: string;
        createdAt: string;
        updatedAt: string;
      }) => void;
    };
  }
}

export {};
