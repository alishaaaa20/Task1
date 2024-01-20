const express = require("express");
const bodyParser = require("body-parser");
const { evaluate } = require("mathjs");

const app = express();
const PORT = 5000;

app.use(bodyParser.json());

// Endpoint for evaluating user-provided formulas
app.post("/evaluate", (req, res) => {
  const { formula, data } = req.body;

  try {
    // Evaluate the user-provided formula using mathjs
    const result = evaluate(formula, data);

    res.json({ result });
  } catch (error) {
    res.status(400).json({ error: "Invalid formula or data provided." });
  }
});

// Sample formula endpoint (e.g., Excel-like formula)
app.post("/sample-formula", (req, res) => {
  const data = req.body;

  // Sample formula: (a + b) * c
  const sampleFormula = "(data.a + data.b) * data.c";

  try {
    // Evaluate the sample formula using mathjs
    const result = evaluate(sampleFormula, data);

    res.json({ result });
  } catch (error) {
    res.status(400).json({ error: "Invalid data" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
