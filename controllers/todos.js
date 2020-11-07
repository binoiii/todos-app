const UserTodo = require("../models/UserTodo");
const mongoose = require("mongoose");
const { findById } = require("../models/UserTodo");
mongoose.set("useFindAndModify", false);

// @desc    GET ALL TODOS
// @route   GET | /api/todos
// @access  PUBLIC

exports.getTodos = async (req, res) => {
  const _id = req.query._id;
  const userTodos = await UserTodo.findById({ _id });

  const todos = userTodos ? userTodos.todos : [];
  try {
    res.status(200).json({
      success: true,
      count: todos.length,
      data: todos,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// @desc    ADD TODO
// @route   POST | /api/todos
// @access  PRIVATE

exports.addTodo = async (req, res) => {
  try {
    const { todo } = req.body;
    const { _id } = req.params;

    const user = await UserTodo.findById({ _id });

    user.todos.push({ todo });

    const { todos } = await user.save();
    const newTodo = todos[todos.length - 1];

    res.status(201).json({
      success: true,
      data: newTodo,
    });
  } catch (err) {
    if (err.name === "ValidationError") {
      const errMessage = Object.values(err.errors).map((val) => val.message);
      res.status(400).json({
        success: false,
        error: errMessage,
      });
    } else {
      res.status(500).json({
        success: false,
        error: "Server Error",
      });
    }
  }
};

// @ desc   EDIT TODO
// @ route  PUT | /api/todos/:id
// @ access PRIVATE

exports.editTodo = async (req, res) => {
  try {
    const { _id } = req.params;
    const { id, todo } = req.body;

    const userTodo = await UserTodo.findOneAndUpdate(
      {
        _id,
        "todos._id": id,
      },
      { $set: { "todos.$.todo": todo } },
      { projection: { todos: { $elemMatch: { _id: id } } } }
    );

    const updatedTodo = userTodo.todos[0];

    if (!updatedTodo) {
      res.status(404).json({
        success: false,
        error: "Todo not found",
      });
    } else {
      res.status(200).json({
        success: true,
        data: updatedTodo,
      });
    }
  } catch (err) {
    res.status(500).json({
      success: false,
      error: "Server error",
    });
  }
};

// @desc    COMPLETE TODO
// @route   /api/todos/:id
// @access  PRIVATE

exports.completeTodo = async (req, res) => {
  // try {
  const { _id } = req.params;
  const { id } = req.headers;

  // const user = await UserTodo.findOneAndUpdate(
  //   { _id },
  //   { $pull: { todos: { _id: id } } }
  // );

  const userTodo = await UserTodo.findOneAndUpdate(
    {
      _id,
      "todos._id": id,
    },
    { $pull: { todos: { _id: id } } },
    { projection: { todos: { $elemMatch: { _id: id } } } }
  );

  const deletedTodo = userTodo.todos[0];
  try {
    if (!deletedTodo) {
      res.status(404).json({
        success: false,
        error: "Todo not found",
      });
    } else {
      res.status(200).json({
        success: true,
        data: deletedTodo,
      });
    }
  } catch (err) {
    res.status(500).json({
      success: false,
      error: "Server error",
    });
  }
};
