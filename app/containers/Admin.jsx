import React, { Component } from 'react';
import PropTypes from 'prop-types';

import fetchWP from '../utils/fetchWP';

export default class Admin extends Component {
  constructor(props) {
    super(props);

    this.state = {
      exampleSetting: '',
      savedExampleSetting: ''
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
      (json) => this.setState({
        exampleSetting: json.value,
        savedExampleSetting: json.value
      }),
      (err) => console.log( 'error', err )
    );
  };

  updateSetting = () => {
    this.fetchWP.post( 'example', { exampleSetting: this.state.exampleSetting } )
    .then(
      (json) => this.processOkResponse(json, 'saved'),
      (err) => console.log('error', err)
    );
  }

  deleteSetting = () => {
    this.fetchWP.delete( 'example' )
    .then(
      (json) => this.processOkResponse(json, 'deleted'),
      (err) => console.log('error', err)
    );
  }

  processOkResponse = (json, action) => {
    if (json.success) {
      this.setState({
        exampleSetting: json.value,
        savedExampleSetting: json.value,
      });
    } else {
      console.log(`Setting was not ${action}.`, json);
    }
  }

  updateInput = (event) => {
    this.setState({
      exampleSetting: event.target.value,
    });
  }

  handleSave = (event) => {
    event.preventDefault();
    if ( this.state.exampleSetting === this.state.savedExampleSetting ) {
      console.log('Setting unchanged');
    } else {
      this.updateSetting();
    }
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
              value={this.state.exampleSetting}
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