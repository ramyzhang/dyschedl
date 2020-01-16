import React from 'react';
import logo from './logo.svg';
import './App.css';
import EventForm from './components/EventForm'
import ArtistBlock from './components/ArtistBlock'

function App() {
  return (
    <div className="App">
      <ArtistBlock />
      <EventForm />
    </div>
  );
}

export default App;
