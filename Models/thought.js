//create model
const { Schema, model, Types } = require("mongoose");
//create schema
const ReactionSchema = new Schema({
  reactionId: {
    type: Types.ObjectId,
    default: () => new Types.ObjectId(),
  },
  reactionBody: {
    type: String,
    max: 280,
  },
  username: {
    type: String,
  },
  createdAt: {
    type: Number,
    default: () => new Date().getTime(),
  },
});

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
    default: () => new Date().getTime(),
  },
  reactions: [ReactionSchema],
});

const Thought = model("Thought", ThoughtSchema);
module.exports = Thought;
