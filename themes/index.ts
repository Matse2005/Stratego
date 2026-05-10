import { Theme, ThemeSchema } from "@/types";
import defaultTheme from "./default/theme.json";

const themes = [defaultTheme];

export default Object.fromEntries(
  (themes as unknown[])
    .filter((t): t is Theme => ThemeSchema.safeParse(t).success)
    .map((t) => [t.id, t])
);