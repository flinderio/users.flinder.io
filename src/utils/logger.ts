import { Options } from "morgan";
import { createLogger, format, transports } from "winston";

export const logger = createLogger({
  format: format.json(),
  level: "info",
  transports: [
    /**
     * - Write to all logs with level `info` and below to `combined.log`
     * - Write all logs error (and below) to `error.log`.
     */
    new transports.File({ filename: "error.log", level: "error" }),
    new transports.File({ filename: "combined.log" }),
  ],
});

/**
 * If we're in development then log to the `console` with the format:
 * `${info.level}: ${info.message} JSON.stringify({ ...rest })`
 */
if (process.env.NODE_ENV === "development") {
  logger.add(new transports.Console({
    format: format.combine(
      format.colorize(),
      format.simple(),
    ),
  }));
}

export const morganOption: Options = {
  stream: {
    write: (message: string) => {
      logger.info(message.trim());
    },
  },
};
