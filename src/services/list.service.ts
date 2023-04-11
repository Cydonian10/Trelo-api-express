import type { Board, List, PrismaClient } from "@prisma/client";

export class ListService {
  constructor(private orm: PrismaClient) {}

  async getByBoardId(id: Board["id"]): Promise<List[]> {
    const resp = await this.orm.list.findMany({
      where: {
        boardId: id,
      },
    });
    return resp;
  }

  async create(data: Omit<List, "id">): Promise<List> {
    const resp = await this.orm.list.create({
      data: {
        position: data.position,
        title: data.title,
        boardId: data.boardId,
      },
    });
    return resp;
  }

  async update(id: List["id"], changes: Partial<List>) {
    const resp = await this.orm.list.update({
      where: { id },
      data: changes,
    });
    return resp
  }

  async remove(id: List["id"]): Promise<number> {
    const resp = await this.orm.list.delete({
      where: { id },
    });

    return resp.id;
  }
}
