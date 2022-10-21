//create model
const { Schema, model } = require("mongoose");

//create schema
const ReactionSchema = new Schema({
  reactionId: {
    type: Schema.Types.ObjectId,
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
    default: new Date().getTime(),
  },
});
const Reaction = model("Reaction", ReactionSchema);
module.exports = Reaction;
