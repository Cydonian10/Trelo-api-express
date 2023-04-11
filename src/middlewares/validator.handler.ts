import { NextFunction, Request, Response } from "express";
import { AnyZodObject, ZodError } from "zod";

export function validatorHandler(schema: AnyZodObject) {
  return function (req: Request, res: Response, next: NextFunction) {
    try {
      schema.parse({ body: req.body, params: req.params, querys: req.query });
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json(
          error.issues.map((issue) => ({
            path: issue.path[1],
            message: issue.message,
          }))
        );
      }
    }
  };
}
