import { body, validationResult } from "express-validator";
import express, { Request, Response } from "express";
import { RequestValidationError } from "../errors/request-validation-error";
import { User } from "../models/user";
import { BadRequestError } from "../errors/bad-request-error";
import { validateRequest } from "../middlewares/validate-request";
import { Password } from "../helper/password";
import jwt from "jsonwebtoken";

const router = express.Router();

router.post(
  "/api/users/signin",
  [
    body("email").isEmail().withMessage("Email must be valid"),
    body("password")
      .trim()
      .notEmpty()
      .isLength({ min: 4, max: 20 })
      .withMessage("Password must be between 4 and 20 characters"),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const existuser = await User.findOne({ email });
    if (!existuser) {
      console.log("user not exists");
      throw new BadRequestError("Please enter a valid email password");
    }
    const passwordmatcres = await Password.compare(
      existuser.password,
      password
    );
    if (!passwordmatcres) {
      console.log("password not matched");
      throw new BadRequestError("Please enter a valid email password");
    }

    const token = jwt.sign(
      { id: existuser.id, email: existuser.email },
      process.env.JWT_KEY!
    );
    req.session = {
      jwt: token,
    };

    res.status(200).send(existuser);
  }
);

export { router as SigninRouter };
