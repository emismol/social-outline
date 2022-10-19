const router = require("express").Router();
const {
  createUser,
  getAllUser,
  getUserById,
} = require("../../controllers/user-controller");
router.route("/").get(getAllUser).post(createUser);

module.exports = router;
