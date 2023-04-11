import { validatorHandler } from "@/middlewares/validator.handler";
import { CreateCardValidate } from "@/models/card.model";
import { cardService } from "@/services";
import { NextFunction, Request, Response, Router } from "express";

export const cardRouter = Router();

/**
 * Crear card
 */
cardRouter.post(
  "/",
  [validatorHandler(CreateCardValidate)],
  async (req: Request, res: Response, next: NextFunction) => {
    const body = req.body;
    try {
      const resp = await cardService.create(body);
      res.json(resp);
    } catch (error) {
      next(error);
    }
  }
);

/**
 * Listar cards por lista
 */
cardRouter.get(
  "/list/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    try {
      const resp = await cardService.findByListId(Number(id));
      res.json(resp);
    } catch (error) {
      next(error);
    }
  }
);

/**
 * Actulizar una card
 */
cardRouter.put(
  "/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    const body = req.body;
    try {
      const resp = await cardService.update(Number(id), body);
      res.json(resp);
    } catch (error) {
      next(error);
    }
  }
);

/**
 * Eliminar una card
 */
cardRouter.delete(
  "/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    try {
      const resp = await cardService.remove(Number(id));
      res.json(resp);
    } catch (error) {
      next(error);
    }
  }
);
