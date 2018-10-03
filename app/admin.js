/* global window, document */
if (! window._babelPolyfill) {
  require('@babel/polyfill');
}

import React from 'react';
import ReactDOM from 'react-dom';
import Admin from './containers/Admin.jsx';

document.addEventListener('DOMContentLoaded', function() {
  ReactDOM.render(<Admin wpObject={window.wpr_object} />, document.getElementById('wp-reactivate-admin'));
});
