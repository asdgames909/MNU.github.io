import { pgTable, text, serial } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const applicants = pgTable("applicants", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  phone: text("phone").notNull(),
  email: text("email").notNull(),
  level: text("level").notNull(),
  universityId: text("university_id").notNull(),
});

export const insertApplicantSchema = createInsertSchema(applicants)
  .omit({ id: true })
  .extend({
    phone: z.string().min(10, "Phone number must be at least 10 digits"),
    email: z.string().email("Invalid email address"),
    level: z.enum(["1", "2", "3"], {
      required_error: "Please select a level",
    }),
    universityId: z.string().min(3, "University ID is required"),
  });

export type InsertApplicant = z.infer<typeof insertApplicantSchema>;
export type Applicant = typeof applicants.$inferSelect;