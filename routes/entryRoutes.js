const express = require("express");
const Entry = require("../models/Entry");

const router = express.Router();

// Add entry
router.post("/addEntry", async (req, res) => {
  try {
    const newEntry = new Entry(req.body);
    await newEntry.save();
    res.status(201).send("Entry added");
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Delete entry
router.delete("/deleteEntry/:id", async (req, res) => {
  try {
    await Entry.findByIdAndDelete(req.params.id);
    res.send("Entry deleted");
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Get balance
router.get("/getBalance", async (req, res) => {
  try {
    const entries = await Entry.find();
    const totalIncome = entries
      .filter((e) => e.type === "Income")
      .reduce((sum, e) => sum + e.amount, 0);
    const totalExpense = entries
      .filter((e) => e.type === "Expense")
      .reduce((sum, e) => sum + e.amount, 0);
    res.json({ balance: totalIncome - totalExpense, entries });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

module.exports = router;
