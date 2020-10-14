const LOGGER_BY_TYPE = {
  debug: console.debug,
  error: console.error,
  log: console.log,
  warn: console.warn,
};

const LOGGER_ENABLED = true;

const log = (type = 'log', ...args) => {
  if (!LOGGER_ENABLED) {
    return;
  }
  const logger = LOGGER_BY_TYPE[type] || LOGGER_BY_TYPE.log;
  logger('[cheesebit] ', ...args);
};

export default {
  log(...args) {
    log('log', ...args);
  },
  debug(...args) {
    log('debug', ...args);
  },
  warn(...args) {
    log('warn', ...args);
  },
  error(...args) {
    log('error', ...args);
  },
};
