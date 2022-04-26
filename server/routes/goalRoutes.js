const express = require("express");
const router = express.Router();

const {protect} = require("../middleware/authMildderware");

const {
  getGoals,
  setGoals,
  updateGoal,
  deleteGoal,
} = require("../controller/goalController");

// this route will chain different methods on the same route
router.route("/").get(protect, getGoals).post(protect, setGoals);
router.route("/:id").put(protect, updateGoal).delete(protect, deleteGoal);

module.exports = router;
