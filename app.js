const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 8082;

// Serve static files from the project root (where index.html lives)
app.use(express.static(__dirname));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
