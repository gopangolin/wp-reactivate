import React, { Component } from 'react';
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
      (json) => this.setState({ settings: json.wpreactivate }),
      (err) => console.log('error', err)
    );
  };

  updateSetting = () => {
    fetch(`${wpr_object.api_url}settings`, {
      credentials: 'same-origin',
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'X-WP-Nonce': wpr_object.api_nonce,
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

  render() {
    return (
      <div className="wrap">
        <h1>WP Reactivate Settings</h1>

        <input
          type="text"
          value={this.state.settings}
          onChange={this.updateInput}
        />

        <input
          type="submit"
          id="submit"
          className="button button-primary"
          value={'Save'}
          onClick={this.updateSetting}
        />
      </div>
    );
  }
}
