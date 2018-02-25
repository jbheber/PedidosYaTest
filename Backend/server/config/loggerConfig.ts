import * as winston from 'winston';
import * as fs from 'fs';

const logDir:string = "logs";
/**
 * Creates log folder if it doesntExist
 */
export function initializeLogger() {
    if (!fs.existsSync(logDir)) {
        fs.mkdirSync(logDir);
    }
}

/**
 * Instance of winston logger for errors.
 * Creates file error with filelog- as prefix
 */
export const logger = new winston.Logger({
    transports: [
        new winston.transports.File({
            name: 'error-file',
            filename: `${logDir}/filelog-error.log`,
            level: 'error',
            colorize: true,
            timestamp: function () {
                return Date.now();
            },
            prettyPrint: true,
            json: false,
            formatter: function (options) {
                // Return string will be passed to logger.
                return new Date(options.timestamp()).toISOString() + ' || ' + options.level.toUpperCase() + ' || ' + (options.message ? options.message : '') +
                    (options.meta && Object.keys(options.meta).length ? '\n\t' + JSON.stringify(options.meta) : '');
            }
        }),
        new winston.transports.File({
            name: 'info-file',
            filename: `${logDir}/filelog-info.log`,
            level: 'info',
            colorize: true,
            timestamp: function () {
                return Date.now();
            },
            prettyPrint: true,
            json: false,
            formatter: function (options) {
                // Return string will be passed to logger.
                return new Date(options.timestamp()).toISOString() + ' || ' + options.level.toUpperCase() + ' || ' + (options.message ? options.message : '') +
                    (options.meta && Object.keys(options.meta).length ? '\n\t' + JSON.stringify(options.meta) : '');
            }
        }),
        new winston.transports.File({
            name: 'warning-file',
            filename: `${logDir}/filelog-warning.log`,
            level: 'warning',
            colorize: true,
            timestamp: function () {
                return Date.now();
            },
            prettyPrint: true,
            json: false,
            formatter: function (options) {
                // Return string will be passed to logger.
                return new Date(options.timestamp()).toISOString() + ' || ' + options.level.toUpperCase() + ' || ' + (options.message ? options.message : '') +
                    (options.meta && Object.keys(options.meta).length ? '\n\t' + JSON.stringify(options.meta) : '');
            }
        })
    ],
    exceptionHandlers: [
        new winston.transports.File({
            name: 'exception-handler-file',
            filename: `${logDir}/filelog-exception.log`,
            handleExceptions: true,
            humanReadableUnhandledException: true,
            timestamp: function () {
                return Date.now();
            },
            prettyPrint: true,
            json: false,
            formatter: function (options) {
                // Return string will be passed to logger.
                return new Date(options.timestamp()).toISOString() + ' || ' + options.level.toUpperCase() + ' || ' + (options.message ? options.message : '') +
                    (options.meta && Object.keys(options.meta).length ? '\n\t' + JSON.stringify(options.meta) : '');
            }
        })
    ],
    exitOnError: false,
    levels: { error: 0, warn: 1, info: 2, verbose: 3, debug: 4, silly: 5 },
    colors: { error: 'red', warn: 'orange', info: 'yellow', verbose: 'blue', debug: 'green', silly: 'white' }
});
