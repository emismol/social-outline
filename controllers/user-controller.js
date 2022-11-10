const { User } = require("../models");

const userController = {
  // get all users
  getAllUser(req, res) {
    User.find()
      .then((dbUserData) => res.json(dbUserData))
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },

  // get one user by id
  getUserById({ params }, res) {
    User.findOne({ _id: params.id })
      .then((dbUserData) => {
        // If no user is found, send 404
        if (!dbUserData) {
          res.status(404).json({ message: "No user found with this id!" });
          return;
        }
        res.json(dbUserData);
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },
  createUser(req, res) {
    console.log(req.body);
    User.create(req.body).then((userData) => res.json(userData));
  },
  updateUser({ params, body }, res) {
    User.findByIdAndUpdate(params.id, body)
      .then(() => {
        User.findOne({ _id: params.id })
          .then((dbUserData) => {
            // If no user is found, send 404
            if (!dbUserData) {
              res.status(404).json({ message: "No user found with this id!" });
              return;
            }
            res.json(dbUserData);
          })
          .catch((err) => {
            console.log(err);
            res.status(400).json(err);
          });
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },
  deleteUser({ params }, res) {
    console.log("params line 57 user-controller", params);
    User.findOne({ _id: params.id })
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

module.exports = userController;
