const mongoose = require("mongoose");

const entrySchema = new mongoose.Schema({
  amount: Number,
  description: String,
  date: Date,
  type: { type: String, enum: ["Expense", "Income"] },
});

module.exports = mongoose.model("Entry", entrySchema);
