import { Application, NextFunction, Request, Response } from "express";

function logHandler(
  err: TypeError,
  _req: Request,
  _res: Response,
  next: NextFunction
) {
  console.error(err);
  next(err);
}

function errorHandler(
  err: TypeError,
  _req: Request,
  res: Response,
  _next: NextFunction
) {
  res.status(500).json({
    message: err.message,
    stack: err.stack,
  });
}

function boomErrorHandler(
  err: any,
  _req: Request,
  res: Response,
  next: NextFunction
) {
  if (err.isBoom) {
    const { output } = err;
    res.status(output.statusCode).json(output.payload);
  }
  next(err);
}

export function ErrorHandler(app: Application) {
  app.use(logHandler);
  app.use(boomErrorHandler);
  app.use(errorHandler);
}
