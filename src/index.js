import CanvasState from '../Game/CanvasState'
import Card from '../Game/Card'
import Deck from '../Game/Deck'
import io from 'socket.io-client'

import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.jsx'

function init() {
  let socket = io();

  ReactDOM.render(
    <App socket={socket}/>,
    document.getElementById('ReactTest')
  );

}

init();