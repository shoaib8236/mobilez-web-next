"use client";

import StyledButton from "@/app-ui/StyledButton/StyledButton";
import { Col, Form, Input, Upload, Row, notification } from "antd";
import React, { useEffect, useState } from "react";
import { emailRule, numberRule, requiredRule } from "@/utils/rules";
import api from "@/services/api";
import { IoClose } from "react-icons/io5";
import PlacesAutocomplete, {
  geocodeByAddress,
  geocodeByPlaceId,
  getLatLng,
} from "react-places-autocomplete";
import { MdOutlineMyLocation } from "react-icons/md";

const Page = () => {
  const [form] = Form.useForm();
  const [profileImage, setProfileImage] = useState(null);
  const [rawProfile, setRawProfile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [defaultValues, setDefaultValues] = useState({});
  const [isPlacesDropDown, setIsPlacesDropdown] = useState(false);
  const [address, setAddress] = useState("");
  const [selectedAddress, setSelectedAddress] = useState("");

  useEffect(() => {
    let getUser = JSON.parse(localStorage.getItem("@user"));
    setAddress(getUser?.area)
    setDefaultValues(getUser);
  }, []);

  useEffect(() => {
    if (Object.keys(defaultValues || {})?.length) {
      const { photo, ...data } = defaultValues;
      setProfileImage(photo);
      form.setFieldsValue(data);
    }
  }, [defaultValues]);

  const onUploadProfile = (file) => {
    if (file instanceof Blob || file instanceof File) {
      setRawProfile(file);
      const url = URL.createObjectURL(file);
      setProfileImage(url);

      return false;
    } else {
      console.error("Invalid file object:", file);

      return false;
    }
  };

  const onRemoveProfile = () => {
    setProfileImage(null);
  };

  const updateProfile = async (values) => {
    try {
      setLoading(true);
      let payload = { ...values, ...(rawProfile && { photo: rawProfile  }) };


      let res = await api.post("/update-profile", {...payload, city: selectedAddress.city,});
      if (res?.data?.status) {
        notification.success({
          message: "Profile updated successfully!",
        });
        localStorage.setItem(
          "@user",
          JSON.stringify({ ...defaultValues, ...payload })
        );
      }
    } catch (error) {
      console.log(error);
    }

    setLoading(false);
  };


  const extractAddressComponents = (addressComponents) => {
    let extractedData = {
      area: "",
      city: "",
      province: "",
      country: "",
    };

    addressComponents.forEach((component) => {
      if (
        component.types.includes("sublocality") ||
        component.types.includes("neighborhood")
      ) {
        extractedData.area = component.long_name;
      } else if (component.types.includes("locality")) {
        extractedData.city = component.long_name;
      } else if (component.types.includes("administrative_area_level_1")) {
        extractedData.province = component.long_name;
      } else if (component.types.includes("country")) {
        extractedData.country = component.long_name;
      }
    });

    return extractedData;
  };

  const handleSelect = async (value) => {
    const results = await geocodeByAddress(value);
    let extractedData = extractAddressComponents(
      results[0]?.address_components
    );

    setSelectedAddress(extractedData);

    setAddress(value);
  };

  const onGetCurrentLocation = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          try {
            const results = await geocodeByAddress(`${latitude}, ${longitude}`);
            if (results && results.length > 0) {
              const extractedData = extractAddressComponents(
                results[0]?.address_components
              );
              setSelectedAddress(extractedData);
              setAddress(`${extractedData.area}, ${extractedData.city}`);
              form.setFieldValue(
                "area",
                `${extractedData.area}, ${extractedData.city}`
              );
              setIsPlacesDropdown(false);
            }
          } catch (error) {
            console.error("Error getting address from coordinates:", error);
          }
        },
        (error) => {
          console.error(`Error getting location: ${error.message}`);
        }
      );
    } else {
      console.error("Geolocation is not supported by your browser");
    }
  };

  const onOpenPlacesDropdown = () => {
    setIsPlacesDropdown(!isPlacesDropDown);
  };
  const onClosePlacesDropdown = () => {
    setIsPlacesDropdown(false);
  };

  return (
    <div className="profile_setting">
      <div className="form_container">
        <Form
          autoComplete="off"
          onFinish={updateProfile}
          className="form"
          form={form}
          layout="vertical"
        >
          <div className="user_detail">
            <h1>Edit Profile</h1>

          </div>
          <Row gutter={[20, 20]}>
            <Col className="profile_upload" span={24}>
              {!profileImage && (
                <Form.Item rules={requiredRule} name="photo">
                  <Upload
                    showUploadList={false}
                    beforeUpload={onUploadProfile}
                    listType="picture-circle"
                  >
                    Upload
                  </Upload>
                </Form.Item>
              )}
              {profileImage && (
                <div className="profile_image">
                  <button onClick={onRemoveProfile}>
                    <IoClose />
                  </button>
                  <img src={profileImage} alt="user" />
                </div>
              )}
            </Col>
            <Col lg={12} md={12} sm={24} xs={24}>
              <Form.Item
                rules={requiredRule}
                className="styled_input"
                name={"first_name"}
                label="First Name"
              >
                <Input />
              </Form.Item>
            </Col>
            <Col lg={12} md={12} sm={24} xs={24}>
              {" "}
              <Form.Item
                rules={requiredRule}
                className="styled_input"
                name={"last_name"}
                label="Last Name"
              >
                <Input />
              </Form.Item>
            </Col>
            <Col lg={12} md={12} sm={24} xs={24}>

              <Form.Item
                rules={requiredRule}
                className="styled_input"
                label="Location"
                name="area"
              >
                <PlacesAutocomplete
                  shouldFetchSuggestions={address?.length > 3}
                  value={address}
                  onChange={setAddress}
                  onSelect={handleSelect}
                  searchOptions={{
                    componentRestrictions: {
                      country: "pk", // ISO 3166-1 alpha-2 country code for Pakistan
                    },
                  }}
                >
                  {({
                    getInputProps,
                    suggestions,
                    getSuggestionItemProps,
                    loading,
                  }) => (
                    <div>
                      <Input
                        onClick={onOpenPlacesDropdown}
                        onBlur={onClosePlacesDropdown}
                        {...getInputProps({
                          placeholder: "Click to find your address",
                        })}
                        value={address}
                      />
                      {isPlacesDropDown && (
                        <div className="suggest_box">
                          <button
                            onClick={onGetCurrentLocation}
                            type="button"
                          >
                            <MdOutlineMyLocation />
                            Current location
                          </button>

                          {loading && <div>Loading...</div>}

                          {suggestions.map((suggestion, index) => (
                            <div
                              className={`${suggestion.active ? "active" : ""
                                }`}
                              key={index}
                              {...getSuggestionItemProps(
                                suggestion,
                                {}
                              )}
                            >
                              {suggestion.description}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </PlacesAutocomplete>
              </Form.Item>
            </Col>
            <Col lg={12} md={12} sm={24} xs={24}>
              <Form.Item

                rules={emailRule}
                className="styled_input"
                name={"email"}
                label="Email"
              >
                <Input disabled />
              </Form.Item>
            </Col>
            <Col lg={12} md={12} sm={24} xs={24}>
              {" "}
              <Form.Item
                rules={requiredRule}
                className="styled_input"
                name={"phone"}
                label="Phone"
              >
                <Input disabled />
              </Form.Item>
            </Col>
            {defaultValues?.user_type === "businees" ? (
              <>
                <Col lg={12} md={12} sm={24} xs={24}>
                  <Form.Item
                    rules={requiredRule}
                    className="styled_input"
                    name={"shop_name"}
                    label="Shop Name"
                  >
                    <Input />
                  </Form.Item>
                </Col>
                <Col lg={12} md={12} sm={24} xs={24}>
                  <Form.Item
                    rules={requiredRule}
                    className="styled_input"
                    name={"shop_address"}
                    label="Shop Address"
                  >
                    <Input />
                  </Form.Item>
                </Col>
              </>
            ) : null}
          </Row>
          <div className="submit_wrapper">
            <StyledButton loading={loading} type={"submit"}>
              Update
            </StyledButton>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default Page;
