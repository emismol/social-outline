const { Reaction, Thought, User } = require("../models");

const reactionController = {
  // get all comments
  getReactions(req, res) {
    Reaction.find()
      .sort({ createdAt: -1 })
      .then((dbReactionData) => {
        res.json(dbReactionData);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  // get one comment by id
  getReactionById({ params }, res) {
    Reaction.findOne({ _id: params.id })
      .then((dbReactionData) => {
        // If no comment is found, send 404
        if (!dbReactionData) {
          res.status(404).json({ message: "No reaction found with this id!" });
          return;
        }
        res.json(dbReactionData);
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },
  createReaction(req, res) {
    Reaction.create(req.body)
      .then((dbReactionData) => {
        return User.findOneAndUpdate(
          { _id: req.body.userId },
          { $push: { thoughts: dbReactionData._id } },
          { new: true }
        );
      })
      .then((dbUserData) => {
        if (!dbUserData) {
          return res
            .status(404)
            .json({ message: "reaction created but no user with this id!" });
        }
        res.json({ message: "reaction successfully created!" });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
};

module.exports = reactionController;
