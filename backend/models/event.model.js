const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const eventSchema = new Schema({
  summary: {
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

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;
