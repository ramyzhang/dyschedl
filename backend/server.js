const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { userNewUrlParser: true, useCreateIndex: true });

const connection = mongoose.connection;
connection.once('open', () => {
  console.log("You've connected to the MongoDB database!")
})

const artistsRouter = require('./routes/artists');
const availabilityRouter = require('./routes/availabilities');
const eventsRouter = require('./routes/events')

app.use('/artists', artistsRouter);
app.use('/events', eventsRouter);
app.use('/availabilities', availabilityRouter);

app.listen(port, () => {
  console.log(`Yo! Server is running on port ${port}.`);
});
