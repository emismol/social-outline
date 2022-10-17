//create model
const { Schema, model } = require("mongoose");

//create schema
const ThoughtSchema = new Schema({
  username: {
    type: String,
  },
  thoughtText: {
    type: String,
    min: 1,
    max: 280,
  },
  createdAt: {
    type: Number,
    default: new Date().getTime(),
  },
  reactions: {
    type: Schema.Types.ObjectId,
    ref: "Reactions",
  },
});
const Thought = model("Thought", ThoughtSchema);
module.exports = Thought;
