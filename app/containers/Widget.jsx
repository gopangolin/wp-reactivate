import React from "react";
import PropTypes from "prop-types";

export default function Widget({ wpObject }) {
  return (
    <div>
      <h1>WP Reactivate Widget</h1>
      <p>Title: {wpObject.title}</p>
    </div>
  );
}

Widget.propTypes = {
  wpObject: PropTypes.object,
};
