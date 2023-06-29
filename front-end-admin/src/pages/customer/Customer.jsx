import React from 'react';
import { Image, Table, Button, Popconfirm, Form, Input, message, Space, Modal, InputNumber, Select, Upload } from 'antd';
import { DeleteOutlined, EditOutlined, UploadOutlined } from '@ant-design/icons';

import { axiosClient } from '../../libraries/axiosClient';
import moment from 'moment';
import numeral from 'numeral';
import { API_URL } from '../../constants/URLS';
import axios from 'axios';

export default function Customer() {
  const [isPreview, setIsPreview] = React.useState(false);
  const [customer, setCustomer] = React.useState([]);
  const [selectedRecord, setSelectedRecord] = React.useState(null);
  const [refresh, setRefresh] = React.useState(0);


  const [file, setFile] = React.useState(null);
  const [createForm] = Form.useForm();
  const [updateForm] = Form.useForm();
  
  //TẠO BẢNG
  const columns = [
    {
        title: 'Tên khách hàng',
        dataIndex: 'fullname',
        key: 'fullname',
        render: (text, record) => {
          return <strong>{record?.fullname}</strong>;
        },
    },
    {
      title: 'Số điện thoại',
      dataIndex: 'phone',
      key: 'phone',
      render: (text) => {
        return <span>{text}</span>;
      },
    },
    {
      title: 'Địa chỉ liên hệ',
      dataIndex: 'address',
      key: 'address',
      render: (text) => {
        return <span>{text}</span>;
      },
    },
    {
      title: 'Tổng số lượng sản phẩm',
      dataIndex: 'tongsoluong',
      key: 'tongsoluong',
      render: (text) => {
        return <span>{text}</span>;
      },
    },
    {
      title: 'Tổng thanh toán',
      dataIndex: 'tongtien',
      key: 'tongtien',
      render: (text) => {
        return <span>{numeral(text).format('0,0')}đ</span>;
      },
    },
    {
      title: '',
      key: 'action',
      render: (text, record) => {
        if (record.images) {
          return (
            <Button
              onClick={() => {
                console.log('selectedRecord', record);
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
      title: '',
      key: 'actions',
      width: '1%',
      render: (text, record) => {
        return (
          <Space>
            {/*BUTTON XÓA DỮ LIỆU */}
            <Popconfirm
              style={{ width: 800 }}
              title='Are you sure to delete?'
              onConfirm={() => {
                const id = record._id;
                axiosClient
                  .delete('/product/' + id)
                  .then((response) => {
                    message.success('Xóa thành công!');
                    setRefresh((f) => f + 1);
                  })
                  .catch((err) => {
                    message.error('Xóa bị lỗi!');
                  });
                console.log('DELETE', record);
              }}
              onCancel={() => {}}
              okText='Đồng ý'
              cancelText='Đóng'
            >
              <Button danger type='dashed' icon={<DeleteOutlined />} />
            </Popconfirm>
             {/*BUTTON UPDATE DỮ LIỆU */}
            <Button
              type='dashed'
              icon={<EditOutlined />}
              onClick={() => {
                setSelectedRecord(record);
                console.log('Selected Record', record);
                updateForm.setFieldsValue(record);
            
              }}
            />
            {/*BUTTON UPLOAD ẢNH */}
            <Upload
              showUploadList={false}
              name='file'
              action={API_URL + '/upload/products/' + record._id}
              headers={{ authorization: 'authorization-text' }}
              onChange={(info) => {
                if (info.file.status !== 'uploading') {
                  console.log(info.file, info.fileList);
                }

                if (info.file.status === 'done') {
                  message.success(`${info.file.name} file uploaded successfully`);

                  setRefresh((f) => f + 1);
                } else if (info.file.status === 'error') {
                  message.error(`${info.file.name} file upload failed.`);
                }
              }}
            >
              <Button icon={<UploadOutlined />} />
            </Upload>
          </Space>
        );
      },
    },
  ];

 
//lay du lieu
  React.useEffect(() => {
    axiosClient.get('/customer').then((response) => {
      setCustomer(response.data);
      // console.log(response.data);
    });
  }, [refresh]);
// POST DỮ LIỆU
  const onFinish = (values) => {
    axiosClient
      .post('/product', values)
      .then((response) => {
        const { _id } = response.data;

        const formData = new FormData();
        formData.append('file', file);
//POST ẢNH
        axios
          .post(API_URL + '/upload/products/' + _id, formData)
          .then((respose) => {
            message.success('Thêm mới thành công!');
            createForm.resetFields();
            setRefresh((f) => f + 1);
          })
          .catch((err) => {
            message.error('Upload file bị lỗi!');
          });
      })
      .catch((err) => {
        message.error('Thêm mới bị lỗi!');
      });
  };
  const onFinishFailed = (errors) => {
    console.log('🐣', errors);
  };
// UPDATE DỮ LIỆU
  const onUpdateFinish = (values) => {
    axiosClient
      .patch('/product/' + selectedRecord._id, values)
      .then((response) => {
        message.success('Cập nhật thành công!');
        updateForm.resetFields();
        setRefresh((f) => f + 1);
       
      })
      .catch((err) => {
        message.error('Cập nhật bị lỗi!');
      });
  };

  const onUpdateFinishFailed = (errors) => {
    console.log('🐣', errors);
  };

  

  return (
    <div>
      {/* FROM INPUT SẢN PHẨM */}
      
      <Table rowKey='_id' dataSource={customer} columns={columns} pagination={false} />
      <Modal
        centered
        title='Cập nhật thông tin'
        onOk={() => {
          updateForm.submit();
        }}
        onCancel={() => {
        
        }}
        okText='Lưu thông tin'
        cancelText='Đóng'
      >
      </Modal>
    </div>
  );
}
