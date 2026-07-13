const app = require("./app");
const env = require("./config/env");
const connectDB = require("./config/db");

const PORT = env.PORT;

const startServer = async () => {
  await connectDB();

  app.listen(PORT, () => {
    console.log(`🚀 Server is running on http://localhost:${PORT}`);
  });
};

startServer();