import * as express from "express";
import * as morgan from "morgan";
import { morganOption } from "./utils/logger";

class App {
  public express;

  constructor() {
    this.express = express();
    this.mountRoutes();
  }

  private mountRoutes(): void {
    const router = express.Router();

    router.get("/", (req, res) => {
      res.json({ message: "Hello World!" });
    });

    // logging
    if (process.env.NODE_ENV === "production") {
      this.express.use(morgan("combined", morganOption));
    } else if (process.env.NODE_ENV === "development") {
      this.express.use(morgan("dev", morganOption));
    }

    this.express.use("/", router);
  }
}

export default new App().express;
