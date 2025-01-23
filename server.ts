import dotenv from "dotenv";
import mongoose from "mongoose";
import app from "./src/app";

dotenv.config();

const PORT: string | number = process.env.PORT || 3000;
export const MONGO_URL: string = process.env.MONGO_URL || "";

if (!MONGO_URL) {
  console.error("MONGO_URL is not defined in the environment variables.");
  process.exit(1);
}

mongoose
  .connect(`${MONGO_URL}/commentsAPI`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Could not connect to MongoDB", err));

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

export default app;
