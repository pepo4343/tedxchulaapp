const express = require("express");
const { body } = require("express-validator/check");

const apiController = require("../controllers/api");

const router = express.Router();

//GET /api/questions
router.get("/questions", apiController.getQuestion);

//POST /api/question
router.post(
  "/question",
  [
    body("question")
      .trim()
      .isLength({ min: 1 })
  ],
  apiController.addQuestion
);
router.post("/onequestion", apiController.getOneQuestion);

router.post("/answers", apiController.getAnswer);

router.post("/answer", apiController.addAnswer);

module.exports = router;
