const router = require('express').Router();

let Artist = require('../models/artist.model');

router.route('/').get((req, res) => {
  Artist.find()
    .then(artists => res.json(artists))
    .catch(err => res.status(400).json(`Beep beep! There was an error in retrieving artist info: ${err}`))
});

router.route('/add').post((req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const newArtist = new Artist({name, email});

  newArtist.save()
    .then(() => res.json(`New artist ${newArtist.name} added!`))
    .catch(err => res.status(400).json(`Beep beep! Couldn't add artist: ${err}`));
});

module.exports = router;
