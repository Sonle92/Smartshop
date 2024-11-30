import React from "react";
import {
  Image,
  Table,
  Button,
  Popconfirm,
  Form,
  Input,
  message,
  Space,
  Modal,
  InputNumber,
  Select,
  Upload,
} from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

import { axiosClient } from "../../libraries/axiosClient";
import numeral from "numeral";

export default function Customer() {
  const [isPreview, setIsPreview] = React.useState(false);
  const [customer, setCustomer] = React.useState([]);
  const [selectedRecord, setSelectedRecord] = React.useState(null);
  const [refresh, setRefresh] = React.useState(0);
  const [editFormVisible, setEditFormVisible] = React.useState(false);

  const [file, setFile] = React.useState(null);
  const [createForm] = Form.useForm();
  const [updateForm] = Form.useForm();

  //code moi sua ,cap nhat ton kho
  const [totalQuantity, setTotalQuantity] = React.useState(0);
  const [totalCost, setTotalCost] = React.useState(0);

  React.useEffect(() => {
    axiosClient.get("/customer").then((response) => {
      setCustomer(response.data);

      // Calculate total quantity and total cost
      let quantity = 0;
      let cost = 0;

      response.data.forEach((customerItem) => {
        const cartItems = customerItem.cartItems || [];
        cartItems.forEach((item) => {
          if (customerItem.trangthai == "Giao hàng") {
            quantity += item.cartQuantity || 0;
          }
        });
        if (customerItem.trangthai == "Giao hàng") {
          cost += customerItem.tongtien || 0;
        }
      });

      setTotalQuantity(quantity);
      setTotalCost(cost);
    });
  }, [refresh]);
  //code moi sua ,cap nhat ton kho

  //TẠO BẢNG
  const columns = [
    {
      title: "Tên khách hàng",
      dataIndex: "fullname",
      key: "fullname",
      render: (text, record) => {
        return <strong>{record?.fullname}</strong>;
      },
      sorter: (a, b) => a.fullname.localeCompare(b.fullname),
    },
    {
      title: "Số điện thoại",
      dataIndex: "phone",
      key: "phone",
      render: (text) => {
        return <span>{text}</span>;
      },
      sorter: (a, b) => a.phone.localeCompare(b.phone),
    },
    {
      title: "Địa chỉ liên hệ",
      dataIndex: "address",
      key: "address",
      render: (text) => {
        return <span>{text}</span>;
      },
      sorter: (a, b) => a.address.localeCompare(b.address), 
    },
    {
      title: "Mặt hàng đã đặt",
      dataIndex: "cartItems",
      key: "cartItems",
      render: (text, record) => {
        const cartItems = record?.cartItems || [];
        const formattedCartItems = cartItems.map((item, index) => (
          <span key={index}>
            + {item.name} -SL({item.cartQuantity})
            <br />
            {index !== cartItems.length - 1 && ", "}
          </span>
        ));
        return <span>{formattedCartItems}</span>;
      },
    },
    {
      title: "Tổng số lượng sản phẩm",
      dataIndex: "tongsoluong",
      key: "tongsoluong",
      render: (text) => {
        return <span>{text}</span>;
      },
      sorter: (a, b) => a.tongsoluong - b.tongsoluong, 
    },
    {
      title: "Tổng thanh toán",
      dataIndex: "tongtien",
      key: "tongtien",
      render: (text) => {
        return <span>{numeral(text).format("0,0")}đ</span>;
      },
      sorter: (a, b) => a.tongtien - b.tongtien,
    },
    {
      title: "Trạng thái",
      dataIndex: "trangthai",
      key: "trangthai",
      render: (text) => {
        return <span>{text}</span>;
      },
      sorter: (a, b) => a.trangthai.localeCompare(b.trangthai),
    },
    {
      title: "",
      key: "action",
      render: (text, record) => {
        if (record.images) {
          return (
            <Button
              onClick={() => {
                console.log("selectedRecord", record);
                // setSelectedRecord(record);
              }}
            >
              Xem
            </Button>
          );
        }
        return <React.Fragment></React.Fragment>;
      },
    },
    {
      title: "",
      key: "actions",
      width: "1%",
      render: (text, record) => {
        return (
          <Space>
            {/*BUTTON XÓA DỮ LIỆU */}
            <Popconfirm
              style={{ width: 800 }}
              title="Are you sure to delete?"
              onConfirm={() => {
                const id = record._id;
                axiosClient
                  .delete("/customer/" + id)
                  .then((response) => {
                    message.success("Xóa thành công!");
                    setRefresh((f) => f + 1);
                  })
                  .catch((err) => {
                    message.error("Xóa bị lỗi!");
                  });
                console.log("DELETE", record);
              }}
              onCancel={() => {}}
              okText="Đồng ý"
              cancelText="Đóng"
            >
              <Button danger type="dashed" icon={<DeleteOutlined />} />
            </Popconfirm>
            {/*BUTTON UPDATE DỮ LIỆU */}
            <Button
              type="dashed"
              icon={<EditOutlined />}
              onClick={() => {
                setSelectedRecord(record);
                console.log("Selected Record", record);
                updateForm.setFieldsValue(record);
                setEditFormVisible(true);
              }}
            />
          </Space>
        );
      },
    },
  ];

  //lay du lieu
  React.useEffect(() => {
    axiosClient.get("/customer").then((response) => {
      setCustomer(response.data);
    });
  }, [refresh]);
  // POST DỮ LIỆU
  const onFinish = (values) => {
    axiosClient
      .post("/customer", values)
      .then((response) => {
        const { _id } = response.data;

        const formData = new FormData();
        formData.append("file", file);
      })
      .catch((err) => {
        message.error("Thêm mới bị lỗi!");
      });
  };
  const onFinishFailed = (errors) => {
    console.log("🐣", errors);
  };
  // UPDATE DỮ LIỆU
  const onUpdateFinish = (values) => {
    axiosClient
      .patch("/customer/" + selectedRecord._id, values)
      .then((response) => {
        message.success("Cập nhật thành công!");
        updateForm.resetFields();
        setRefresh((f) => f + 1);
        setEditFormVisible(false);
      })
      .catch((err) => {
        message.error("Cập nhật bị lỗi!");
      });
  };

  const onUpdateFinishFailed = (errors) => {
    console.log("🐣", errors);
  };

  return (
    <div>
      {/* FROM INPUT SẢN PHẨM */}

      <Table
        rowKey="_id"
        dataSource={customer}
        columns={columns}
        pagination={false}
      />
      <Modal
        centered
        open={editFormVisible}
        title="Cập nhật thông tin"
        onOk={() => {
          updateForm.submit();
        }}
        onCancel={() => {
          setEditFormVisible(false);
        }}
        okText="Lưu thông tin"
        cancelText="Đóng"
      >
        {/* FORM UPDATE SẢN PHẨM */}
        <Form
          form={updateForm}
          name="update-form"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ remember: true }}
          onFinish={onUpdateFinish}
          onFinishFailed={onUpdateFinishFailed}
          autoComplete="on"
        >
          <Form.Item
            label="Tên khách hàng"
            name="fullname"
            rules={[{ required: true, message: "Chưa nhập Tên khách hàng" }]}
            hasFeedback
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Số điện thoại"
            name="phone"
            rules={[{ required: true, message: "Chưa nhập Số điện thoại" }]}
            hasFeedback
          >
            <InputNumber style={{ minWidth: 300 }} />
          </Form.Item>

          <Form.Item label="Địa chỉ liên hệ" name="address">
            <Input />
          </Form.Item>
          <Form.Item
            label="Trạng thái"
            name="trangthai"
            rules={[{ required: true, message: "error" }]}
            hasFeedback
          >
            <Select
              options={[
                {
                  value: "Đã xác nhận",
                  label: "Đã xác nhận",
                },
                {
                  value: "Đang vận chuyển",
                  label: "Đang vận chuyển",
                },
                {
                  value: "Giao hàng",
                  label: "Giao hàng",
                },
                {
                  value: "Hủy bỏ",
                  label: "Hủy bỏ",
                },
                {
                  value: "Hoàn trả",
                  label: "Hoàn trả",
                },
                {
                  value: "Đã hoàn trả",
                  label: "Đã hoàn trả",
                },
              ]}
            />
          </Form.Item>
        </Form>
      </Modal>
      <div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "end",
            marginRight: "255px",
          }}
        >
          <div
            style={{
              position: "absolute",
              left: "300px",
              marginTop: "15px",
              fontSize: "20px",
            }}
          >
            TỔNG THU NHẬP
          </div>
          <div>
            <p>
              <span
                style={{
                  fontWeight: "blod",
                  color: "white",
                  position: "absolute",
                  left: "300px",
                }}
              ></span>{" "}
              {totalQuantity}
            </p>
          </div>
          <div>
            <p>
              <span
                style={{
                  marginLeft: "140px",
                  fontWeight: "blod",
                }}
              ></span>{" "}
              {numeral(totalCost).format("0,0")}đ
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
