const express = require("express");
const bodyParser = require("body-parser");
const { evaluate } = require("mathjs");

const app = express();
const PORT = 5000;

app.use(bodyParser.json());

// endpoint for evaluating user-provided formulas
app.post("/evaluate", (req, res) => {
  const { formula, data } = req.body;

  try {
    // evaluating the user-provided formula using mathjs
    const result = evaluate(formula, data);

    res.json({ result });
  } catch (error) {
    res.status(400).json({ error: "Invalid formula or data provided." });
  }
});

// sample formula endpoint
app.post("/sample-formula", (req, res) => {
  const data = req.body;

  // creating a sample formula: (a + b) * c
  const sampleFormula = "(data.a + data.b) * data.c";

  try {
    // evaluating sample formula using mathjs
    const result = evaluate(sampleFormula, data);

    res.json({ result });
  } catch (error) {
    res.status(400).json({ error: "Invalid data" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
