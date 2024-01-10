import { Col, Form, Input, Row, Select, Upload, notification } from "antd";
import React, { useState, useEffect } from "react";
import StyledButton from "../StyledButton/StyledButton";
import { requiredRule } from "@/utils/rules";
import {
  ProductCondition,
  PtaStatus,
  RamOptions,
  WarrantyOptions,
  StorageOptions,
} from "@/utils/fakeData";
import api from "@/services/api";
import imageCompression from "browser-image-compression";
import { getImage } from "@/utils/helper";

const PostMobile = (props) => {
  const { brands = [], defaultValue = null } = props;

  const [form] = Form.useForm();

  const { Option } = Select;
  const [fileList, setFileList] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (defaultValue?.category === "Mobile") {
      form.setFieldsValue({
        ...defaultValue,
        files: {
          fileList: defaultValue?.productimages?.map((item) => {
            return {
              uid: item?.id,
              name: item?.img,
              status: "done",
              url: getImage(item?.img),
            };
          }),
        },
      });
    }

    setFileList(
      defaultValue?.productimages?.map((item) => {
        return {
          uid: item?.id,
          name: item?.img,
          status: "done",
          url: getImage(item?.img),
        };
      })
    );
  }, [defaultValue]);

  const handleFileChange = (info) => {
    const { fileList } = info;
    setFileList([...fileList]);
    return true;
  };

  const compressImage = async (file) => {
    console.log(
      `originalFile size ${file?.originFileObj.size} MB Before compress`
    );

    const image = new Image();
    image.src = URL.createObjectURL(file?.originFileObj);

    return new Promise((resolve) => {
      image.onload = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        canvas.width = 800;
        canvas.height = 600;

        ctx.drawImage(image, 0, 0, canvas.width, canvas.height);

        canvas.toBlob(
          (blob) => {
            resolve({
              ...file,
              originFileObj: blob,
            });
          },
          file?.originFileObj.type,
          0.7 // Adjust the quality as needed
        );
      };
    });
  };

  const uploadFiles = async (id, files) => {
    const { fileList } = files;

    try {
      const compressedImages = await Promise.all(fileList.map(compressImage));

      let formData = new FormData();

      for (const [key, value] of Object.entries(compressedImages)) {
        formData.append(`image[]`, value?.originFileObj);
      }
      formData.append("product_id", id);

      let res = await api.post("/upload-Ad-image", formData);
    } catch (error) {
      console.error("Error compressing images:", error);
    }
  };

  const updateAdd = async (data, files) => {
    const { fileList } = files;

    try {
      setLoading(true);

      let formData = new FormData();

      for (const [key, value] of Object.entries(data)) {
        formData.append(key, value);
      }

      let res = await api.post("/update-Ad", formData);

      if (res?.data?.status) {
        await uploadFiles(res?.data?.product_id, files);
        notification.success({
          message: "Success",
          description: "Ad updated successfully!",
        });
      }
    } catch (error) {
      notification.error({
        message: "Oops",
        description: "Something went wrong!",
      });
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const onFinish = async (values) => {
    const { files, ...data } = values;

    let payload = {
      ...data,
      category: "Mobile",
    };

    try {
      setLoading(true);

      if (defaultValue?.id) {
        await updateAdd(payload, files);
      } else {
        let formData = new FormData();

        for (const [key, value] of Object.entries(payload)) {
          formData.append(key, value);
        }

        let res = await api.post("/post-Ad", formData);

        if (res?.data?.status) {
          form.resetFields();
          await uploadFiles(res?.data?.product_id, files);
          notification.success({
            message: "Success",
            description: "Ad posted successfully!",
          });
        }
      }
    } catch (error) {
      notification.error({
        message: "Oops",
        description: "Something went wrong!",
      });
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="post">
      <h2>Mobile</h2>
      <Form onFinish={onFinish} form={form} layout="vertical">
        <Row gutter={[20, 20]}>
          <Col lg={8} md={8} sm={12} xs={24}>
            <Form.Item
              rules={requiredRule}
              name={"brand"}
              label="Product Brand"
            >
              <Select className="styled_select">
                {brands?.map((item, i) => (
                  <Option key={i} value={item?.title}>
                    {item.title}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col lg={8} md={8} sm={12} xs={24}>
            <Form.Item
              rules={requiredRule}
              name={"model"}
              className="styled_input"
              label="Product Model"
            >
              <Input />
            </Form.Item>
          </Col>
          <Col lg={8} md={8} sm={12} xs={24}>
            <Form.Item
              rules={requiredRule}
              name={"price"}
              className="styled_input"
              label="Price"
            >
              <Input />
            </Form.Item>
          </Col>
          <Col lg={8} md={8} sm={12} xs={24}>
            <Form.Item rules={requiredRule} name={"ram"} label="Ram">
              <Select className="styled_select">
                {RamOptions?.map((item, i) => (
                  <Option key={i} value={item?.number}>
                    {item.label}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col lg={8} md={8} sm={12} xs={24}>
            <Form.Item rules={requiredRule} name={"storage"} label="Storage">
              <Select className="styled_select">
                {StorageOptions?.map((item, i) => (
                  <Option key={i} value={item?.number}>
                    {item.label}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col lg={8} md={8} sm={12} xs={24}>
            <Form.Item
              rules={requiredRule}
              name={"pta_status"}
              label="PTA Status"
            >
              <Select className="styled_select">
                {PtaStatus?.map((item, i) => (
                  <Option key={i} value={item?.value}>
                    {item.label}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col lg={8} md={8} sm={12} xs={24}>
            <Form.Item
              rules={requiredRule}
              name={"product_type"}
              label="Product Condition"
            >
              <Select className="styled_select">
                {ProductCondition?.map((item, i) => (
                  <Option key={i} value={item?.value}>
                    {item.label}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col lg={8} md={8} sm={12} xs={24}>
            <Form.Item rules={requiredRule} name={"warranty"} label="Warranty">
              <Select className="styled_select">
                {WarrantyOptions?.map((item, i) => (
                  <Option key={i} value={item?.value}>
                    {item.label}
                  </Option>
                ))}
                <Option value={"No Warranty"}>No Warranty</Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item name="files" rules={requiredRule} label="Upload images">
              <Upload
                beforeUpload={() => false}
                listType="picture-card"
                fileList={fileList}
                onChange={handleFileChange}
                maxCount={20}
              >
                {fileList?.length === 20 ? "" : "Upload"}
              </Upload>
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              name={"description"}
              className="styled_input textarea_style"
              label="Description"
            >
              <Input.TextArea />
            </Form.Item>
          </Col>
        </Row>
        <div className="submit_wrapper">
          <StyledButton loading={loading} type="submit">
            {defaultValue?.id ? "Update" : "Post"}
          </StyledButton>
        </div>
      </Form>
    </div>
  );
};

export default PostMobile;
