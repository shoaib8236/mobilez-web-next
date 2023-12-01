import { Modal } from "antd";
import React from "react";
import StyledButton from "../StyledButton/StyledButton";
import { FaPhoneAlt } from "react-icons/fa";
import { FaMessage } from "react-icons/fa6";
import { SiWhatsapp } from "react-icons/si";

const ContactSellerModal = (props) => {
  const { open = true, onClose = () => {}, data={} } = props;



  console.log(data)

  const handlePhoneCall = () => {
    window.location.href = `tel:${data?.user?.phone}`; // Replace with the actual phone number
  };

  const handleMessage = () => {
    window.location.href = `sms:${data?.user?.phone}`; // Replace with the actual phone number
  };

  const handleWhatsApp = () => {
    window.open(`https://api.whatsapp.com/send?phone=${data?.user?.phone}`, "_blank");
    // Replace with the actual phone number
  };

  return (
    <Modal footer={false} width={500} visible={open} onCancel={onClose}>
      <div className="contact_seller_modal">
        <h1>Contact With Seller</h1>
        <h3>{data?.user?.shop_name}</h3>

        <div className="contact_links">
          <button className="social_btns" onClick={handlePhoneCall}>
            <FaPhoneAlt />
            {data?.user?.phone}
          </button>
          <button className="social_btns" onClick={handleMessage}>
            <FaMessage />
            {data?.user?.phone}
          </button>
          <button className="social_btns" onClick={handleWhatsApp}>
            <SiWhatsapp />
            {data?.user?.phone}
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default ContactSellerModal;
