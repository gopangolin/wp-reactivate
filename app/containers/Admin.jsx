import React, { Component } from 'react';
import fetch from 'isomorphic-fetch';

export default class Admin extends Component {
  constructor() {
    super();

    this.state = {
      settings: false
    };

    this.getSetting();
  }

  getSetting = () => {
    fetch(`${wpr_object.api_url}settings`, {
      credentials: 'same-origin',
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'X-WP-Nonce': wpr_object.api_nonce,
      },
    })
    .then(response => response.json())
    .then(
      (json) => this.setState({ settings: json }),
      (err) => console.log('error', err)
    );
  };

  updateSetting = () => {
    fetch(`${wpr_object.api_url}settings`, {
      credentials: 'same-origin',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-WP-Nonce': wpr_object.api_nonce,
      },
      body: JSON.stringify({
        key: 'test',
        value: 'hello'
      }),
    })
    .then(response => response.json())
    .then(
      (json) => this.setState({ settings: json }),
      (err) => console.log('error', err)
    );
  }

  render() {
    return (
      <div className="wrap">
        <h1>WP Reactivate Settings</h1>

        <input
          type="text"
          ref={(input) => { this.nameInput = input; }}
          value={this.state.settings.name}
        />

        <input
          type="text"
          ref={(input) => { this.emailInput = input; }}
          value={this.state.settings.email}
        />

        <input
          type="submit"
          id="submit"
          className="button button-primary"
          value={'Submit'}
          onClick={this.updateSetting}
        />
      </div>
    );
  }
}
