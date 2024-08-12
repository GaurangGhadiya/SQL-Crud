const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");

// Middleware
app.use(cors());
app.use(express.json());

//Routes
// Create Todo
app.post("/addTodo", async (req, res) => {
  try {
    console.log(req.body);
    const { title } = req.body;
    const newTodo = await pool.query(
      "INSERT INTO todotbl(title) VALUES ($1) RETURNING *",
      [title]
    );
    if (newTodo) {
      res.json({ data: newTodo.rows[0], message: "Todo added successfully" });
    } else {
      res.json("Something went wrong");
    }
  } catch (error) {
    res.json(error.message);
    console.log(error.message);
  }
});

// Get all Todo
app.get("/getTodo", async (req, res) => {
  try {
    const response = await pool.query("SELECT * FROM todotbl");
    res.json({ data: response.rows, message: "Todo get successfully" });

    // res.json({ data:res, message:"getTodo" });
  } catch (error) {
    res.json(error.message);
    console.log(error.message);
  }
});

// Get one todo
app.get("/getTodo/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const response = await pool.query(
      "SELECT * FROM todotbl WHERE todo_id = ($1)",
      [id]
    );
    res.json({ data: response.rows, message: "Todo get successfully" });
  } catch (error) {
    res.json(error.message);
  }
});

//Update one todo
app.post("/updateTodo", async (req, res) => {
  try {
    const { id, title } = req.body;
    const response = await pool.query(
      "UPDATE todotbl SET title = ($1) WHERE todo_id = ($2) RETURNING *",
      [title, id]
    );
    res.json({ data: response.rows[0], message: "Todo update successfully" });
  } catch (error) {
    res.json(error.message);
  }
});

// Delete one todo
app.get("/deleteTodo/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const response = await pool.query(
      "DELETE FROM todotbl WHERE todo_id = ($1) RETURNING *",
      [id]
    );
    res.json({ data: response.rows[0], message: "Todo delete successfully" });
  } catch (error) {
    res.json(error.message);
  }
});

app.listen(5000, () => {
  console.log("listening on port 5000");
});
