// src/hooks/useAppStorage.ts
import { useCallback } from 'react';
import { appStorage } from '../config/storage';

export function useAppStorage() {
  const getItem = useCallback(async <T = any>(key: string): Promise<T | undefined> => {
    try {
      const value: any = await appStorage.getItem(key);
      return value;
    } catch (err) {
      console.error(`Error getting item ${key}`, err);
      return undefined;
    }
  }, []);

  const setItem = useCallback(async <T = any>(key: string, value: T): Promise<void> => {
    try {
      await appStorage.setItem(key, value);
    } catch (err) {
      console.error(`Error setting item ${key}`, err);
    }
  }, []);

  const removeItem = useCallback(async (key: string): Promise<void> => {
    try {
      await appStorage.removeItem(key);
    } catch (err) {
      console.error(`Error removing item ${key}`, err);
    }
  }, []);

  return { getItem, setItem, removeItem };
}
