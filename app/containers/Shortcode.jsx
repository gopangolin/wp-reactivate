import React from "react";
import PropTypes from "prop-types";

export default function Shortcode({ wpObject }) {
  return (
    <div>
      <h1>WP Reactivate Frontend</h1>
      <p>Title: {wpObject.title}</p>
    </div>
  );
}

Shortcode.propTypes = {
  wpObject: PropTypes.object,
};
