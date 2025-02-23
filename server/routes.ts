import type { Express } from "express";
import { createServer } from "http";
import { storage } from "./storage";
import { insertApplicantSchema } from "@shared/schema";

export async function registerRoutes(app: Express) {
  app.post("/api/applicants", async (req, res) => {
    try {
      const validatedData = insertApplicantSchema.parse(req.body);
      const applicant = await storage.createApplicant(validatedData);
      res.json(applicant);
    } catch (error) {
      res.status(400).json({ message: "Invalid application data" });
    }
  });

  return createServer(app);
}
