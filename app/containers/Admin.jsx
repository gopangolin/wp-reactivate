import React, { Component } from 'react';
import PropTypes from 'prop-types';
import fetch from 'isomorphic-fetch';

export default class Admin extends Component {
  constructor(props) {
    super(props);

    this.state = {
      example_setting: '',
    };

    this.getSetting();
  }

  getSetting = () => {
    fetch(`${this.props.wpObject.api_url}example`, {
      credentials: 'same-origin',
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'X-WP-Nonce': this.props.wpObject.api_nonce,
      },
    })
    .then(response => response.json())
    .then(
      (json) => this.setState({ example_setting: json.value }),
      (err) => console.log('error', err)
    );
  };

  updateSetting = () => {
    fetch(`${this.props.wpObject.api_url}example`, {
      credentials: 'same-origin',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-WP-Nonce': this.props.wpObject.api_nonce,
      },
      body: JSON.stringify({
        example_setting: this.state.example_setting,
      }),
    })
    .then(response => response.json())
    .then(
      (json) => this.setState({ example_setting: json.value }),
      (err) => console.log('error', err)
    );
  }

  deleteSetting = () => {
    fetch(`${this.props.wpObject.api_url}example`, {
      credentials: 'same-origin',
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'X-WP-Nonce': this.props.wpObject.api_nonce,
      },
    })
    .then(response => response.json())
    .then(
      (json) => this.setState({ example_setting: '' }),
      (err) => console.log('error', err)
    );
  }

  updateInput = (event) => {
    this.setState({
      example_setting: event.target.value,
    })
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