import { validatorHandler } from "@/middlewares/validator.handler";
import { CreateListValidate } from "@/models/list.model";
import { listService } from "@/services";
import { NextFunction, Request, Response, Router } from "express";
import passport from "passport";

export const listRoute = Router();

listRoute.use(passport.authenticate("jwt",{session:false}))

/**
 * Crear una lista
 */
listRoute.post(
  "/",
  [validatorHandler(CreateListValidate)],
  async (req: Request, res: Response, next: NextFunction) => {
    const body = req.body;

    try {
      const resp = await listService.create(body);
      res.json(resp);
    } catch (error) {
      next(error);
    }
  }
);

/**
 * Coleccion de listas por board id
 */
listRoute.get(
  "/board/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    try {
      const resp = await listService.getByBoardId(Number(id));
      res.json(resp);
    } catch (error) {
      next(error);
    }
  }
);

/**
 * Actulizar lista
 */
listRoute.put(
    "/:id",
    async (req: Request, res: Response, next: NextFunction) => {
      const id = req.params.id;
      const body = req.body
      try {
        const resp = await listService.update(Number(id),body);
        res.json(resp);
      } catch (error) {
        next(error);
      }
    }
  );
  

/**
 * Remover lista
 */
listRoute.delete(
  "/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;

    try {
      const resp = await listService.remove(Number(id));
      res.json(resp);
    } catch (error) {
      next(error);
    }
  }
);
