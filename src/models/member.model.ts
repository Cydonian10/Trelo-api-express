import { z } from "zod";

const memberId = z.number().int();
const boardId = z.number().int();

export const AddMemberBoardValidate = z.object({
  body: z
    .object({
      memberId,
      boardId,
    })
    .array(),
});
