import express, { Request, Response } from "express";
import { User } from "../models/user";
const router = express.Router();
import jwt from "jsonwebtoken";
import { currentUser } from "../middlewares/current-user";
import { requireAuth } from "../middlewares/require-auth";
// router.get("/api/user/cuser", (req: Request, res: Response) => {
//   res.send("Current User");
// });

router.get(
  "/api/users/cuser",
  currentUser,
  // requireAuth,
  async (req: Request, res: Response) => {
    // res.send({ currentUser: req.currentUser || null });
    res.send("okk");
  }
);

export { router as currentUserRouter };
