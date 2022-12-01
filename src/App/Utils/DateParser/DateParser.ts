export const dateParser = (dateString: string): string => {
    const date = new Date(dateString);

    const now = new Date();
    const diffYear = now.getFullYear() - date.getFullYear();
    if (diffYear !== 0) {
        const lastNumber = diffYear % 10;
        if ((10 <= diffYear && diffYear <= 20) || lastNumber === 0 || (5 <= lastNumber && lastNumber <= 9)) {
            return `${diffYear} лет назад`;
        }
        if (lastNumber == 1) {
            return `${diffYear} год назад`;
        }
        if (2 <= lastNumber && lastNumber <= 4) {
            return `${diffYear} года назад`;
        }
    }
    const diffMonth = now.getMonth() - date.getMonth();
    if (diffMonth !== 0) {
        const lastNumber = diffMonth % 10;
        if ((10 <= diffMonth && diffMonth <= 20) || lastNumber === 0 || (5 <= lastNumber && lastNumber <= 9)) {
            return `${diffMonth} месяцев назад`;
        }
        if (lastNumber === 1) {
            return `месяц назад`;
        }
        if (2 <= lastNumber && lastNumber <= 4) {
            return `${diffMonth} месяца назад`;
        }
    }
    const diffDate = now.getDate() - date.getDate();

    if (diffDate !== 0) {
        const lastNumber = diffDate % 10;
        if ((10 <= diffDate && diffDate <= 20) || lastNumber === 0 || (5 <= lastNumber && lastNumber <= 9)) {
            return `${diffDate} дней назад`;
        }
        if (lastNumber === 1) {
            return `${diffDate} день назад`;
        }
        if (2 <= lastNumber && lastNumber <= 4) {
            return `${diffDate} дня назад`;
        }
    }
    return `сегодня в ${date.getHours()}:${date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes()}`;
}

export default dateParser;