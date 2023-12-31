import mongoose from "mongoose";
import { app } from "./app";
const PORT = 3000;
const start = async () => {
  if (!process.env.JWT_KEY) {
    throw new Error("Jwt_Key Must Be define");
  }
  if (!process.env.MONGO_URI) {
    throw new Error("mango uri Must Be define");
  }
  try {
    await mongoose
      .connect(process.env.MONGO_URI)
      .then(() => {
        console.log("auth Connected DB Successfully");
      })
      .catch((err) => {
        console.log(err);
        process.exit(1);
      });
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

start();
app.listen(PORT, () => {
  console.log(`auth service up and running on port ${PORT}`);
});
