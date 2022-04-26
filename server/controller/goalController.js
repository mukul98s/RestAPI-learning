const asyncHandler = require("express-async-handler");
const Goal = require("../modal/goalModal");
const User = require("../modal/userModal");

// @des get goals
// @routes GET /api/goals
// access private
const getGoals = asyncHandler(async (req, res) => {
  const goals = await Goal.find({user: req.user});
  res.status(200).json(goals);
});

// @des set goals
// @routes POST /api/goals
// access private
const setGoals = asyncHandler(async (req, res) => {
  if (!req.body.title) {
    res.status(400);
    throw new Error("Without Proper body");
  }

  const goal = await Goal.create({
    title: req.body.title,
    user: req.user.id,
  });
  res.status(200).json(goal);
});

// @des update a goal
// @routes UPDATE /api/goals/:id
// access private
const updateGoal = asyncHandler(async (req, res) => {
  const goal = await Goal.findById(req.params.id);

  if (!goal) {
    res.status(400);
    throw new Error("No goal found");
  }

  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }

  // matching logged in user and current user
  if (goal.user.toString() !== user.id) {
    res.status(401);
    throw new Error("User not auth");
  }

  const newGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  res.status(200).json(newGoal);
});

// @des delete a goal
// @routes DELETE /api/goals/:id
// access private
const deleteGoal = asyncHandler(async (req, res) => {
  const goal = await Goal.findById(req.params.id);

  if (!goal) {
    res.status(400);
    throw new Error("No goal found");
  }

  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }

  // matching logged in user and current user
  if (goal.user.toString() !== user.id) {
    res.status(401);
    throw new Error("User not auth");
  }

  await goal.remove();
  res.status(200).json({id: req.params.id});
});

module.exports = {
  getGoals,
  setGoals,
  updateGoal,
  deleteGoal,
};
