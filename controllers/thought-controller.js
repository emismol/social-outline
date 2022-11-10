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
  getThoughtById(req, res) {
    //Thought.findOne({ _id: params.id })
    Thought.findOne({ _id: req.params.thoughtId })
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
    console.log("req.body", req.body);
    Thought.create(req.body)
      .then(({ _id }) => {
        return User.findByIdAndUpdate(
          { _id: req.body.userId },
          { $push: { thoughts: _id } },
          { new: true }
        );
      })
      .then((dbUserData) => {
        console.log("dbUserData line 42", dbUserData);
        if (dbUserData) {
          return res.json(dbUserData);
        } else {
          return res.status(404).json({ message: "No Thought created!" });
        }
      })
      // .then((dbThoughtData) => {
      //   console.log("dbThoughtData line 36 ", dbThoughtData);
      //   return User.findByIdAndUpdate(
      //     req.body.userId,
      //     { $push: { thoughts: dbThoughtData._id } },
      //     { new: true }
      //   );
      // })
      // .then((dbUserData) => {
      //   console.log(dbUserData);
      //   if (dbUserData) {
      //     return res.json(dbUserData);
      //   } else {
      //     // if (!dbUserData) {
      //     return res.status(404).json({ message: "No Thought created!" });
      //   }
      //   // res.json({ message: "Thought successfully created!" });
      // })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },

  // updateThought(req, res) {
  //   Thought.findByIdAndUpdate({ _id: req.params.id }, req.body, {
  //     new: true,
  //     runValidators: true,
  //   })

  //     .then((dbUserThought) => {
  //       console.log("thought line 78", dbUserThought);
  //       if (dbUserThought) {
  //         res.json(dbUserThought);
  //       }
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //       res.status(500).json(err);
  //     });
  // },

  updateThought(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $set: req.body },
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
  //   deleteThought(req, res) {
  //     Thought.findByIdAndDelete(req.params.id)
  //       .then((thought) => {
  //         res.json(thought);
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //         res.status(500).json(err);
  //       });
  //   },

  deleteThought({ params }, res) {
    console.log("params line 57 user-controller", params);
    Thought.findOne({ _id: params.thoughtId })
      .then((dbUserData) => {
        console.log("dbUserData line 60 user-controller", dbUserData);
        // If no user is found, send 404
        if (!dbUserData) {
          res.status(404).json({ message: "No user found with this id!" });
          return;
        }
        dbUserData.delete().then(() => {
          res.json(dbUserData);
        });
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },
};

module.exports = thoughtController;
