import { PrismaClient } from "@prisma/client";

import { CardService } from "@/services/card.service";
import { BoardService } from "@/services/board.service";
import { ListService } from "@/services/list.service";
import { AuthService } from "./auth.service";
import { UserService } from "./user.service";
import { ProfileService } from "./profile.service";

const prisma = new PrismaClient()

export const cardService = new CardService(prisma)
export const boardService = new BoardService(prisma)
export const listService = new ListService(prisma)
export const userService = new UserService(prisma)
export const profileServce = new ProfileService(prisma)

export const authService = new AuthService(prisma,userService)