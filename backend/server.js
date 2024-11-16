const express = require("express");
const path = require("path");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const contactRoutes = require("./routes/contacts");
const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

// MongoDB connection
const mongoURI =
  process.env.MONGO_URI ||
  "mongodb+srv://nikunjdwivedi:nikunj12345@nikunjdwivedi.y8new.mongodb.net/?retryWrites=true&w=majority&appName=NikunjDwivedi";
mongoose
  .connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("MongoDB connection error:", err));

// Use the contacts route (API endpoint)
app.use("/contacts", contactRoutes); // This makes sure /contacts is handled by contactRoute

// Serve React static files
app.use(express.static(path.join(__dirname, "../frontend/build")));

// Catch-all route for React app
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/build", "index.html"));
});

// Start the server
app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
