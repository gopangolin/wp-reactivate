import 'babel-polyfill';
import ReactDOM from 'react-dom';
import Admin from './Admin.jsx';

document.addEventListener('DOMContentLoaded', function() {
  ReactDOM.render(<Admin />, document.getElementById('wp-reactivate-admin'));
});
