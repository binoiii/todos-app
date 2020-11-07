const mongoose = require("mongoose");

// const TodoSchema = new mongoose.Schema({
//   todo: {
//     type: "String",
//     trim: true,
//     required: [true, "To do required"],
//   },
//   createdAt: {
//     type: "Date",
//     default: Date.now,
//   },
// });

// module.exports = mongoose.model("Todo", TodoSchema);

const UserTodoSchema = new mongoose.Schema({
  todos: [{
    todo: {
      type: "String",
      trim: true,
    },
    createdAt: {
      type: "Date",
      default: Date.now
    }
  }]
})

module.exports = mongoose.model("UserTodo", UserTodoSchema)