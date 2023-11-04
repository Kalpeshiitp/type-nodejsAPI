"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
var todos = [];
const router = (0, express_1.Router)();
router.get("/", (req, res, next) => {
  res.status(200).json({ todos: todos });
});
router.post("/todo", (req, res, next) => {
  const newTodo = {
    id: new Date().toISOString(),
    text: req.body.text,
  };
  todos.push(newTodo);
  res.status(201).json({ message: "to do added", todos: todos });
});
router.put("/todo/:todoId", (req, res, next) => {
  const tid = req.params.todoId;
  const todoIndex = todos.findIndex((todoitem) => todoitem.id == tid);
  if (todoIndex >= 0) {
    todos[todoIndex] = { id: todos[todoIndex].id, text: req.body.text };
    res.status(201).json({ message: "todo updated", todos: todos });
  }
  res.status(404).json({ message: "could not find todo for this id" });
});
router.delete("/todo/:todoId", (req, res, next) => {
  todos = todos.filter((todoItem) => todoItem.id !== req.params.todoId);
  res.status(201).json({ message: "todo deleted", todos: todos });
});
exports.default = router;
