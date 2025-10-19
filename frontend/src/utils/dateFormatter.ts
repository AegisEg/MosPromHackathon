/**
 * Форматирует дату из ISO строки в читаемый формат
 * @param dateString - дата в формате ISO (например: "2025-10-18T15:06:04.000000Z")
 * @param format - формат вывода ('short' | 'long' | 'time')
 * @returns отформатированная дата
 */
export const formatDate = (dateString: string, format: 'short' | 'long' | 'time' = 'short'): string => {
    if (!dateString) return '';
    
    try {
        const date = new Date(dateString);
        
        if (isNaN(date.getTime())) {
            return 'Неверная дата';
        }
        
        const options: Intl.DateTimeFormatOptions = {};
        
        switch (format) {
            case 'short':
                options.day = '2-digit';
                options.month = '2-digit';
                options.year = 'numeric';
                break;
            case 'long':
                options.day = '2-digit';
                options.month = 'long';
                options.year = 'numeric';
                break;
            case 'time':
                options.day = '2-digit';
                options.month = '2-digit';
                options.year = 'numeric';
                options.hour = '2-digit';
                options.minute = '2-digit';
                break;
        }
        
        return date.toLocaleDateString('ru-RU', options);
    } catch (error) {
        console.error('Ошибка при форматировании даты:', error);
        return 'Ошибка даты';
    }
};

/**
 * Форматирует дату для отображения в карточке вакансии
 * @param dateString - дата в формате ISO
 * @returns строка в формате "Дата публикации: ДД.ММ.ГГГГ"
 */
export const formatVacancyDate = (dateString: string): string => {
    const formattedDate = formatDate(dateString, 'short');
    return `Дата публикации: ${formattedDate}`;
};

