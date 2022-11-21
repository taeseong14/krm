/**
 * Date Format
 * @param {number | Date} date timestamp | Date
 * @param {string} [format='년-월-일 시:분:초'] format
 * @returns {string}
 */
function format(date, format) {
    if (typeof date === 'number') date = new Date(date);
    format = format || '년-월-일 시:분:초';
    format = format.replace(/(년|Y)+/gi, e => {
        if (e.length === 1) return date.getFullYear();
        return date.getFullYear().toString().substr(2);
    });
    format = format.replace(/(월|M)+/g, e => {
        if (e.length === 1) return date.getMonth() + 1;
        return (date.getMonth() + 1).toString().padStart(2, '0');
    });
    format = format.replace(/(일|D)+/gi, e => {
        if (e.length === 1) return date.getDate();
        return date.getDate().toString().padStart(2, '0');
    });
    format = format.replace(/(시|h)+/gi, e => {
        if (e.length === 1) return date.getHours();
        return date.getHours().toString().padStart(2, '0');
    });
    format = format.replace(/(분|m)+/g, e => {
        if (e.length === 1) return date.getMinutes();
        return date.getMinutes().toString().padStart(2, '0');
    });
    format = format.replace(/(초|s)+/gi, e => {
        if (e.length === 1) return date.getSeconds();
        return date.getSeconds().toString().padStart(2, '0');
    });
    return format;
}


module.exports = { format };
