import {
  pgTable,
  serial,
  integer,
  text,
  timestamp,
  pgEnum,
  jsonb,
} from "drizzle-orm/pg-core";
import { users } from "./users";
import { children, childPhotos } from "./children";
import { timestamps } from "./columns.timestamps";

export const artStylesEnum = pgEnum("art_styles", [
  "soft-anime",
  "pixar",
  "watercolor",
  "block-art",
]);

export const storybooks = pgTable("storybooks", {
  id: serial("id").primaryKey(),

  title: text("title").notNull(),
  artStyle: artStylesEnum("art_style").notNull(),
  theme: text("theme").notNull(),
  values: jsonb("values").$type<string[]>().notNull().default([]),

  userId: text("user_id").notNull(),
  //userId: integer("user_id").references(() => users.id),
  childId: integer("child_id").references(() => children.id),

  ...timestamps,
});

export const storybook_pages = pgTable("storybook_pages", {
  id: serial("id").primaryKey(),
  storybookId: integer("storybook_id").references(() => storybooks.id),
  content: text("content").notNull(),

  ...timestamps,
});

export const storybook_page_images = pgTable("storybook_page_images", {
  id: serial("id").primaryKey(),
  storybookPageId: integer("storybook_page_id").references(
    () => storybook_pages.id
  ),
  prompt: text("prompt").notNull(),
  imageUrl: text("image_url").notNull(),

  ...timestamps,
});

export const storybook_child_photos = pgTable("storybook_child_photos", {
  id: serial("id").primaryKey(),
  storybookId: integer("storybook_id").references(() => storybooks.id),
  childPhotoId: integer("child_photo_id").references(() => childPhotos.id),
  ...timestamps,
});
