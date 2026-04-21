// Backend entry point: sets up the API, connects MongoDB, and starts the server.
import "dotenv/config";
import express from "express";
import cors from "cors";
import connectDB from "./shared/db.js";
import { seedDatabase } from "./data/seed.js";
import authRoutes from "./features/auth/auth.routes.js";
import agentRoutes from "./features/agent/agent.routes.js";
import messageRoutes from "./features/message/message.routes.js";
import orchestratorRoutes from "./features/orchestrator/orchestrator.routes.js";
import combatRoutes from "./features/combat/combat.routes.js";
import featuresRoutes from "./features/panels/panels.routes.js";

// Express app configuration + environment defaults.
const app = express();
const port = process.env.PORT || 3000;
const allowedOrigins = Array.from(
  new Set(
    [
      "http://localhost:5173",
      "http://localhost:5174",
      ...(process.env.FRONTEND_ORIGIN || "")
        .split(",")
        .map((value) => value.trim())
        .filter(Boolean),
    ]
  )
);

// CORS + JSON body parsing for API requests.
app.use(
  cors({
    origin(origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      return callback(new Error(`CORS blocked for origin: ${origin}`));
    },
    credentials: true,
  })
);
app.use(express.json());

// Basic health endpoints for quick checks.
app.get("/", (_req, res) => {
  res.send("CT_HACK_Vr backend is running.");
});

app.get("/api/health", (_req, res) => {
  res.json({ ok: true, app: "CT_HACK_Vr backend", timestamp: new Date().toISOString() });
});

// Debug endpoint to check if agents are seeded
app.get("/api/debug/agents-count", async (_req, res) => {
  try {
    const count = await Agent.countDocuments();
    const agents = await Agent.find().select("id name role").lean();
    res.json({ 
      totalAgents: count, 
      agents: agents.map(a => ({ id: a.id, name: a.name, role: a.role }))
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// API route groups.
app.use("/api/auth", authRoutes);
app.use("/api/agents", agentRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/orchestrator", orchestratorRoutes);
app.use("/api/combat", combatRoutes);
app.use("/api/features", featuresRoutes);

// Connect DB, seed default data, then start listening.
connectDB()
  .then(seedDatabase)
  .then(() => {
    app.listen(port, () => {
      console.log(`CT_HACK_Vr server listening on port ${port}`);
    });
  })
  .catch((error) => {
    console.error("Startup failed:", error.message);
    process.exit(1);
  });
