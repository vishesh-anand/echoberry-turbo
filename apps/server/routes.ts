import type { Express, Request, Response, NextFunction } from "express";
import express from "express";
import { createServer, type Server } from "http";
import path from "path";
import fs from "fs";

export async function registerRoutes(app: Express): Promise<Server> {
  // Generate story
  app.post("/api/stories/generate", async (req, res) => {});

  const httpServer = createServer(app);
  return httpServer;
}
