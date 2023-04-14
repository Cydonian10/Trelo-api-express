import { NextFunction, Request, Response, Router } from "express";

export const boarUserRouter = Router();

/**
 * Añadir una coleccion de miembros a mi board
 */
boarUserRouter.post(
  "/add",
  [],
  (req: Request, res: Response, next: NextFunction) => {
    const users = req.body; // array de users [nuevo miembros]

    try {
      res.json(users);
    } catch (error) {
      next(error);
    }
  }
);
