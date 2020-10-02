const express = require("express");
const router = express.Router();
const {
  getTodos,
  addTodo,
  editTodo,
  deleteTodo,
} = require("../controllers/todos");

const { registerUser } = require("../controllers/auth");

router.route("/todos").get(getTodos).post(addTodo);

router.route("/todos/:id").put(editTodo).delete(deleteTodo);

router.route("/register").post(registerUser);

module.exports = router;
