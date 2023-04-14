import { PrismaClient, User } from "@prisma/client";

export class ProfileService {
  constructor(private orm: PrismaClient) {}

  async profile(id: User["id"]): Promise<User | null> {
    const user = await this.orm.user.findUnique({ where: { id } });
    return user;
  }

  async meBoards(id: User["id"]) {
    return this.orm.board.findMany({
      where: { userId: id },
      include: { members: true },
    });
  }
}
