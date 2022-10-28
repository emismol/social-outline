const { Thought, User } = require("../models");

const thoughtController = {
  // get all comments
  getThoughts(req, res) {
    Thought.find()
      .sort({ createdAt: -1 })
      .then((dbThoughtData) => {
        res.json(dbThoughtData);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  // get one comment by id
  getThoughtById({ params }, res) {
    //Thought.findOne({ _id: params.id })
    Thought.findById(params.id)
      .then((dbThoughtData) => {
        // If no comment is found, send 404
        if (!dbThoughtData) {
          res.status(404).json({ message: "No thought found with this id!" });
          return;
        }
        res.json(dbThoughtData);
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },
  createThought(req, res) {
    Thought.create(req.body)
      .then((dbThoughtData) => {
        return User.findByIdAndUpdate(
          req.body.userId,
          { $push: { thoughts: dbThoughtData._id } },
          { new: true }
        );
      })
      .then((dbUserData) => {
        if (!dbUserData) {
          return res
            .status(404)
            .json({ message: "Thought created but no user with this id!" });
        }
        res.json({ message: "Thought successfully created!" });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  updateThought(req, res) {
    Thought.findByIdAndUpdate(req.params.id, req.body)
      .then((thought) => {
        res.json(thought);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  deleteThought(req, res) {
    Thought.findByIdAndDelete(req.params.id)
      .then((thought) => {
        res.json(thought);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
};

module.exports = thoughtController;
