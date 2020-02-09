// @ts-ignore
import memoryDriver from "localforage-memoryStorageDriver";
import { setup } from "axios-cache-adapter";
import localforage from "localforage";

localforage.defineDriver(memoryDriver);

const localforageStore = localforage.createInstance({
  // List of drivers used
  driver: [
    localforage.INDEXEDDB,
    localforage.LOCALSTORAGE,
    memoryDriver._driver
  ],
  name: "axios-cache"
});

const api = setup({
  cache: {
    maxAge: 7 * 24 * 60 * 60 * 1000, // set cache time to 7 days
    exclude: { query: false },
    store: localforageStore
  }
});

export const http = api;
