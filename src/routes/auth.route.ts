import { validatorHandler } from "@/middlewares/validator.handler";
import { RegisterDtoValidate } from "@/models/auth.model";
import { LoginDtoValidate } from "@/models/auth.model";
import { authService } from "@/services";
import { NextFunction, Response, Router, Request } from "express";

export const authRoute = Router();

authRoute.post(
  "/login",
  [validatorHandler(LoginDtoValidate)],
  async (req: Request, res: Response, next: NextFunction) => {
    const data = req.body;
    console.log(data);
    try {
      const resp = await authService.login(data);
      res.json({
        token: resp.token,
        refresh_token:resp.refreshToken
      });
    } catch (error) {
      next(error);
    }
  }
);

authRoute.post(
  "/register",
  [validatorHandler(RegisterDtoValidate)],
  async (req: Request, res: Response, next: NextFunction) => {
    const data = req.body;
    console.log(data);
    try {
      const resp = await authService.register(data);
      res.json({
        token: resp,
      });
    } catch (error) {
      next(error);
    }
  }
);

authRoute.post(
  "/refresh-token",
  async (req: Request, res: Response, next: NextFunction) => {
    const data = req.body // refesh token {refreshToken:"asdfadf"};
    
    try {
      const resp = await authService.generateAccessTokenByRefreshToken(data.refreshToken);
      res.json({
        token: resp?.newAcessToken,
        refresh_token:resp?.newRefreshToken
      });
    } catch (error) {
      next(error);
    }
  }
);

authRoute.post(
  "/is-available",
  async (req: Request, res: Response, next: NextFunction) => {
    const data = req.body // email {email:"kasjdf"};
    
    try {
      const resp = await authService.isAvailable(data.email);
      res.json(resp);
    } catch (error) {
      next(error);
    }
  }
);