import log4js from 'log4js';

/**
 * creates an instance of logger according the established parameters
 * @param {string} category - category to identify the logger instance
 * @returns log4js.Logger
 */
export function createLogger(category) {
  const logger = log4js.getLogger(category);
  logger.level = process.env.LOGGER_LEVEL || 'info';
  return logger;
}
