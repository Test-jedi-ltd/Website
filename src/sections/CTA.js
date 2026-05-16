import {
  Card,
  Col,
  ConfigProvider,
  Form,
  Input,
  Row,
  Select,
  Carousel,
} from "antd";
import { useState } from "react";
import TextArea from "antd/es/input/TextArea";
import { labelConfig } from "../assets/static.config";
import { Icon } from "@iconify/react";

const contentStyle = {
  height: "350px",
  color: "#151240",
};

const servicesOptions = [
  { label: "Full-cycle Software Testing", value: 1 },
  { label: "Performance Testing", value: 2 },
  { label: "Automated Testing", value: 3 },
  { label: "Functional Testing", value: 4 },
  { label: "QA Consulting", value: 5 },
];

const CTA = () => {
  const [form] = Form.useForm();
  const [result, setResult] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onFinish = async (values) => {
    setIsSubmitting(true);
    setResult("Sending...");

    const formData = new FormData();
    formData.append("access_key", "53971ea8-15fe-4bea-a6db-02da0dc6ceed");
    formData.append("name", values.name || "");
    formData.append("email", values.email || "");
    formData.append("companyName", values.companyName || "");
    formData.append("service", String(values.service || ""));
    formData.append("message", values.message || "");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        setResult("Form Submitted Successfully");
        form.resetFields();
      } else {
        setResult(data.message || "Error");
      }
    } catch (error) {
      setResult("Error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <ConfigProvider
      theme={{
        token: {
          // Seed Token
          colorPrimary: "#151240",
          fontFamily: "'Sora', sans-serif",
          controlOutline: "transparent",

          Form: {
            labelColor: "#151240",
          },

          Input: {
            colorBgContainer: "#ffffff",
            activeBorderColor: "#D9C5B2",
            hoverBorderColor: "#D9C5B2",
          },

          Select: {
            colorBgContainer: "#ffffff",
            activeBorderColor: "#D9C5B2",
            hoverBorderColor: "#D9C5B2",
          },
        },
      }}
    >
      <div className="px-5 md:px-20 py-20 bg-medium-brown flex flex-col lg:grid grid-cols-2 md:gap-10" id="contact">
        <div className="text-center">
          <div className="flex justify-center gap-2 items-center">
            <h2 className="text-2xl md:text-4xl my-14 font-bold text-slate-900">
              {labelConfig.ready}
            </h2>
            <Icon
              icon="lets-icons:message-duotone"
              width="40"
              style={{ color: "#A3613D" }}
            />
          </div>

          <Card
            style={{
              marginTop: 20,
            }}
          >
            <Form form={form} layout="vertical" onFinish={onFinish}>
              <Row gutter={16}>
                <Col span={12} style={{ padding: "0px 8px" }} md={12} xs={24}>
                  <Form.Item
                    name="name"
                    label="Full Name"
                    rules={[
                      {
                        required: true,
                        message: "Please enter your Full Name",
                      },
                    ]}
                  >
                    <Input
                      className="w-full p-2 rounded"
                      placeholder="Full Name"
                    />
                  </Form.Item>
                </Col>
                <Col span={12} style={{ padding: "0px 8px" }} md={12} xs={24}>
                  <Form.Item
                    name="email"
                    label={labelConfig.email}
                    rules={[
                      {
                        required: true,
                        message: "Please enter your Email",
                      },
                    ]}
                  >
                    <Input
                      className="w-full p-2 rounded"
                      placeholder={labelConfig.email}
                    />
                  </Form.Item>
                </Col>
                <Col span={12} style={{ padding: "0px 8px" }} md={12} xs={24}>
                  <Form.Item
                    name="companyName"
                    label={labelConfig.companyName}
                    rules={[
                      {
                        required: true,
                        message: "Please enter your Company Name",
                      },
                    ]}
                  >
                    <Input
                      className="w-full p-2 rounded"
                      placeholder={labelConfig.companyName}
                    />
                  </Form.Item>
                </Col>
                <Col span={12} style={{ padding: "0px 8px" }} md={12} xs={24}>
                  <Form.Item
                    name="service"
                    label={labelConfig.serviceInterested}
                  >
                    <Select style={{ height: 40 }} options={servicesOptions} />
                  </Form.Item>
                </Col>
                <Col span={24} style={{ padding: "0px 8px" }}>
                  <Form.Item name="message" label={labelConfig.message}>
                    <TextArea
                      className="w-full p-2 rounded"
                      placeholder={labelConfig.howCanWeHelpYou}
                    />
                  </Form.Item>
                </Col>
              </Row>

              <Row>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="font-semibold hover:bg-light-brown hover:border hover:text-dark-brown border-2 border-dark-brown text-dark-brown bg-dark-brown text-light-brown px-6 py-3 rounded-full transition duration-300 text-xs md:text-sm disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? "Sending..." : labelConfig.sendMessage}
                </button>
              </Row>
              <span className="text-sm text-slate-700 mt-3 inline-block">{result}</span>
            </Form>
          </Card>
        </div>

        <div className="text-center">
          <div className="flex justify-center gap-2 items-center">
            <Icon
              icon="line-md:phone-call-twotone-loop"
              width="36"
              style={{ color: "#A3613D" }}
            />
            <h2 className="text-2xl md:text-4xl my-14 font-bold text-slate-900">
              {labelConfig.whatOurClientsSay}
            </h2>
          </div>

          <Card
            style={{
              marginTop: 20,
            }}
          >
            <Carousel
              autoplay
              autoplaySpeed={5000}
              dots={true}
              dotsClass="slick-dots custom-dots"
            >
              <div>
                <h3
                  style={contentStyle}
                  className="flex flex-col text-sm md:text-lg justify-center items-center px-5 md:px-10"
                >
                  {labelConfig.michealGreyText}
                  <br />
                  <span className="text-lg mt-4 text-dark-brown">
                    - {labelConfig.michealGrey}
                  </span>
                </h3>
              </div>
              <div>
                <h3
                  style={contentStyle}
                  className="flex flex-col text-sm md:text-lg justify-center items-center px-5 md:px-10"
                >
                  {labelConfig.tijaniText} <br />
                  <span className="text-lg mt-4 text-dark-brown">
                    - {labelConfig.tijani}
                  </span>
                </h3>
              </div>
              <div>
                <h3
                  style={contentStyle}
                  className="flex flex-col text-sm md:text-lg justify-center items-center px-5 md:px-10"
                >
                  {labelConfig.gwenText} <br />
                  <span className="text-lg mt-4 text-dark-brown">
                    - {labelConfig.gwen}
                  </span>
                </h3>
              </div>
              <div>
                <h3
                  style={contentStyle}
                  className="flex flex-col text-sm md:text-lg justify-center items-center px-5 md:px-10"
                >
                  {labelConfig.tingText} <br />
                  <span className="text-lg mt-4 text-dark-brown">
                    - {labelConfig.ting}
                  </span>
                </h3>
              </div>
            </Carousel>
          </Card>
        </div>
      </div>
    </ConfigProvider>
  );
};

export default CTA;
