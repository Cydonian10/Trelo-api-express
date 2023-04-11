import { Board, Colors, PrismaClient, User } from "@prisma/client";

export class BoardService {
  constructor(private orm: PrismaClient) {}

  async findById(id: Board["id"]) {
    const resp = await this.orm.board.findMany({
      where: { id },
      include: {
        list: {
          orderBy: {
            position: "asc",
          },
          include: {
            cards: {
              orderBy: {
                position: "asc",
              },
            },
          },
        },
      },
    });
    return resp;
  }

  async findByUserId(id: User["id"]) {
    const resp = await this.orm.board.findMany({
      include: {
        members: {
          where: {
            memberId: id,
          },
        },
      },
    });

    return resp;
  }

  async getAll() {
    return this.orm.board.findMany({
      include: { members: true },
    });
  }

  async create(data: {title:string,backgroundColor:Colors,userId:number}) {
 ;
 
    const board = await this.orm.board.create({
      data: {
        title: data.title,
        backgroundColor: data.backgroundColor,
        userId:data.userId,
      
        list: {
          createMany: {
            data: [
              { title: "definido", position: 1 },
              { title: "progreso", position: 2 },
            ],
          },
        },
      },
    });
    return board;
  }

  async update(id: Board["id"], changes: Partial<Board>) {
    const resp = await this.orm.board.update({
      where: { id },
      data: changes,
    });

    return resp;
  }
}
