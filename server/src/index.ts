import dotenv from "dotenv";
import { prisma } from "./db/db";
import app from "./app";

dotenv.config();

const PORT = process.env.PORT || 5000;
app.listen(PORT, async () => {
  console.log(`Server running on port ${PORT}`);

  try {
    await prisma.$connect();
    console.log("Connected to PostgreSQL with Prisma");
  } catch (error) {
    console.error("Database connection error:", error);
    process.exit(1);
  }
});
