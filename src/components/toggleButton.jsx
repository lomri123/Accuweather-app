import React from "react";
import { Link } from "react-router-dom";

export const ToggleButton = props => {
  return (
    <Link
      className="btn btn-primary mt-2"
      to={`/${props.toggleName}`}
      onClick={props.handleToggleButton}
    >
      Switch to {props.toggleName}
    </Link>
  );
};
