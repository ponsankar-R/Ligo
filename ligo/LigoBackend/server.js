const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const ollamaRoutes = require("./src/routes/ollama");
const connetDb = require('./src/config/dataBase');


dotenv.config();

const PORT = process.env.PORT ;


connetDb();
const app = express();

app.use(express.json());
app.use(cors());

// Route for Ollama prompts
app.use("/api/ollama", ollamaRoutes);

app.listen(PORT, () => {
  console.log("Server is listening on port " + PORT);
});
