if (! window._babelPolyfill) {
  require('babel-polyfill');
}

import React from 'react';
import ReactDOM from 'react-dom';
import Widget from './containers/Widget.jsx';

document.addEventListener('DOMContentLoaded', function() {
  ReactDOM.render(<Widget />, document.getElementById('wp-reactivate-widget'));
});
