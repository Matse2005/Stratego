import { Theme, ThemeSchema } from "@/types";
import defaultTheme from "./default/theme.json";
import disney from "./disney/theme.json";
import pirates from "./pirates/theme.json";
import studio100 from "./studio100/theme.json";

const themes = [
  defaultTheme,
  disney,
  studio100,
  pirates
];

export default Object.fromEntries(
  (themes as unknown[])
    .filter((t): t is Theme => ThemeSchema.safeParse(t).success)
    .map((t) => [t.id, t])
);