const mongooes = require("mongoose");
const Schema = mongooes.Schema;

answerSchema = new Schema(
  {
    answer: {
      type: String,
      require: true
    },
    question_id: {
      type: Schema.Types.ObjectId,
      require: true,
      ref: "Question"
    }
  },
  { timestamps: true }
);

module.exports = mongooes.model("Answer", answerSchema);
