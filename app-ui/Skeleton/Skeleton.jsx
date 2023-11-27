import React from "react";
import PropTypes from "prop-types";
import { FileImageFilled } from "@ant-design/icons";
import { ImFileVideo } from "react-icons/im";

const Skeleton = (props) => {
  const {
    className = "",
    height = "30px",
    width = "100px",
    borderRadius = "5px",
    margin = "0px",
    isActive = true,
    circle = false,
    type = "skeleton",
  } = props;
  return (
    <div
      style={{
        height,
        width,
        margin,
        borderRadius: circle ? "50%" : borderRadius,
      }}
      className={`skeleton 
      ${className}
      ${isActive ? "skeleton__active" : ""}`}
    >
      {type === "image" && <FileImageFilled className="image_style_skeleton" />}
      {type === "video" && <ImFileVideo className="video_style_skeleton" />}
    </div>
  );
};

Skeleton.propTypes = {
  className: PropTypes.string,
  height: PropTypes.string,
  width: PropTypes.string,
  borderRadius: PropTypes.string,
  margin: PropTypes.string,
  isActive: PropTypes.bool,
  circle: PropTypes.bool,
  type: PropTypes.oneOf(["skeleton", "image", "video"]),
};

export default React.memo(Skeleton);
