const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const availabilitySchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  startDateTime: {
    type: String,
    required: true
  },
  endDateTime: {
    type: String,
    required: true
  }
}, {
  timestamps: true,
});

const Availability = mongoose.model('Availability', availabilitySchema);

module.exports = Availability;
