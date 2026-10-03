require("dotenv").config();
const express = require("express");
const cors = require("cors");
const analyzeRouter = require("./routes/analyze");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json({ limit: "50kb" }));

app.get("/health", (_req, res) => res.json({ status: "ok" }));
app.use("/api/analyze", analyzeRouter);

// 404 handler
app.use((_req, res) => res.status(404).json({ error: "Route not found." }));

// Global error handler
app.use((err, _req, res, _next) => {
  console.error(err);
  res.status(500).json({ error: "Internal server error." });
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
