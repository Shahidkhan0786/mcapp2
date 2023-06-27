import express, { Request, Response } from "express";
import { User } from "../models/user";
const router = express.Router();

// router.get("/api/user/cuser", (req: Request, res: Response) => {
//   res.send("Current User");
// });

router.get("user/list", async (req: Request, res: Response) => {
  const list = await User.find();
  res.send({
    success: true,
    data: list,
  });
});

export { router as currentUserRouter };
