const { validationResult } = require("express-validator");
const TimeAgo = require("javascript-time-ago");
const Question = require("../models/question");
const Answer = require("../models/answer");
const en = require("javascript-time-ago/locale/en");
const io = require("../socket");
exports.getQuestion = (req, res, next) => {
  Question.find()
    .then(results => {
      TimeAgo.addLocale(en);

      // Create relative date/time formatter.
      const timeAgo = new TimeAgo("en-US");
      const finalresults = results.map(item => {
        return { ...item, dated: timeAgo.format(Date.now() - item.date) };
      });

      res.status(201).json({
        message: "success",
        questions: results
      });
    })
    .catch(err => {
      console.log(err);
    });
};

exports.getOneQuestion = (req, res, next) => {
  const questionid = req.body.question_id;
  Question.findById(questionid)
    .then(results => {
      res.status(201).json({
        message: "success",
        questions: results
      });
    })
    .catch(err => {
      console.log(err);
    });
};
exports.getAnswer = (req, res, next) => {
  const questionid = req.body.question_id;
  Answer.find({ question_id: questionid })
    .then(results => {
      res.status(201).json({
        message: "success",
        answer: results
      });
    })
    .catch(err => {
      console.log(err);
    });
};
exports.addAnswer = (req, res, next) => {
  const questionid = req.body.question_id;
  const answercontent = req.body.answer;

  const answer = new Answer({
    answer: answercontent,
    question_id: questionid
  });
  answer
    .save()
    .then(results => {
      io.getIO().emit(results.question_id, { answer: results });
      res.status(201).json({
        message: "success",
        answer: results
      });
    })
    .catch(err => {
      console.log(err);
    });
};

exports.addQuestion = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res
      .status(422)
      .json({ message: "Validation Failed", errors: errors.array() });
  }
  const questioncontent = req.body.question;
  const question = new Question({
    question: questioncontent,
    ansNum: 0,
    date: Date.now()
  });
  question
    .save()
    .then(results => {
      res.status(201).json({
        message: "success",
        question: results
      });
      io.getIO().emit("addquestion", { question: results });
    })
    .catch(err => {});
};
