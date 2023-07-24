import express, { Request, Response } from "express";
import { body, validationResult } from "express-validator";
import { RequestValidationError } from "@shahidorg/common";
import { DatabaseConnectionError } from "@shahidorg/common";
import { User } from "../models/user";
import { BadRequestError } from "@shahidorg/common";
import jwt from "jsonwebtoken";
import { validateRequest } from "@shahidorg/common";
const router = express.Router();
router.get("/api/signup/test", (req, res) => {
  return res.json("hiii");
});
router.post(
  "/api/users/signup",
  [
    body("email").isEmail().withMessage("Email must be valid"),
    body("password")
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage("Password must be between 4 and 20 characters"),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const existuser = await User.findOne({ email });
    console.log(existuser);
    if (existuser) {
      console.log("Email in useee");
      // return res.send({});
      throw new BadRequestError("Email is already register");
    }
    console.log("Creating a user...");
    const user = await User.build({ email, password });
    await user.save();
    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_KEY!
    );
    req.session = {
      jwt: token,
    };
    // console.log("tokenn", token);
    res.status(201).send(user);
    // new User({ email, password })
  }
);

export { router as signupRouter };
