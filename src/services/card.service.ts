import type { Card, List, PrismaClient } from "@prisma/client";

export class CardService {
  constructor(private orm: PrismaClient) {}

  findAll() {
    return this.orm.card.findMany();
  }

  async findByListId(id: List["id"]): Promise<Card[]> {
    const resp = await this.orm.card.findMany({
      where: {
        listId: id,
      },
    });

    return resp;
  }

  async create(data: Omit<Card, "id">): Promise<Card> {
    const resp = await this.orm.card.create({
      data: {
        description: data.description,
        title: data.title,
        listId: data.listId,
        position: data.position,
      },
    });

    return resp;
  }

  async update(id: Card["id"], change: Partial<Card>): Promise<Card> {
    const resp = await this.orm.card.update({
      where: { id },
      data: change,
    });

    return resp;
  }

  async remove(id:Card["id"]){
    const resp =  await this.orm.card.delete({
      where:{id}
  })

  return resp.id
  }
}
