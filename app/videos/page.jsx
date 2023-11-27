"use client";

import PageBanner from "@/app-ui/PageBanner/PageBanner";
import Skeleton from "@/app-ui/Skeleton/Skeleton";
import YtPlayer from "@/app-ui/YtPlayer/YtPlayers";
import api from "@/services/api";
import { Col, Input, Row } from "antd";

import React, { useEffect, useState } from "react";

const Page = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  const getVideos = async () => {
    setLoading(true);
    let res = await api.get("/get-videos");
    setLoading(false);

    let videos = res?.data?.videos?.map(
      (item) =>
        item?.video_link?.split("/")[item?.video_link?.split("/").length - 1]
    );

    setVideos(videos);
  };

  useEffect(() => {
    getVideos();
  }, []);

  return (
    <div className="videos_wrapper">
      <PageBanner title="Videos" />
      <div className="content_wrap">
        <div className="videos_header">
          <div className="styled_input">
            <Input placeholder="Search" />
          </div>
        </div>

        <div className="videos">
          {loading ? (
            <Row gutter={[20, 20]}>
                <Col  lg={8} md={8} sm={12} xs={24}>
              <Skeleton height="180px" width="100%" />
              </Col>
                <Col  lg={8} md={8} sm={12} xs={24}>
              <Skeleton height="180px" width="100%" />
              </Col>
                <Col  lg={8} md={8} sm={12} xs={24}>
              <Skeleton height="180px" width="100%" />
              </Col>
            </Row>
          ) : (
            <Row gutter={[20, 20]}>
              {videos?.map((item) => (
                <Col key={item?.id} lg={8} md={8} sm={12} xs={24}>
                  <YtPlayer videoId={item} />
                </Col>
              ))}
            </Row>
          )}
        </div>
      </div>
    </div>
  );
};

export default Page;
