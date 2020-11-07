const express = require("express");
const router = express.Router();
const { authJWT } = require("../middleware/auth");

const {
  getTodos,
  addTodo,
  editTodo,
  completeTodo,
} = require("../controllers/todos");

router.route("/").get(getTodos);

router
  .route("/:_id")
  .all(authJWT)
  .post(addTodo)
  .put(editTodo)
  .delete(completeTodo);

module.exports = router;
