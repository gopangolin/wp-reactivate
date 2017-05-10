if (! window._babelPolyfill) {
  require('babel-polyfill');
}

import React from 'react';
import ReactDOM from 'react-dom';
import Shortcode from './containers/Shortcode.jsx';

document.addEventListener('DOMContentLoaded', function() {
  ReactDOM.render(<Shortcode />, document.getElementById('wp-reactivate-shortcode'));
});
