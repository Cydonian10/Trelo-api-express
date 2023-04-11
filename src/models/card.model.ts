
import { z } from "zod";

const title = z.string().min(2);
const position = z.number()
const listId = z.number().int()
const description = z.string().min(2)

export const CreateCardValidate = z.object({
    body: z.object({
      title,
      position,
      listId,
      description
    })
  })
