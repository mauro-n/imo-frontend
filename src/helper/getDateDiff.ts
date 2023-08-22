/**
 * Retorna uma string com a diferença da data
 * fornecida da data atual.
 *   */
function getDateDiff(data: string) {
    const nowDate = new Date();
    const date = new Date(data);

    const year = date.getFullYear();
    const nowYear = nowDate.getFullYear();
    
    if (year !== nowYear) {
        const yearDiff = nowYear - year;
        return `Há ${yearDiff} ${yearDiff > 1 ? 'anos.' : 'ano.'}`;
    }

    const month = date.getMonth();
    const nowMonth = nowDate.getMonth();

    if (month !== nowMonth) {
        const monthDiff = nowMonth - month;
        return `Há ${monthDiff} ${monthDiff > 1 ? 'meses.' : 'mês'}`;
    }

    const day = date.getDay();
    const nowDay = nowDate.getDay();

    if (day !== nowDay) {
        const dayDiff = nowDay - day;
        return `Há ${dayDiff} ${dayDiff > 1 ? 'dias.' : 'dia'}`
    }

    return 'Hoje';
}

export default getDateDiff;