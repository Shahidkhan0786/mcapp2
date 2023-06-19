import express, { Request, Response } from "express";
const router = express.Router();

router.get("/api/user/cuser", (req: Request, res: Response) => {
  res.send("Current User");
});

export { router as currentUserRouter };
