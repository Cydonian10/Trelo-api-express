import { validatorHandler } from "@/middlewares/validator.handler";
import { CreateBoardValidate } from "@/models/board.model";
import { boardService } from "@/services";
import { NextFunction, Request, Response, Router } from "express";
import passport from "passport";

export const boardRoute = Router();

// boardRoute.get("/",(req:Request, res:Response,next:NextFunction) => {
//   try {
//   } catch (error) {}
// });

boardRoute.use(passport.authenticate("jwt", { session: false }));

/**
 * Crear un board
 */
boardRoute.post(
  "/",
  [validatorHandler(CreateBoardValidate)],
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.user!;
    const body = req.body;

    const data = { userId: id, ...body };
    try {
      const resp = await boardService.create(data);
      res.json(resp);
    } catch (error) {
      next(error);
    }
  }
);

/**
 * Traear todos los boards
 */
boardRoute.get("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const resp = await boardService.getAll();
    res.json(resp);
  } catch (error) {
    next(error);
  }
});


/**
 * Traer un board
 */
boardRoute.get("/:id",async (req: Request, res: Response, next: NextFunction) => {
  const id = req.params.id
  try {
    const resp = await boardService.findById(Number(id));
    res.json(resp);
  } catch (error) {
    next(error);
  }
});


/**
 * Actulizar board
 */
boardRoute.put("/:id",async (req: Request, res: Response, next: NextFunction) => {
  const id = req.params.id
  const body = req.body
  try {
    const resp = await boardService.update(Number(id),body);
    res.json(resp);
  } catch (error) {
    next(error);
  }
});