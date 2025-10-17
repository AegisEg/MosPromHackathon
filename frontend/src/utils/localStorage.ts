
export enum LocalStorageKeys {
    ACCESS_TOKEN = 'access_token',
    REFRESH_TOKEN = 'refresh_token',
}


/**
 * Сохранение в localStorage
 * @param key
 * @param value
 */
export const saveToLocalStorage = function (key: string, value: string): void {
    localStorage.setItem(key, value);
};

/**
 * Получаение из localStorage
 * @param key
 */
export const getFromLocalStorage = function (key: string): string | null {
    return localStorage.getItem(key);
};


/**
 * Удаление из localStorage
 * @param key
 */
export const removeFromLocalStorage = function (key: string): void {
    localStorage.removeItem(key);
};