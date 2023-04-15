import { Application } from "express";

import { boardRoute } from "@/routes/board.route";
import { authRoute } from "./auth.route";
import { profileRoute } from "@/routes/profile.route";
import { listRoute } from "./list.route";
import { cardRouter } from "./card.route";
import { boarUserRouter } from "@/routes/user-board.route";

export function ApiRoute(app: Application) {
  app.use("/boards", boardRoute);
  app.use("/auth", authRoute);
  app.use("/profile", profileRoute);
  app.use("/lists", listRoute);
  app.use("/cards", cardRouter);
  app.use("/member-board", boarUserRouter);
}
