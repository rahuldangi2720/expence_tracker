const mongoose = require('mongoose');


const expenseSchema = new mongoose.Schema({
  amount: {
    type: Number,
    required: true
  },
  category: {
    type: String,
    default:'expence',
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  description: {
    type: String
  },
  userId: {
    type:String,
    required: true
  }
});


const Expense = mongoose.model('Expense', expenseSchema);

module.exports = Expense;
