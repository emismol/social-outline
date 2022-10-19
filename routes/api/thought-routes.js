const router = require("express").Router();
const {
  getThoughts,
  getSingleThoughts,
  createThought,
  getThoughtById,
} = require("../../controllers/thought-controller");
router.route("/").get(getThoughts).post(createThought);

module.exports = router;
