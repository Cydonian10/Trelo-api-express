import { z } from "zod";

const title = z.string().min(2);
const backgroundColor = z.enum([
  "Sky",
  "Yellow",
  "Green",
  "Red",
  "Violet",
  "Gray",
]);

export const CreateBoardValidate = z.object({
  body: z.object({
    title,
    backgroundColor
  })
})