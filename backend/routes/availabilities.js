const router = require('express').Router();

let Availability = require('../models/availability.model');

router.route('/').get((req, res) => {
  Availability.find()
    .then(availabilities => res.json(availabilities))
    .catch(err => res.status(400).json(`Beep beep! There was an error in retrieving artist availabilities: ${err}`))
});

router.route('/add').post((req, res) => {
  const name = req.body.name;
  const startDateTime = req.body.startDateTime;
  const endDateTime = req.body.endDateTime;
  const newAvailability = new Availability({
    name,
    startDateTime,
    endDateTime
  });

  newAvailability.save()
    .then(() => res.json(`New availability from ${newAvailability.name} added! From ${newAvailability.startDateTime} to ${newAvailability.endDateTime}.`))
    .catch(err => res.status(400).json(`Beep beep! Couldn't add availability: ${err}`));
});

module.exports = router;
