const mongoose = require('mongoose');

const inventorySchema = new mongoose.Schema({
  productName: String,
  category: String,
  damaged: Boolean,
  perishable: Boolean,
  expiryDate: Date,
  quantity: Number,
  status: { type: String, default: 'Not Picked' },
  pickedby: { type: String, default: '' } 
});

const Inventory = mongoose.model('Inventory', inventorySchema);

module.exports = Inventory;
