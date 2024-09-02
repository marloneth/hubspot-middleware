import log4js from 'log4js';

export function createLogger(category) {
  const logger = log4js.getLogger(category);
  logger.level = process.env.LOGGER_LEVEL || 'info';
  return logger;
}
