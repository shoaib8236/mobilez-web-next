import React from "react";
import PropTypes from "prop-types";

const StyledHeading = (props) => {
  const { text = "", className = "primary" } = props;

  return (
    <div className="content_wrap">
      <div className={`styled_heading ${className}`}>
        <h1>{text}</h1>
      </div>
    </div>
  );
};

StyledHeading.propTypes = {
  text: PropTypes.string,
  className: PropTypes.string,
};

export default StyledHeading;
