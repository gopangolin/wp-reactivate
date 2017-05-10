import React, { Component } from 'react';

export default class Admin extends Component {
  render() {
    return (
      <div className="wrap">
        <h1>WP Reactivate Settings</h1>

        <input
          type="submit"
          id="submit"
          className="button button-primary"
          value={'Submit'}
        />
      </div>
    );
  }
}
