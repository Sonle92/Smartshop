import React from "react";
import {
  Table,
  Form,
  Input,
  Button,
  Popconfirm,
  message,
  Space,
  notification,
  Upload,
  Modal,
  Layout,
} from "antd";
import {
  DeleteOutlined,
  EditOutlined,
  UploadOutlined,
} from "@ant-design/icons";
// import "antd/dist/antd.css";
import axios from "axios";
import { API_URL } from "../../constants/URLS";
import { axiosClient } from "../../libraries/axiosClient";

export default function ListSp() {
  const [categories, setcategories] = React.useState([]);
  const [refresh, setRefresh] = React.useState(0);
  const [newform] = Form.useForm(); //bien new form
  const [formEdit] = Form.useForm();
  const [selectedRow, setSelectedRow] = React.useState(null);
  const [visible, setVisible] = React.useState(false);
  //khi them thi tu reload lai trang
  const columns = [
    {
      title: "Tên Danh Mục",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "",
      key: "delete",
      render: (text, record, index) => {
        return (
          <Space>
            <Button
              type="dashed"
              icon={<EditOutlined />}
              style={{ fontWeight: "600" }}
              onClick={() => {
                setVisible(true);
                setSelectedRow(record);
                formEdit.setFieldValue("name", record.name);
                formEdit.setFieldValue("description", record.description);
              }}
            />
            <Popconfirm
              overlayInnerStyle={{ width: 300 }}
              okText="Đồng ý"
              cancelText="Đóng"
              title="Are you sure?"
              onConfirm={() => {
                const { _id } = record;
                axios
                  .delete("http://localhost:7000/category/" + _id)
                  .then((response) => {
                    if (response.status === 200) {
                      setRefresh((f) => f + 1);
                      message.info("Xóa thành công");
                    }
                  });
              }}
            >
              <Button
                danger
                type="dashed"
                icon={<DeleteOutlined />}
                style={{ fontWeight: "600" }}
                onClick={() => {}}
              ></Button>
            </Popconfirm>
          </Space>
        );
      },
    },
  ];
  React.useEffect(() => {
    //lay du lieu data tu nodejs
    axiosClient.get(API_URL + "/category").then((response) => {
      // console.log(response.data);
      setcategories(response.data);
    });
  }, [refresh]);
  return (
    <div style={{ padding: 24, marginTop: "50px" }}>
      <Layout>
        <Layout.Content style={{ padding: 24 }}>
          <Form
            form={newform}
            name="create"
            labelCol={{
              span: 8,
            }}
            wrapperCol={{
              span: 16,
            }}
            initialValues={{
              name: "",
              description: "",
            }}
            onFinish={(values) => {
              axios
                .post("http://localhost:7000/category", values)
                .then((response) => {
                  message.success("Thêm mới thành công!");
                  newform.resetFields();
                  setRefresh((f) => f + 1);
                })
                .catch((error) => {
                  console.log(error);
                });
            }}
            onFinishFailed={(error) => {
              console.error(error);
            }}
            autoComplete="off"
          >
            <Form.Item
              label="Tên danh mục"
              name="name"
              hasFeedback
              rules={[
                {
                  required: true,
                  message: "Tên danh mục: Chưa nhập",
                },
              ]}
            >
              <Input style={{ width: 300 }} />
            </Form.Item>
            <Form.Item
              wrapperCol={{
                offset: 8,
                span: 16,
              }}
            >
              <Button type="primary" htmlType="submit">
                Lưu thông tin
              </Button>
            </Form.Item>
          </Form>
          <Table
            rowKey="_id"
            columns={columns}
            dataSource={categories}
            pagination={false}
          />

          <Modal
            title="Chỉnh sửa thông tin danh mục"
            open={visible}
            onOk={() => {
              formEdit.submit();
            }}
            onCancel={() => {
              setVisible(false);
            }}
          >
            <Form
              form={formEdit}
              name="edit"
              labelCol={{
                span: 8,
              }}
              wrapperCol={{
                span: 16,
              }}
              initialValues={{
                name: "",
                description: "",
              }}
              onFinish={(values) => {
                // SUBMIT
                axios
                  .patch(
                    "http://localhost:7000/category/" + selectedRow._id,
                    values
                  )
                  .then((response) => {
                    if (response.status === 200) {
                      setRefresh((f) => f + 1);
                      setVisible(false);
                    }
                  });
                console.log(values);
              }}
              onFinishFailed={(error) => {
                console.error(error);
              }}
              autoComplete="off"
            >
              <Form.Item
                label="Tên danh mục"
                name="name"
                hasFeedback
                rules={[
                  {
                    required: true,
                    message: "Tên danh mục: Chưa nhập",
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Form>
          </Modal>
        </Layout.Content>
      </Layout>
    </div>
  );
}
