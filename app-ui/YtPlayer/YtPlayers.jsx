"use client";

import React from "react";
import YouTube from "react-youtube";

const YtPlayer = (props) => {
  const opts = {
    height: "100%",
    width: "100%",
  };

  return (
    <div className={"yt_player__ASGDF2"}>
      <YouTube {...props} opts={opts} />
    </div>
  );
};

export default YtPlayer;
