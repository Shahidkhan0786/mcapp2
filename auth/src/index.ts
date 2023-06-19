import express, { Request, Response } from "express";
import morgan from "morgan";
const app = express();
const PORT = 3000;
import { currentUserRouter } from "./routes/current-user";
import { signupRouter } from "./routes/signup";
import { SigninRouter } from "./routes/signin";
import { SignoutRouter } from "./routes/signout";
app.use(express.json());
app.use(morgan("dev"));
app.use(signupRouter);
app.use(currentUserRouter);
app.use(SigninRouter);
app.use(SignoutRouter);
// app.post("/test", (req: Request, res: Response) => {
//   console.log(req.body);
//   res.send("auth servicee");
// });
app.listen(PORT, () => {
  console.log(`auth service up and running on port ${PORT}`);
});
