"use client";
import React, { useEffect, useState } from "react";
import { Row, Form, Col, Input, Checkbox, Select, notification } from "antd";
import {
  emailRule,
  passwordRule,
  requiredRule,
  numberRule,
} from "@/utils/rules";
import StyledButton from "@/app-ui/StyledButton/StyledButton";
import api from "@/services/api";
import { useRouter } from "next/navigation";
import { useAuthCheck } from "@/utils/hooks";
import LoginWithGoogle from "@/app-ui/LoginWithGoogle/LoginWithGoogle";
import Image from "next/image";
import PlacesAutocomplete, {
  geocodeByAddress,
  geocodeByPlaceId,
  getLatLng,
} from "react-places-autocomplete";

import { MdOutlineMyLocation } from "react-icons/md";

const Page = () => {
  const router = useRouter();
  const { authCheck } = useAuthCheck();

  const [form] = Form.useForm();

  const [loading, setLoading] = useState(false);
  const [accountType, setAccountType] = useState(false);
  const [address, setAddress] = useState("");
  const [selectedAddress, setSelectedAddress] = useState("");
  const [isPlacesDropDown, setIsPlacesDropdown] = useState(false);

  useEffect(() => {
    if (authCheck) {
      router.back();
    }
  }, [authCheck]);

  const onSubmit = async (values) => {
    if (values?.password !== values?.conf_password) {
      notification.error({ message: "Password does not match!" });
      return;
    }

    let payload = {
      ...values,
      terms: true,
      city: selectedAddress.city,
      area: address,
    };

    try {
      setLoading(true);
      const res = await api.post("/register-user", payload);
      if (res?.data?.status === 400) {
        notification.error({ message: res?.data?.errors?.email?.[0] });
        setLoading(false);
      }

      if (res?.data?.status === 200) {
        notification.success({ message: res?.data?.message });
        localStorage.setItem("@phone", values?.phone);
        localStorage.setItem("@token", res?.data?.token);
        setLoading(false);
        router.push("/otp");
      } else if (res?.data?.status === 419) {
        notification.error({ message: res?.data?.message });
        setLoading(false);
      }
    } catch (error) {
      notification.error({ message: error?.response?.data?.message });
      setLoading(false);
    }
  };

  const onChangeAccountType = (e) => {
    setAccountType(e === "business");
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
    console.log("address", extractedData, value);
    setAddress(value);
  };

  const onOpenPlacesDropdown = () => {
    setIsPlacesDropdown(!isPlacesDropDown);
  };
  const onClosePlacesDropdown = () => {
    setIsPlacesDropdown(false);
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

  return (
    <div className="signup_wrap">
      <div className="content_wrap">
        <Row gutter={[16, 16]}>
          <Col className="hide_image_tab" lg={12} md={12} sm={24} xs={24}>
            <Image
              height={572}
              width={528}
              loading="lazy"
              layout="responsive"
              src="/register.png"
            />
          </Col>
          <Col lg={12} md={12} sm={24} xs={24}>
            <div className="signup_form">
              <h2>Sign Up</h2>
              <p>
                <span className="welcome_text">Welcome back!</span> please
                signup to your <br /> account.
              </p>
              <div>
                <Form form={form} onFinish={onSubmit} layout="vertical">
                  <Row gutter={[8, 8]}>
                    <Col lg={12} md={12} sm={24} xs={24}>
                      <Form.Item
                        layout="vertical"
                        className="styled_input"
                        name="first_name"
                        rules={requiredRule}
                        label="First Name"
                      >
                        <Input placeholder="First Name" />
                      </Form.Item>
                    </Col>
                    <Col lg={12} md={12} sm={24} xs={24}>
                      <Form.Item
                        layout="vertical"
                        className="styled_input"
                        name="last_name"
                        rules={requiredRule}
                        label="Last Name"
                      >
                        <Input placeholder="Last Name" />
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row gutter={[8, 8]}>
                    <Col lg={24} md={24} sm={24} xs={24}>
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
                                      className={`${
                                        suggestion.active ? "active" : ""
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
                    <Col lg={24} md={24} sm={24} xs={24}>
                      <Form.Item
                        className="styled_input"
                        name="email"
                        rules={emailRule}
                        label="Email"
                      >
                        <Input placeholder="Enter Email" />
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row gutter={[8, 8]}>
                    <Col lg={24} md={24} sm={24} xs={24}>
                      <Form.Item
                        className="styled_input"
                        name="phone"
                        rules={numberRule}
                        label="Contact number"
                      >
                        <Input placeholder="Enter Phone Number" />
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row gutter={[8, 8]}>
                    <Col lg={12} md={12} sm={24} xs={24}>
                      <Form.Item
                        layout="vertical"
                        className="styled_input"
                        name="password"
                        rules={passwordRule}
                        label="Password"
                      >
                        <Input placeholder="Password" />
                      </Form.Item>
                    </Col>
                    <Col lg={12} md={12} sm={24} xs={24}>
                      <Form.Item
                        layout="vertical"
                        className="styled_input"
                        name="conf_password"
                        rules={passwordRule}
                        label="Confirm Password"
                      >
                        <Input placeholder="Confirm Password" />
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row gutter={[8, 8]}>
                    <Col lg={12} md={12} sm={24} xs={24}>
                      <Form.Item
                        className="styled_input"
                        name="code"
                        label="Referral Code"
                      >
                        <Input placeholder="Referral Code" />
                      </Form.Item>
                    </Col>
                    <Col lg={12} md={12} sm={24} xs={24}>
                      <Form.Item
                        rules={requiredRule}
                        name="acc_type"
                        label="Select Account Type"
                      >
                        <Select
                          onChange={onChangeAccountType}
                          placeholder="Select Account Type"
                          className="styled_select"
                        >
                          <Select.Option value="business">
                            Business
                          </Select.Option>
                          <Select.Option value="individual">
                            Individual
                          </Select.Option>
                        </Select>
                      </Form.Item>
                    </Col>
                  </Row>
                  {accountType ? (
                    <Row gutter={[8, 8]}>
                      <Col lg={12} md={12} sm={24} xs={24}>
                        <Form.Item
                          rules={requiredRule}
                          className="styled_input"
                          name="shop_name"
                          label="Shop Name"
                        >
                          <Input placeholder="Shop Name" />
                        </Form.Item>
                      </Col>
                      <Col lg={12} md={12} sm={24} xs={24}>
                        <Form.Item
                          rules={requiredRule}
                          name="shop_address"
                          label="Shop Address"
                          className="styled_input"
                        >
                          <Input placeholder="Shop Address" />
                        </Form.Item>
                      </Col>
                    </Row>
                  ) : null}

                  <Form.Item
                    name="agreement"
                    valuePropName="checked"
                    rules={[
                      {
                        validator: (_, value) =>
                          value
                            ? Promise.resolve()
                            : Promise.reject(new Error("required!")),
                      },
                    ]}
                  >
                    <Checkbox>I have read terms</Checkbox>
                  </Form.Item>

                  <div>
                    <div className="submit_wrapper">
                      <StyledButton
                        loading={loading}
                        className="primary w_100
                      "
                        type="submit"
                      >
                        Sign Up
                      </StyledButton>
                    </div>
                    <p className="text_center signup_or">or</p>
                    <Row gutter={[16, 16]}>
                      <Col lg={24} md={24} sm={24} xs={24}>
                        <div className="flex_center">
                          <LoginWithGoogle />
                        </div>
                      </Col>
                    </Row>
                  </div>
                </Form>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Page;
