import { validatorHandler } from "@/middlewares/validator.handler";
import {
  AddMembersBoardValidate,
  RemoveMembersValidate,
  UpdateMemberValidate,
} from "@/models/member.model";
import { boardUserService } from "@/services";
import { NextFunction, Request, Response, Router } from "express";
import passport from "passport";

export const boarUserRouter = Router();

boarUserRouter.use([passport.authenticate("jwt")]);

/**
 * Añadir una coleccion de miembros a mi board
 */
boarUserRouter.post(
  "/add",
  [validatorHandler(AddMembersBoardValidate)],
  async (req: Request, res: Response, next: NextFunction) => {
    const members = req.body.members; // array de users [nuevo miembros]

    try {
      const newMembers = await boardUserService.addMemberBoard(members);
      res.json(newMembers);
    } catch (error) {
      next(error);
    }
  }
);

/**
 * Eliminar un usuario(member) del board
 */
boarUserRouter.delete(
  "/remove",
  [validatorHandler(RemoveMembersValidate)],
  async (req: Request, res: Response, next: NextFunction) => {
    const members = req.body.userIds; // array de idsUsers [nuevo miembros]

    try {
      const newMembers = await boardUserService.removeMemberBoard(members);
      res.json(newMembers);
    } catch (error) {
      next(error);
    }
  }
);

/**
 * Actulizar un usuario(member)
 */
boarUserRouter.put(
  "/member/:userId/board/:boardId",
  [validatorHandler(UpdateMemberValidate)],
  async (req: Request, res: Response, next: NextFunction) => {
    const role = req.body.role; // role Write,Read
    const userId = Number(req.params.userId);
    const boardId = Number(req.params.boardId);

    try {
      const newMembers = await boardUserService.updateMember(userId, boardId, {
        role,
      });
      res.json(newMembers);
    } catch (error) {
      next(error);
    }
  }
);
