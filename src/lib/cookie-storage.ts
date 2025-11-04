// import Cookies from 'universal-cookie';
// import { addMonths } from "date-fns";
// import { StorageKeys } from '../constants/storage-keys';

// const cookies = new Cookies();

// export const CookiesStorage = {
//   getCookieData(key: string) {
//     return cookies.get(key);
//   },
//   setCookieData(key: string, data: string) {
//     const expires = addMonths(new Date(), 1);
//     return cookies.set(key, data, { expires, path: "/" });
//   },
//   clearCookieData(key: string) {
//     return cookies.remove(key, { path: "/" });
//   },
//   getAccessToken() {
//     return cookies.get(StorageKeys.AddressToken);
//   },
//   isAuthenticated() {
//     const isAuthenticated = cookies.get(StorageKeys.IsAuthenticated);
//     return !!isAuthenticated;
//   },
//   clearSession() {
//     this.clearCookieData(StorageKeys.AddressToken);
//     this.clearCookieData(StorageKeys.UserInfo);
//     this.clearCookieData(StorageKeys.IsAuthenticated);
//   },
// };

import { StorageKeys } from "../constants/storage-keys";

export const CookiesStorage = {
  getCookieData(key: string) {
    const data = localStorage.getItem(key);
    try {
      return data ? JSON.parse(data) : null;
    } catch {
      return data;
    }
  },
  setCookieData(key: string, data: any) {
    const value = typeof data === "string" ? data : JSON.stringify(data);
    localStorage.setItem(key, value);
  },
  clearCookieData(key: string) {
    localStorage.removeItem(key);
  },
  getAccessToken() {
    return localStorage.getItem(StorageKeys.AddressToken);
  },
  isAuthenticated() {
    return !!localStorage.getItem(StorageKeys.IsAuthenticated);
  },
  clearSession() {
    this.clearCookieData(StorageKeys.AddressToken);
    this.clearCookieData(StorageKeys.UserInfo);
    this.clearCookieData(StorageKeys.IsAuthenticated);
  },
};
