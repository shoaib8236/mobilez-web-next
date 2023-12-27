import { Progress } from "antd";
import React from "react";

const Page = () => {
  return (
    <div className="progress_wrap">
      <div className="progress">
        <h1>Daily Progress</h1>
        <Progress size={220} strokeColor={'#083b86'} type="circle" percent={75} />
      </div>
      <div className="progress">
        <h1>Monthly Progress</h1>
        <Progress size={220} strokeColor={'#083b86'} type="circle" percent={75} />
      </div>
    </div>
  );
};

export default Page;
