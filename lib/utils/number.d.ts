/**
 * given a number and a desired precision for the floating
 * side, return the number at the new precision.
 *
 * toFloatPrecision(3.55, 1) // 3.5
 * toFloatPrecision(0.04422, 2) // 0.04
 * toFloatPrecision(6.24e6, 2) // 6240000.00
 *
 * does not support numbers that use "e" notation on toString.
 *
 * @param {number} number
 * @param {number} precision
 * @returns {number} number at new floating precision
 */
export declare function toFloatPrecision(number: number, precision: number): number;
