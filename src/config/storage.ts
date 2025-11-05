import { createStorage, cookieStorage } from 'wagmi';

export const appStorage = createStorage({
  storage: cookieStorage,
});
