import { notFound } from "@hapi/boom";
import { Board, PrismaClient, User, UserBoard } from "@prisma/client";

function exclude<User, key extends keyof User>(
  user: User,
  keys: key[]
): Omit<User, key> {
  for (let key of keys) {
    delete user[key];
  }
  return user;
}

export class ProfileService {
  constructor(private orm: PrismaClient) {}

  async profile(id: User["id"]) {
    const user = await this.orm.user.findUnique({ where: { id } });

    if (!user) throw notFound("Error");

    return exclude(user, ["password"]);
  }

  async meBoards(id: User["id"]) {
    const boards = await this.orm.board.findMany({
      where: { userId: id },
      include: {
        members: {
          include: {
            member: true,
          },
        },
      },
    });

    return boards.map((board) => {
      return {
        ...board,
        members: board.members.map((m) => {
          return {
            name: m.member.name,
            email: m.member.email,
            id: m.member.id,
            role: m.role,
          };
        }),
      };
    });
  }

  async membersBoard(id: User["id"]) {
    return this.orm.board.findMany({
      where: {
        members: {
          some: { memberId: id },
        },
      },
      include: {
        user: {
          select: { name: true, email: true },
        },
      },
    });
  }
}
