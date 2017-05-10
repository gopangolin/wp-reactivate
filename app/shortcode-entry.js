import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import Shortcode from './Shortcode.jsx';

document.addEventListener('DOMContentLoaded', function() {
  ReactDOM.render(<Shortcode />, document.getElementById('wp-reactivate-frontend'));
});
