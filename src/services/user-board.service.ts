import type { PrismaClient, UserBoard } from "@prisma/client";

export class BoardUserInterface {
  constructor(private orm: PrismaClient) {}

  /**
   * Añadimos una coleccion de user miembro a nuetra board
   */
  async addMemberBoard(dto: UserBoard[]) {
    const resp = await this.orm.userBoard.createMany({
      data: dto,
    });

    return resp;
  }
}
