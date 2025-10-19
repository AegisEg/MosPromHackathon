import { DECLENSION_CONFIG, DeclensionKey } from './declensionConfig';

/**
 * Функция для определения правильного склонения слова по числу
 * @param count - число
 * @param words - массив из трех форм слова [1, 2-4, 5+]
 * @returns правильная форма слова
 */
export const getDeclension = (count: number, words: [string, string, string]): string => {
  const absCount = Math.abs(count);
  const lastDigit = absCount % 10;
  const lastTwoDigits = absCount % 100;

  // Исключения для чисел от 11 до 19
  if (lastTwoDigits >= 11 && lastTwoDigits <= 19) {
    return words[2]; // 5+ форма
  }

  // Определяем форму по последней цифре
  if (lastDigit === 1) {
    return words[0]; // 1 форма
  } else if (lastDigit >= 2 && lastDigit <= 4) {
    return words[1]; // 2-4 форма
  } else {
    return words[2]; // 5+ форма
  }
};

/**
 * Функция для получения склонения из конфигурации
 * @param count - число
 * @param key - ключ из конфигурации склонений
 * @returns правильная форма слова
 */
export const getDeclensionByKey = (count: number, key: DeclensionKey): string => {
  const words = DECLENSION_CONFIG[key];
  return getDeclension(count, [...words] as [string, string, string]);
};

/**
 * Функция для форматирования числа со склонением
 * @param count - число
 * @param key - ключ из конфигурации склонений
 * @returns отформатированная строка "число слово"
 */
export const formatWithDeclension = (count: number, key: DeclensionKey): string => {
  const word = getDeclensionByKey(count, key);
  return `${count} ${word}`;
};

/**
 * Функция для форматирования времени (годы и месяцы)
 * @param years - количество лет
 * @param months - количество месяцев
 * @returns отформатированная строка времени
 */
export const formatTimePeriod = (years: number, months: number): string => {
  const parts: string[] = [];
  
  if (years > 0) {
    parts.push(formatWithDeclension(years, 'YEARS'));
  }
  
  if (months > 0) {
    parts.push(formatWithDeclension(months, 'MONTHS'));
  }
  
  return parts.join(' ');
};

/**
 * Функция для форматирования продолжительности в днях
 * @param days - количество дней
 * @returns отформатированная строка
 */
export const formatDays = (days: number): string => {
  return formatWithDeclension(days, 'DAYS');
};

/**
 * Функция для форматирования продолжительности в часах
 * @param hours - количество часов
 * @returns отформатированная строка
 */
export const formatHours = (hours: number): string => {
  return formatWithDeclension(hours, 'HOURS');
};

/**
 * Функция для форматирования продолжительности в минутах
 * @param minutes - количество минут
 * @returns отформатированная строка
 */
export const formatMinutes = (minutes: number): string => {
  return formatWithDeclension(minutes, 'MINUTES');
};
