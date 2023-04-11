import { PrismaClient, User } from "@prisma/client";

export class ProfileService {
  constructor(private orm: PrismaClient) {}

  async profile(id: User["id"]):Promise<User|null> {
    const user = await this.orm.user.findUnique({ where: { id } });
    return user;
  }
}
