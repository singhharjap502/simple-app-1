import React, { Component } from 'react';
import Chat from "./Chatbox.jsx";
import Text from './storysearch.jsx'
import Images from './imagesearch.jsx'

class App extends Component {
  render() {
    return (
      <div>
          <Chat/>
          <br/>
          <br/>
          <Text/>
          <Images/>
      </div>
    );
  }
}

export default App;