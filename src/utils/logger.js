const basicPino = require("pino");

const basicPinoLogger = basicPino({
  level: "info", // Log level (default: 'info')
  // prettyPrint: true, // Enable pretty printing of log messages (default: false)
  timestamp: true, // Include timestamp in log messages (default: false)
  redact: ["password", "ssn"], // Redact sensitive fields from log messages
  base: null, // Base object to attach log properties (default: null)
  serializers: {
    // Custom serializers for formatting log values
    req: basicPino.stdSerializers.req,
    res: basicPino.stdSerializers.res,
  },
  messageKey: "message", // The key used for the log message (default: 'msg')
  levelKey: "level", // The key used for the log level (default: 'level')
  name: "my-logger", // The name of the logger (default: undefined)
  enabled: true, // Enables or disables logging (default: true)
  // prettyPrint: {
  //   // Options for pretty printing
  //   colorize: true, // Colorize log output (default: false)
  //   translateTime: true, // Format and translate timestamp (default: false)
  //   ignore: "pid,hostname", // Properties to ignore in pretty print output (default: undefined)
  // },
  base: {
    // Base object to attach log properties
    app: "Backend blogging platform",
    env: process.env.NODE_ENV,
  },
  levelFirst: false, // Prints the log level before the log message (default: false)
  levelVal: (level) => ({ level }), // Customizes the log level format (default: undefined)
  levelLabel: "lvl", // Specifies the key used for the log level label (default: undefined)
  useLevelLabels: false, // Uses string labels for log levels instead of numeric values (default: false)
  messageKey: "message", // The key used for the log message (default: 'msg')
  timestamp: basicPino.stdTimeFunctions.isoTime, // Specifies a custom timestamp format (default: undefined)
  level: process.env.PINO_LOG_LEVEL || "info",
  formatters: {
    bindings: (bindings) => {
      return { pid: bindings.pid, host: bindings.hostname };
    },
    level: (label) => {
      return { level: label.toUpperCase() };
    },
  },
});

const expressPino = require("express-pino-logger")({
  logger: basicPinoLogger,
});

const logger = expressPino.logger;

module.exports = logger;
