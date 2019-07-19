const mongooes = require("mongoose");
const Schema = mongooes.Schema;

const questionSchema = new Schema(
  {
    question: {
      type: String,
      require: true
    },
    ansNum: {
      type: Number
    },
    date: {
      type: Date
    }
  },
  { timestamps: true }
);

module.exports = mongooes.model("Question", questionSchema);
