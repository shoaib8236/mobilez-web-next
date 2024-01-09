'use client'

import { Progress } from "antd";
import React, { useEffect, useState } from "react";

const Page = () => {

  const [user, setUser] = useState(null)


  useEffect(()=> {

    let getUser = JSON.parse(localStorage.getItem('@user'))


    setUser(getUser)

  }, [])




  return (
    <div className="progress_wrap">
      <div className="progress">
        <h1>Daily Progress</h1>
        <Progress size={220} strokeColor={'#083b86'} type="circle" percent={Math.round(parseFloat(user?.daily_progress))} />
      </div>
      <div className="progress">
        <h1>Monthly Progress</h1>
        <Progress size={220} strokeColor={'#083b86'} type="circle" percent={Math.round(parseFloat(user?.progress))} />
      </div>
    </div>
  );
};

export default Page;
