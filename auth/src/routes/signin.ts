import express, { Request, Response } from "express";

const router = express.Router();

router.post("/api/user/signin", (req: Request, res: Response) => {
  res.send("Signin");
});

export { router as SigninRouter };
