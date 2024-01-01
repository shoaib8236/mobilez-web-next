"use client";

import React, { useEffect, useState } from "react";
import api from "@/services/api";
import { getFormattedDate, getImage } from "@/utils/helper";
import StyledButton from "@/app-ui/StyledButton/StyledButton";
import Image from "next/image";
import { notification } from "antd";
import { useRouter } from "next/navigation";

const Page = () => {
  const [myDevices, setMyDevices] = useState();
  const [deleteId, setDeleteId] = useState(null);
  const [soldId, setSoldId] = useState(null);

  const router = useRouter()

  const getMyAds = async () => {
    try {
      let res = await api.get("/my-devices");
      if (res?.data?.status) {
        setMyDevices(res?.data?.my_adds);
      }
    } catch (error) {}
  };

  useEffect(() => {
    getMyAds();
  }, []);

  const onDelete = (id) => async () => {
    try {
      setDeleteId(id);
      let res = await api.post(`/delete-my-add/${id}`);

      if (res?.data?.status) {
        setMyDevices((prev) => prev?.filter((item) => item?.id !== id));
        notification.success({
          message: "Success",
          description: "Ad deleted successfully!",
        });
      }
    } catch (error) {
    } finally {
      setDeleteId(null);
    }
  };
  const onSold = (id) => async () => {
    try {
      setSoldId(id);
      let res = await api.get(`/sell-ad/${id}`);

      if (res?.data?.status) {
        setMyDevices((prev) =>
          prev?.map((item) => {
            if (item?.id === id) {
              return {
                ...item,
                sell_status: "Sold",
              };
            } else {
              return item;
            }
          })
        );
        notification.success({
          message: "Success",
          description: "Ad marked sold successfully!",
        });
      }
    } catch (error) {
    } finally {
      setSoldId(null);
    }
  };

  const onEdit = (data)=> ()=> {
    router.push(`/edit-ad?type=${data?.category?.toLowerCase()}&id=${data?.id}`)
  }

  return (
    <div className="my_devices_wrap">
      <div className="styled_table">
        <div className="th">
          <div className="td sno">#</div>
          <div className="td">Brand</div>
          <div className="td">Product Name</div>
          <div className="td">Unit Price</div>
          <div className="td">Date</div>
          <div className="td">Picture</div>
          <div className="td">Action</div>
        </div>
        {myDevices?.map((item, i) => (
          <div key={i} className="tr">
            <div className="td sno">{i}</div>
            <div className="td">
              {item?.category === "accessories" ? "-" : item?.brand}
            </div>
            <div className="td">
              {item?.category === "accessories"
                ? "accessories_title"
                : item?.model}
            </div>
            <div className="td">{item.price}</div>
            <div className="td">{getFormattedDate(item?.created_at)}</div>
            <div className="td product_image">
              <Image
                src={getImage(item?.image?.img)}
                alt="phone"
                width={100}
                height={100}
                style={{ objectFit: "contain" }}
              />
            </div>
            <div className="td action_td">
              <StyledButton
                onClick={onSold(item?.id)}
                loading={item?.id === soldId}
                disabled={item?.sell_status === "Sold"}
                className="sm primary"
              >
                Sold
              </StyledButton>
              <StyledButton onClick={onEdit(item)} disabled={item?.sell_status === "Sold"} className="sm primary">Edit</StyledButton>
              <StyledButton
                loading={item?.id === deleteId}
                onClick={onDelete(item?.id)}
                className="sm danger"
              >
                Delete
              </StyledButton>
            </div>
          </div>
        ))}
      </div>
      <p className="entries">Showing 0 to 0 of 0 entries</p>
    </div>
  );
};

export default Page;
