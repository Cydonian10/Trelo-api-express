import type { PrismaClient, User } from "@prisma/client";
import { hash } from "bcrypt";

export class UserService {
  constructor(private orm: PrismaClient) {}

  async findUserById(id: User["id"]): Promise<User | null> {
    return this.orm.user.findUnique({
      where: {
        id,
      },
    });
  }

  async getAll() {
    return this.orm.user.findMany();
  }

  async findByEmail(email: User["email"]): Promise<User | null> {
    return this.orm.user.findUnique({
      where: { email },
    });
  }

  async create(data: Omit<Partial<User>, "id">): Promise<User> {
    const hashPassword = await hash(data.password!, 5);

    const resp = await this.orm.user.create({
      data: {
        password: hashPassword,
        email: data.email!,
        name: data.name!,
        avatar: data.avatar,
        role: data.role,
      },
    });

    return resp;
  }

  async remove(id: User["id"]): Promise<number> {
    const resp = await this.orm.user.delete({
      where: { id },
    });

    return resp.id;
  }
}
