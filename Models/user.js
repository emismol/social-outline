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
  thoughts: {},
  friends: {},
});
module.exports = mongoose.model("User", UserSchema);
