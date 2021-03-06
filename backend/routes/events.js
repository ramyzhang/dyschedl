const router = require('express').Router();
const fs = require('fs');
const readline = require('readline');
const {google} = require('googleapis');

router.route('/create').post((req, res) => {
  // If modifying these scopes, delete token.json.
  const SCOPES = ['https://www.googleapis.com/auth/calendar.events'];
  // The file token.json stores the user's access and refresh tokens, and is
  // created automatically when the authorization flow completes for the first
  // time.
  const TOKEN_PATH = 'token.json';

  /**
   * Create an OAuth2 client with the given credentials, and then execute the
   * given callback function.
   * @param {Object} credentials The authorization client credentials.
   * @param {function} callback The callback to call with the authorized client.
   */
  function authorize(credentials, callback) {
    console.log("authorization in process...");
    const {client_secret, client_id, redirect_uris} = credentials.installed;
    const oAuth2Client = new google.auth.OAuth2(
        client_id,
        client_secret,
        redirect_uris[0]
    );

    // Check if we have previously stored a token.
    fs.readFile(TOKEN_PATH, (err, token) => {
      if (err) return getAccessToken(oAuth2Client, callback);
      oAuth2Client.setCredentials(JSON.parse(token));
      callback(oAuth2Client);
    });
  }

  /**
   * Get and store new token after prompting for user authorization, and then
   * execute the given callback with the authorized OAuth2 client.
   * @param {google.auth.OAuth2} oAuth2Client The OAuth2 client to get token for.
   * @param {getEventsCallback} callback The callback for the authorized client.
   */
  function getAccessToken(oAuth2Client, callback) {
    console.log("access token is being retrieved...")
    const authUrl = oAuth2Client.generateAuthUrl({
      access_type: 'offline',
      scope: SCOPES,
    });
    console.log('Authorize this app by visiting this url:', authUrl);
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
    rl.question('Enter the code from that page here: ', (code) => {
      rl.close();
      oAuth2Client.getToken(code, (err, token) => {
        if (err) return console.error('Error retrieving access token', err);
        oAuth2Client.setCredentials(token);
        // Store the token to disk for later program executions
        fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
          if (err) return console.error(err);
          console.log('Token stored to', TOKEN_PATH);
        });
        callback(oAuth2Client);
      });
    });
  }

  // Load client secrets from a local file.
  fs.readFile('./credentials.json', (err, content) => {
    console.log("client secrets are being loaded...")
    if (err) return console.log('Error loading client secret file:', err);
    // Authorize a client with credentials, then call the Google Calendar API.
    authorize(JSON.parse(content), createEvent);
  });

  function createEvent(auth) {
      console.log("event is being created...")
      console.log("here's your event data:")
      req.body.start.dateTime += ":00-05:00";
      req.body.end.dateTime += ":00-05:00";
      console.log(req.body)
      const calendar = google.calendar({version: 'v3', auth});
      calendar.events.insert({
          auth: auth,
          calendarId: 'primary',
          resource: req.body
      }, function(err, event) {
          if (err) {
            console.log('There was an error contacting the Calendar service: ' + err);
            return;
          }
          console.log('Event created: %s', event.data.htmlLink);
      });
  }

  // const name = req.body.eventInfo.name;
  // const startDateTime = req.body.eventInfo.start.dateTime;
  // const endDateTime = req.body.eventInfo.end.dateTime;
  //
  // const newEvent = new Event({name, startDateTime, endDateTime});
  //
  // newEvent.save()
  //   .then(() => res.json(`New event ${newEvent.name} created!`))
  //   .catch(err => res.status(400).json(`Beep beep! Couldn't create event: ${err}`));
})

module.exports = router;
