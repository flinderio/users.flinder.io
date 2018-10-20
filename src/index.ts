import app from "./App";
import { logger } from "./utils/logger";

const port = process.env.PORT || 3000;

app.listen(port, (err) => {
  if (err) {
    return logger.error("Error occured while starting server! %j", err);
  }
  return logger.info(`server is listening on ${port}`);
});
