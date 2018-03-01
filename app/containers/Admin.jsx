import React, { Component } from 'react';
import PropTypes from 'prop-types';

import fetchWP from '../utils/fetchWP';

export default class Admin extends Component {
  constructor(props) {
    super(props);

    this.state = {
      example_setting: '',
    };

    this.fetchWP = new fetchWP({
      restURL: this.props.wpObject.api_url,
      restNonce: this.props.wpObject.api_nonce,
    });

    this.getSetting();
  }

  getSetting = () => {
    this.fetchWP.get( 'example' )
    .then(
      (json) => this.setState({ example_setting: json.value }),
      (err) => console.log( 'error', err )
    );
  };

  updateSetting = () => {
    this.fetchWP.post( 'example', { example_setting: this.state.example_setting } )
    .then(
      (json) => this.setState({ example_setting: json.value }),
      (err) => console.log('error', err)
    );
  }

  deleteSetting = () => {
    this.fetchWP.delete( 'example' )
    .then(
      (json) => this.setState({ example_setting: '' }),
      (err) => console.log('error', err)
    );
  }

  updateInput = (event) => {
    this.setState({
      example_setting: event.target.value,
    });
  }

  handleSave = (event) => {
    event.preventDefault();
    this.updateSetting();
  }

  handleDelete = (event) => {
    event.preventDefault();
    this.deleteSetting();
  }

  render() {
    return (
      <div className="wrap">
        <form>
          <h1>WP Reactivate Settings</h1>
          
          <label>
          Example Setting:
            <input
              type="text"
              value={this.state.example_setting}
              onChange={this.updateInput}
            />
          </label>

          <button
            id="save"
            className="button button-primary"
            onClick={this.handleSave}
          >Save</button>

          <button
            id="delete"
            className="button button-primary"
            onClick={this.handleDelete}
          >Delete</button>
        </form>
      </div>
    );
  }
}

Admin.propTypes = {
  wpObject: PropTypes.object
};