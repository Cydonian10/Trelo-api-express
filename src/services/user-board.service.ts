import { conflict, notFound } from "@hapi/boom";
import type { Board, PrismaClient, User, UserBoard } from "@prisma/client";

export class BoardUserInterface {
  constructor(private orm: PrismaClient) {}

  /**
   * Añadimos una coleccion de user miembro a nuetra board
   */
  async addMemberBoard(dto: UserBoard[]) {
    const usersId = dto.map((item) => item.memberId);
    const boardId = dto[0].boardId;
    // array de users
    const users = await this.orm.user.findMany({
      where: {
        id: { in: usersId },
      },
    });

    if (users.length !== dto.length)
      throw notFound(
        `Usurios encontrados ${users.map(
          (item) => item.name
        )} un usuario o usuarios no se encuentran,total de usuarios enonctado es ${
          users.length
        } de ${dto.length}`
      );

    try {
      const resp = await this.orm.userBoard.createMany({
        data: dto,
      });
      return resp;
    } catch (error) {
      throw conflict("usuarios ya existen");
    }
  }

  /**
   * Removemos usuarios(members) del board
   */
  async removeMemberBoard(ids: User["id"]) {
    const resp = await this.orm.userBoard.deleteMany({
      where: {
        memberId: { in: ids },
      },
    });

    return resp;
  }

  /**
   * Actulizar usuario (member)
   */
  async updateMember(
    userId: User["id"],
    boardId: Board["id"],
    changes: Partial<Omit<UserBoard, "boardId" | "memberId">>
  ) {
    const member = await this.orm.userBoard.findUnique({
      where: {
        memberId_boardId: {
          boardId,
          memberId: userId,
        },
      },
    });

    if (!member) throw notFound("Member not found");

    const resp = this.orm.userBoard.update({
      where: {
        memberId_boardId: {
          memberId: userId,
          boardId,
        },
      },
      data: changes,
    });

    return resp;
  }
}
