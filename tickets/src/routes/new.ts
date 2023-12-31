import express, { Request, Response } from "express";
const router = express.Router();
import { body } from "express-validator";
import { requireAuth, validateRequest, currentUser } from "@shahidorg/common";
import { Ticket } from "../models/ticket";

router.post(
  "/api/tickets",
  currentUser,
  requireAuth,
  [
    body("title").not().isEmpty().withMessage("Title is required"),
    body("price")
      .isFloat({ gt: 0 })
      .withMessage("Price must be greater than 0"),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { title, price } = req.body;

    const ticket = Ticket.build({
      title,
      price,
      userId: req.currentUser!.id,
    });
    await ticket.save();

    res.status(201).send(ticket);
  }
);

export { router as createTicketRouter };
