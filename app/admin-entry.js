import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import Admin from './Admin';

document.addEventListener('DOMContentLoaded', function() {
  ReactDOM.render(<Admin />, document.getElementById('wp-reactivate-admin'));
});