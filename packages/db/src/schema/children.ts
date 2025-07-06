import { pgTable, serial, integer, text, pgEnum } from "drizzle-orm/pg-core";
import { users } from "./users";
import { timestamps } from "./columns.timestamps";

export const genderEnum = pgEnum("gender", ["male", "female", "other"]);

export const children = pgTable("children", {
  id: serial("id").primaryKey(),

  name: text("name").notNull(),
  age: integer("age").notNull(),
  gender: genderEnum("gender"),

  parentId: text("parent_id").notNull(),

  //parent_id: integer("parent_id").references(() => users.id),

  ...timestamps,
});

export const childPhotos = pgTable("child_photos", {
  id: serial("id").primaryKey(),
  child_id: integer("child_id").references(() => children.id),
  photoUrl: text("photo_url").notNull(),

  ...timestamps,
});
