import { applicants, type Applicant, type InsertApplicant } from "@shared/schema";
import { db } from "./db";

export interface IStorage {
  createApplicant(applicant: InsertApplicant): Promise<Applicant>;
  getAllApplicants(): Promise<Applicant[]>;
}

export class DatabaseStorage implements IStorage {
  async createApplicant(insertApplicant: InsertApplicant): Promise<Applicant> {
    const [applicant] = await db
      .insert(applicants)
      .values(insertApplicant)
      .returning();
    return applicant;
  }

  async getAllApplicants(): Promise<Applicant[]> {
    return await db.select().from(applicants);
  }
}

export const storage = new DatabaseStorage();