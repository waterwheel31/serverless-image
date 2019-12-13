import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import { makeAuthRouting } from './routing';



// ReactDOM.render(<App />, document.getElementById('root'));

ReactDOM.render(makeAuthRouting(), document.getElementById('root'));
