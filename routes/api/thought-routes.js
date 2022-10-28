const router = require("express").Router();
const reactionRoutes = require("./reaction-routes");
const {
  getThoughts,
  createThought,
  getThoughtById,
  updateThought,
  deleteThought,
} = require("../../controllers/thought-controller");
router.route("/").get(getThoughts).post(createThought);
router
  .route("/:id")
  .get(getThoughtById)
  .put(updateThought)
  .delete(deleteThought);
router.use("/", reactionRoutes);

module.exports = router;
