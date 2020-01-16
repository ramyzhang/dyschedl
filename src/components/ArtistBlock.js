import React from 'react';
import axios from "axios";

let artistInfo = "";

class ArtistBlock extends React.Component {

  constructor() {
    super();
    this.showArtists = this.showArtists.bind(this);
  }

  componentDidMount() {
    axios.get('http://localhost:5000/artists/')
      .then(res => {
        console.log(`Your data has been received! Here it is: ${JSON.stringify(res)}`)
        this.showArtists(res);
      });
  }

  showArtists(d) {
    artistInfo = d.data[0].name;
  }

  render() {
    return (
      <div>
        <p>{artistInfo}</p>
      </div>
    );
  }
}

export default ArtistBlock;
