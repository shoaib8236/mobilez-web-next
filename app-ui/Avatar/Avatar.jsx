import React from "react";
import PropTypes from "prop-types";

const Avatar = (props) => {
  const { className = "", url = null } = props;

  return (
    <div className={`styled_avatar ${className}`}>
      <img className="" src={url ? url : ""} />
    </div>
  );
};

Avatar.propTypes = {
  className: PropTypes.string,
  url: PropTypes.string,
};

export default Avatar;
