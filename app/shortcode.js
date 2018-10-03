/* global window, document */
if (! window._babelPolyfill) {
  require('@babel/polyfill');
}

import React from 'react';
import ReactDOM from 'react-dom';
import Shortcode from './containers/Shortcode.jsx';

document.addEventListener('DOMContentLoaded', function() {
  const shortcode_containers = document.querySelectorAll('.wp-reactivate-shortcode');

  for (let i = 0; i < shortcode_containers.length; ++i) {
    const objectId = shortcode_containers[i].getAttribute('data-object-id');

    ReactDOM.render(<Shortcode wpObject={window[objectId]} />, shortcode_containers[i]);
  }
});
