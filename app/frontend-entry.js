import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import Frontend from './Frontend.jsx';

document.addEventListener('DOMContentLoaded', function() {
  ReactDOM.render(<Frontend />, document.getElementById('wp-reactivate-frontend'));
});
