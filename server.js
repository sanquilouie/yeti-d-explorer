const express = require("express");
const app = express();
const PORT = 3000;

// Serve static files (HTML, CSS, JS, assets)
app.use(express.static("docs"));

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
