//create model
const { Schema, model } = require("mongoose");

//create schema
const UserSchema = new Schema({
  username: {
    type: String,
  },
  email: {
    type: String,
  },
  thoughts: [
    {
      type: Schema.Types.ObjectId,
      ref: "Thought",
    },
  ],
  friends: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
});
const User = model("User", UserSchema);
module.exports = User;
