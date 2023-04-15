import { z } from "zod";

const memberId = z.number().int();
const boardId = z.number().int();

const role = z.enum(["Writer", "Read"]);

export const AddMembersBoardValidate = z.object({
  body: z.object({
    members: z
      .object({
        memberId,
        boardId,
      })
      .array(),
  }),
});

export const UpdateMemberValidate = z.object({
  body: z.object({
    role,
  }),
});

export const RemoveMembersValidate = z.object({
  body: z.object({
    userIds: z.array(z.number()),
  }),
});
