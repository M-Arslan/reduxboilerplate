/**
 * Check a variable to ensure it is an object that is not null.
 * @param {any} obj variable to check
 * @returns {boolean}
 */
export const ensureNonNullObject = (obj:any) => (typeof obj === 'object' && obj !== null);

/**
 * Check a variable to ensure it is a string that is not empty or all whitespace.
 * @param {any} str variable to check
 * @returns {boolean}
 */
export const ensureNonEmptyString = (str:any) => (typeof str === 'string' && str.trim() !== '');

/**
 * Check a variable to ensure it is an array with at least one element.
 * @param {any} arr variable to check
 * @returns {boolean}
 */
export const ensureNonEmptyArray = (arr:any) => (Array.isArray(arr) && arr.length > 0);

/**
 * Check a variable to ensure it is a valid number instance.
 * @param {any} num variable to check
 * @returns {boolean}
 */
export const ensureIsNumber = (num:any) => (hasValue(num) && typeof num === 'number' && !isNaN(num));

/**
 * Check a variable to ensure it holds a numeric (string or number) value
 * @param {any} num variable to check
 * @returns {boolean}
 */
export const ensureNumericValue = (num:any) => (hasValue(num) && (ensureIsNumber(num) || ensureIsNumber(parseFloat(num))));

/**
 * Check that a variable is not null or undefined.
 * @param {any} val variable to check
 * @returns {boolean}
 */
export const hasValue = (val:any) => (typeof val !== 'undefined' && val !== null);

export function formatDate(date:any) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2)
        month = '0' + month;
    if (day.length < 2)
        day = '0' + day;

    return [month, day, year].join('/');
}