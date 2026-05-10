import { z } from "zod";

export const CardSchema = z.object({
  id: z.number(),
  name: z.string(),
  image: z.string(),
  wins: z.array(z.number()),
  loses: z.array(z.number()),
  canTap: z.boolean(),
  number: z.number(),
  numberVisible: z.boolean(),
});

export const ThemeSchema = z.object({
  id: z.string(),
  name: z.string(),
  cards: z.array(CardSchema),
});

export type Card = z.infer<typeof CardSchema>;
export type Theme = z.infer<typeof ThemeSchema>;
