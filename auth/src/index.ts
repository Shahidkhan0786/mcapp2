import mongoose from "mongoose";
import { app } from "./app";
const PORT = 3000;
const start = async () => {
  if (!process.env.JWT_KEY) {
    throw new Error("Jwt_Key Must Be define");
  }
  try {
    await mongoose
      .connect("mongodb://auth-mongo-srv:27017/auth")
      .then(() => {
        console.log("Connected DB Successfully");
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
