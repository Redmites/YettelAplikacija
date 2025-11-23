const express = require("express");
const sequelize = require("./config/database");

const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const taskRoutes = require("./routes/taskRoutes");

const app = express();
app.use(express.json());

app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/tasks", taskRoutes);

sequelize.sync({ alter: false }).then(() => {
  console.log("Database connected");

  const PORT = 3000;
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
