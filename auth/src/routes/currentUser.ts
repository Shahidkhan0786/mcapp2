import express, { Request, Response } from "express";
import { User } from "../models/user";
const router = express.Router();
import jwt from "jsonwebtoken";
import { currentUser } from "@shahidorg/common";
import { requireAuth } from "@shahidorg/common";
// router.get("/api/user/cuser", (req: Request, res: Response) => {
//   res.send("Current User");
// });

router.get(
  "/api/users/cuser",
  currentUser,
  requireAuth,
  async (req: Request, res: Response) => {
    res.send({ currentUser: req.currentUser || null });
  }
);

export { router as currentUserRouter };
