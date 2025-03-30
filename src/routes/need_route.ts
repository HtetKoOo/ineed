import express from "express";
import {
  createNeed,
  findNeeds,
  findNeed,
  updateNeed,
  removeNeed,
} from "../controllers/NeedController";
import { body } from "express-validator";
import isAuth from "../middlewares/is-auth";

const router = express.Router();

router
  .route("/")
  .get(isAuth, findNeeds)
  .post(
    isAuth,
    [
      body("header").notEmpty().withMessage("Header must not be empty!"),
      body("body").notEmpty().withMessage("Body must not be empty!"),
      body("tags").isArray().withMessage("Tags must be array!"),
    ],
    createNeed
  );

router
  .route("/:id")
  .get(isAuth, findNeed)
  .put(
    isAuth,
    [
      body("header").notEmpty().withMessage("Header must not be empty!"),
      body("body").notEmpty().withMessage("Body must not be empty!"),
      body("tags").isArray().withMessage("Tags must be array!"),
      body("status").isBoolean(),
    ],
    updateNeed
  )
  .delete(isAuth,removeNeed);

export default router;
