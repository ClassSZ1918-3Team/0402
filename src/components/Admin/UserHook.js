import React, { useState, useEffect } from 'react';
import { Button, Modal, Form, Input, Table } from 'antd';
import {showAllDataListHook, addUserHook, deleteUserHook} from '../../api/userApi.js'

const CollectionCreateForm = ({ visible, onCreate, onCancel }) => {
  const [form] = Form.useForm();
  return (
    <Modal
      visible={visible}
      title="添加管理员用户"
      okText="添加"
      cancelText="取消"
      onCancel={onCancel}
      onOk={() => {
        form
          .validateFields()
          .then(values => {
            form.resetFields();
            onCreate(values);
          })
          .catch(info => {
            console.log('Validate Failed:', info);
          });
      }}
    >
      <Form
        form={form}
        layout="vertical"
        name="form_in_modal"
      >
        <Form.Item
          name="username"
          label="输入后台管理员账号"
          rules={[
            {
              required: true,
              message: '请输入账号',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item 
          name="password"
          label="输入后台管理员密码"
          rules={[
            {
              required: true,
              message: '请输入密码',
            },
          ]}
        >
          <Input type="password" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

const CollectionsPage = () => {
  const [visible, setVisible] = useState(false);
  const [dataSource,setDataSource] = useState([])
  const [columns] = useState([
    {
      title: '_id',
      dataIndex: '_id',
      key: '_id',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <div>
          <Button type="link" size={'small'} onClick={()=>{deleteUserHook(text._id)}}>Delete</Button>
        </div>
      ),
    },
  ])

  const onCreate = values => {
    const {username, password} = values
    addUserHook(setDataSource, username, password)
    console.log('Received values of form: ', values);
    setVisible(false);
  };

  useEffect(() => {
    showAllDataListHook(setDataSource)
  },[]);

  return (
    <div>
      <h3 style={{ marginBottom: 16 }}>管理员管理</h3>
      <Button
        style={{ marginBottom: 16 }}
        type="primary"
        onClick={() => {
          setVisible(true);
        }}
      >
        添加一个管理员用户
      </Button>

      <CollectionCreateForm
        visible={visible}
        onCreate={onCreate}
        onCancel={() => {
          setVisible(false);
        }}
      />

      <Table 
        dataSource={dataSource} 
        columns={columns}
        bordered='true'
        pagination={{pageSize: 5, position: 'bottomCenter' }}
      />
    </div>
  );
};

export default CollectionsPage