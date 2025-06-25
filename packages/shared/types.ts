import { z } from "zod";

// childName, childAge, artStyle, values, theme, customTheme, photoUrls
const GenerateStoryBook = z.object({
  childName: z.string(),
});
