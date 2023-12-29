"use client";

import React from "react";
import PropTypes from "prop-types";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const StyledButton = (props) => {
  const {
    className = "primary lg",
    type = "button",
    loading = false,
    disabled = false,
    icon = null,
    onClick = () => {},
    children,
  } = props;

  return (
    <button
      type={type}
      disabled={loading || disabled}
      onClick={onClick}
      className={`styled_button ${ disabled ? "disabled" : "" } ${loading ? 'disabled loading' : ''} ${className}`}
    >
      {icon && icon} <span className="child_element">{children}</span>
      {loading && (
        <span className="loading_wrap">
          <AiOutlineLoading3Quarters />
        </span>
      )}
    </button>
  );
};

StyledButton.propTypes = {
  className: PropTypes.string,
  type: PropTypes.oneOf(["button", "submit", "reset"]),
  loading: PropTypes.bool,
  disabled: PropTypes.bool,
  icon: PropTypes.string,
  onClick: PropTypes.func,
  children: PropTypes.node.isRequired,
};

export default React.memo(StyledButton);
