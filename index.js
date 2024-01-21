const express = require("express");
const bodyParser = require("body-parser");
const math = require("mathjs");

const app = express();
const PORT = 5000;

app.use(bodyParser.json());

// storing formula in memory
const userFormulas = {};

// creating formula
app.post("/createFormula", (req, res) => {
  const { formulaName, expression } = req.body;

  if (!formulaName || !expression) {
    return res
      .status(400)
      .json({ error: "Both formulaName and expression are required." });
  }

  userFormulas[formulaName] = expression;
  res.json({ message: `Formula '${formulaName}' created successfully.` });
});

// evaluate a formula
app.post("/evaluateFormula", (req, res) => {
  const { formulaName, data } = req.body;

  if (!formulaName || !data) {
    return res
      .status(400)
      .json({ error: "Both formulaName and data are required." });
  }

  const formula = userFormulas[formulaName];

  if (!formula) {
    return res
      .status(404)
      .json({ error: `Formula '${formulaName}' not found.` });
  }

  try {
    const result = evaluateFormula(formula, data);
    res.json({ result });
  } catch (error) {
    res.status(500).json({ error: "Error evaluating formula." });
  }
});

// Function to evaluate a formula expression
function evaluateFormula(expression, data) {
  try {
    const evaluatedExpression = Object.keys(data).reduce((expr, variable) => {
      const regex = new RegExp(variable, "g");
      return expr.replace(regex, data[variable]);
    }, expression);

    // using mathjs to evaluate the expression
    const result = math.evaluate(evaluatedExpression);
    return result;
  } catch (error) {
    throw error;
  }
}

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
