import React, { Component } from "react";
import eventInfo from "../data/eventInfo.js";
import axios from "axios";

class EventForm extends Component {
  constructor() {
    super()
    this.state = {
      data: eventInfo,
      attendeeID: 0,
      events: []
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  };

  handleChange(event) {
    const {value, name} = event.target
    this.setState(prevState => {
      let newEventInfo = Object.assign({}, prevState.data);
      if (Object.keys(prevState.data).indexOf(name) > -1) {
        newEventInfo[name] = value
      } else if (name === "startEvent") {
        newEventInfo.start.dateTime = value
      } else if (name === "endEvent") {
        newEventInfo.end.dateTime = value
      } else if (name === "attendeeEmail") {
        if (prevState.data.attendees.length === 1) {
          newEventInfo.attendees[0] = {email: value};
          this.setState({
            ...prevState,
            attendeeID: prevState.data.attendees.length - 1
          })
        } else {
          newEventInfo.attendees.push({email: value})
          this.setState({
            ...prevState,
            attendeeID: prevState.data.attendees.length - 1
          })
        }
      }
      return {
        ...prevState,
        data: newEventInfo
      }
    });
  }

  // createEvent() {
  //   let that = this;
  //   let request = gapi.client.calendar.events.insert({
  //     'calendarId': 'primary',
  //     'resource': this.state.data
  //   });
  //   function start() {
  //     request.execute(function(resp) {
  //       console.log(resp);
  //     }).then((response) => {
  //       let events = response.result.items
  //       that.setState({
  //         events
  //       }, ()=>{
  //         console.log(that.state.events);
  //       })
  //     }, function(reason) {
  //       console.log(reason);
  //     });
  //   }
  //   gapi.load('client', start)
  // }
  //   var resource = {
  //   "summary": "Appointment",
  //   "location": "Somewhere",
  //   "start": {
  //     "dateTime": "2011-12-16T10:00:00.000-07:00"
  //   },
  //   "end": {
  //     "dateTime": "2011-12-16T10:25:00.000-07:00"
  //   }
  // };

  handleSubmit(event) {
    console.log(`An event was created: ${JSON.stringify(this.state.data)}`);
    event.preventDefault();

    axios.post('http://localhost:5000/events/create', this.state.data)
      .then(res => console.log(res.data))
    // this.createEvent();
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>
            <input
              type="text"
              placeholder="Event Name"
              name="summary"
              value={this.state.data.summary}
              onChange={this.handleChange}
            />
          </label><br />
          <label>
            <textarea
              placeholder="Description"
              name="description"
              value={this.state.data.description}
              onChange={this.handleChange}
            />
          </label><br />
          <label>
            Event Start:
            <br />
            <input
              type="datetime-local"
              name="startEvent"
              value={this.state.data.start.dateTime}
              onChange={this.handleChange}
            />
          </label><br />
          <label>
            Event End:
            <br />
            <input
              type="datetime-local"
              name="endEvent"
              value={this.state.data.end.dateTime}
              onChange={this.handleChange}
            />
          </label><br />
          <label>
            Singer's email:
            <br />
            <input
              type="text"
              name="attendeeEmail"
              value={this.state.data.attendees[this.state.attendeeID].email}
              onChange={this.handleChange}
            />
          </label><br />
          <input type="submit" value="Submit" />
        </form>
      </div>
    )
  };
};

export default EventForm;
