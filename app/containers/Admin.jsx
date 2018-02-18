import React, { Component } from 'react';
import PropTypes from 'prop-types';
import fetch from 'isomorphic-fetch';

export default class Admin extends Component {
  constructor(props) {
    super(props);

    this.state = {
      settings: undefined
    };

    this.getSetting();
  }

  getSetting = () => {
    fetch(`${this.props.wpObject.api_url}settings`, {
      credentials: 'same-origin',
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'X-WP-Nonce': this.props.wpObject.api_nonce,
      },
    })
    .then(response => response.json())
    .then(
      (json) => this.setState({ settings: json.wpreactivate }),
      (err) => console.log('error', err)
    );
  };

  updateSetting = () => {
    fetch(`${this.props.wpObject.api_url}settings`, {
      credentials: 'same-origin',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-WP-Nonce': this.props.wpObject.api_nonce,
      },
      body: JSON.stringify({
        wpreactivate: this.state.settings,
      }),
    })
    .then(response => response.json())
    .then(
      (json) => this.setState({ settings: json.wpreactivate }),
      (err) => console.log('error', err)
    );
  }

  updateInput = (e) => {
    this.setState({
      settings: e.target.value,
    })
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.updateSetting();
  }

  render() {
    return (
      <div className="wrap">
        <h1>WP Reactivate Settings</h1>
        <form onSubmit={this.handleSubmit}>
          <label>
          Demo Setting:
            <input
              type="text"
              value={this.state.settings}
              onChange={this.updateInput}
            />
          </label>
          <input
            type="submit"
            id="submit"
            className="button button-primary"
            value={'Save'}
          />
        </form>
      </div>
    );
  }
}

Admin.propTypes = {
  wpObject: PropTypes.obj
};