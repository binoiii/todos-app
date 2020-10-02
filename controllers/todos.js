const Todo = require("../models/Todos");
const mongoose = require("mongoose");
mongoose.set("useFindAndModify", false);
// @desc    GET ALL TODOS
// @route   GET | /api/v1/todos
// @access  PUBLIC

exports.getTodos = async (req, res) => {
  try {
    const todos = await Todo.find();
    res.status(200).json({
      success: true,
      count: todos.length,
      data: todos,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: "Server Error",
    });
  }
};

// @desc    ADD TODO
// @route   POST | /api/v1/todos
// @access  PUBLIC

exports.addTodo = async (req, res) => {
  try {
    const newTodo = await Todo.create(req.body);
    res.status(201).send({
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
// @ route  PUT | /api/v1/todos/:id
// @ access PUBLIC

exports.editTodo = async (req, res) => {
  console.log(req.body);
  try {
    const todo = await Todo.findOneAndUpdate({ _id: req.params.id }, req.body);
    if (!todo) {
      res.status(404).json({
        success: false,
        error: "To do not found",
      });
    } else {
      res.status(200).json({
        success: true,
        message: `To do "${todo.todo}" was updated.`,
      });
    }
  } catch (err) {
    res.status(500).json({
      success: false,
      error: "Server error",
    });
  }
};

// @desc    DELETE TODO
// @route   DELETE | /api/v1/todos/:id
// @access  PUBLIC

exports.deleteTodo = async (req, res) => {
  try {
    const deletedTodo = await Todo.findByIdAndDelete({ _id: req.params.id });

    if (!deletedTodo) {
      res.status(404).json({
        success: false,
        error: "To do not found",
      });
    } else {
      res.status(200).json({
        success: true,
        message: "Todo deleted.",
        data: deletedTodo,
      });
    }
  } catch (err) {
    res.status(500).json({
      success: false,
      error: "Server Error",
    });
  }
};
