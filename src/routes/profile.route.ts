import { profileServce } from "@/services";
import { NextFunction, Response, Router, Request } from "express";
import passport from "passport";

export const profileRoute = Router();

profileRoute.use(passport.authenticate("jwt", { session: false }));

profileRoute.get(
  "/",
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.user!;
    const resp = await profileServce.profile(id);
    try {
      res.json(resp);
    } catch (error) {
      next(error);
    }
  }
);

profileRoute.get(
  "/boards",
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.user!;

    const resp = await profileServce.meBoards(id);
    try {
      res.json(resp);
    } catch (error) {
      next(error);
    }
  }
);
