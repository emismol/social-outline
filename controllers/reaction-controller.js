const { Thought, User } = require("../models");

const reactionController = {
  createReaction({ params, body }, res) {
    // console.log(params.thoughtId);

    Thought.findOne({ _id: params.thoughtId })
      .then((dbThoughtData) => {
        // If no comment is found, send 404
        if (!dbThoughtData) {
          res.status(404).json({ message: "No thought found with this id!" });
          return;
        }

        dbThoughtData.reactions.push(body);
        dbThoughtData.save().then(() => {
          res.json(dbThoughtData.reactions[dbThoughtData.reactions.length - 1]);
        });
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },
  deleteReaction({ params }, res) {
    Thought.findByIdAndUpdate(
      req.params.thoughtId,
      { $pull: { reactions: { reactionId: req.params.reactionId } } },
      { runValidators: true, new: true }
    )
      .then((dbThoughtData) => {
        if (!dbThoughtData) {
          return res.status(404).json({ message: "No thought with this id!" });
        }
        res.json(dbThoughtData);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
};

module.exports = reactionController;
