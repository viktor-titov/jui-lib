export declare const STANDARD_DATE_FORMAT = "YYYY-MM-DD";
export declare const STANDARD_TIME_FORMAT = "HH:mm";
export declare const STANDARD_DATETIME_FORMAT = "MMMM D YYYY, HH:mm:ss.SSS";
export declare const ONE_MILLISECOND = 1000;
export declare const ONE_SECOND: number;
export declare const ONE_MINUTE: number;
export declare const ONE_HOUR: number;
export declare const ONE_DAY: number;
export declare const DEFAULT_MS_PRECISION: number;
/**
 * @param {number} timestamp
 * @param {number} initialTimestamp
 * @param {number} totalDuration
 * @returns {number} 0-100 percentage
 */
export declare function getPercentageOfDuration(duration: number, totalDuration: number): number;
/**
 * @param {number} duration (in microseconds)
 * @returns {string} formatted, unit-labelled string with time in milliseconds
 */
export declare function formatDate(duration: number): string;
/**
 * @param {number} duration (in microseconds)
 * @returns {string} formatted, unit-labelled string with time in milliseconds
 */
export declare function formatTime(duration: number): string;
/**
 * @param {number} duration (in microseconds)
 * @returns {string} formatted, unit-labelled string with time in milliseconds
 */
export declare function formatDatetime(duration: number): string;
/**
 * @param {number} duration (in microseconds)
 * @returns {string} formatted, unit-labelled string with time in milliseconds
 */
export declare function formatMillisecondTime(duration: number): string;
/**
 * @param {number} duration (in microseconds)
 * @returns {string} formatted, unit-labelled string with time in seconds
 */
export declare function formatSecondTime(duration: number): string;
/**
 * Humanizes the duration for display.
 *
 * Example:
 * 5000ms => 5s
 * 1000μs => 1ms
 * 183840s => 2d 3h
 *
 * @param {number} duration (in microseconds)
 * @return {string} formatted duration
 */
export declare function formatDuration(duration: number): string;
export declare function formatRelativeDate(value: any, fullMonthName?: boolean): string;
