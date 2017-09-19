import React, { Component } from 'react';

export default class Shortcode extends Component {
  render() {
    console.log(this.props);
    return (
      <div className="wrap">
        <h1>WP Reactivate Frontend</h1>
        <p>Title: {this.props.wpObject.title}</p>
      </div>
    );
  }
}
