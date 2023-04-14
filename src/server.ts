import express, { Application } from "express";
import http from "http";
import path from "path";
import { cwd } from "process";
import cors from "cors";
import "@/config/config";
import passport from "passport";

import { ApiRoute } from "@/routes/routes";
import { JwtStrategy } from "@/strategies/jwt.strategy";
import { ErrorHandler } from "@/middlewares/error.handler";

declare global {
  namespace Express {
    interface User {
      id: number;
      name: string;
      rol: string;
    }
    interface Request {
      user?: Express.User;
    }
  }
}

class ServerHttp {
  private port: number = 8080;
  private app: Application = express();
  private httpServer: http.Server = http.createServer(this.app);

  constructor() {
    this.listenServer();
  }

  private middlewares() {
    this.app.use(express.json());
    this.app.use(cors());
    this.app.use("/public", express.static(path.join(cwd(), "public")));
    passport.use(JwtStrategy);

    ApiRoute(this.app);
    ErrorHandler(this.app);
  }

  private listenServer() {
    this.middlewares();
    this.httpServer.listen(this.port, () => {
      console.log(`[ Listen Server ] http://localhost:${this.port}`);
    });
  }
}

new ServerHttp();
