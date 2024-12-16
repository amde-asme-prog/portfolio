const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const sequelize = require("./config/database");
const landingRoutes = require("./routes/landingRoutes");
const aboutRoutes = require("./routes/aboutRoutes");
const skillsRoute = require("./routes/skillsRoute");
const servicesRoute = require("./routes/servicesRoute");
const projectsRoute = require("./routes/projectsRoute");
require("dotenv").config();

const app = express();

// Middleware
var corsOptions = {
  origin: "http://localhost:5173", // Frontend URL
};
app.use(cors(corsOptions));
app.use(bodyParser.json()); // Parse incoming JSON
app.use(express.static("public")); // Serve static files

// Routes
app.use("/api/landing", landingRoutes);
app.use("/api/about", aboutRoutes);
app.use("/api/skills", skillsRoute);
app.use("/api/services", servicesRoute);
app.use("/api/projects", projectsRoute);

// Database Sync (Automatically create tables if they don't exist)
sequelize
  .sync({ alter: true }) // Ensure tables are in sync with the model (alter mode for existing tables)
  .then(() => {
    console.log("Database synced!");
  })
  .catch((err) => {
    console.error("Database sync error:", err);
    process.exit(1); // Exit the app if the database sync fails
  });

// Function to show available routes (for debugging purposes)
function availableRoutes() {
  return app._router.stack
    .filter((r) => r.route)
    .map((r) => {
      return {
        method: Object.keys(r.route.methods)[0].toUpperCase(),
        path: r.route.path,
      };
    });
}

console.log("Available Routes:", JSON.stringify(availableRoutes(), null, 2));

// Start Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
