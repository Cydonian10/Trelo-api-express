import { z } from "zod";

const title = z.string().min(2);
const position = z.number();
const boardId = z.number().int();

export const CreateListValidate = z.object({
  body: z.object({
    title,
    position,
    boardId,
  }),
});

export const UpdateListValidate = z.object({
  body: z.object({
    title,
    position,
    //boardId,
  }),
});
