const router = require("express").Router();
const {
  getReactions,
  getSingleReaction,
  createReaction,
  getReactionById,
} = require("../../controllers/reaction-controller");
router.route("/").get(getReaction).post(createReaction);

module.exports = router;
