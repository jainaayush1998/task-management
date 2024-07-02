const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json());

// In-memory storage for todos
let todos = [];

// Routes
// Get all todos
app.get('/todos', (req, res) => {
  res.json(todos);
});

// Create a new todo
app.post('/todos', (req, res) => {
  const { title } = req.body;
  const newTodo = { id: todos.length + 1, title };
  todos.push(newTodo);
  res.status(201).json(newTodo);
});

// Update a todo
app.put('/todos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const { title } = req.body;
  let updatedTodo = todos.find(todo => todo.id === id);
  if (updatedTodo) {
    updatedTodo.title = title;
    res.json(updatedTodo);
  } else {
    res.status(404).send('Todo not found');
  }
});

// Delete a todo
app.delete('/todos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  todos = todos.filter(todo => todo.id !== id);
  res.sendStatus(204);
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
