import React, { useState, useEffect } from 'react';
import { Button, Form, Input, Table, Drawer, Switch, InputNumber, Upload, Tag } from 'antd';
import {showAllDataList, addGoods, deleteGoods, changeSoldState} from '../../api/goodsApi.js'
import { UploadOutlined } from '@ant-design/icons';

const { TextArea } = Input;

const DrawerCreateForm = ({visible, onClose, onCreate, onCreateError, })=>{

  // Upload 的FromItem 必须的方法
  function onFileChange(e){
    if(e.fileList.length>1){ //只允许上传一个
      e.fileList.shift()
    }
    if (Array.isArray(e)) {
      console.log('isArray:', e);
      return e;
    }
    return e && e.fileList; //e.fileList返回什么显示什么
  }

  //Upload组件的属性
  const uploadProps = {
    action: "/api",
    listType: "picture",
    onPreview: (file)=>{ },
    onChange: ({file,fileList})=>{},
    onRemove: (file)=>{ },
    beforeUpload: (file)=>{ //上传之前的钩子，返回false表示阻止上传到服务器，只在页面上显示
      return false
    }
  }

  //Upload上级FormItem组件的属性
  const uploadFormItemProps = {
    name: "img",
    label: "上传商品图片",
    valuePropName: "fileList",
    rules: [{ required: true, message: '请上传商品图片' }],
    getValueFromEvent: onFileChange,
  }

  return(
    <Drawer
      visible={visible}
      onClose={onClose}
      closable={false}
      placement='left'
      width='500'
    >
      <h1 style={{marginBottom: 30}}>商品添加</h1>
      <Form
        layout="vertical"
        name="basic" 
        initialValues={{price: 120, putaway: true, unit: '箱', name:'旺仔牛奶', describe: '旺仔牌罐装牛奶 250ml/瓶'}} 
        onFinish={onCreate} 
        onFinishFailed={onCreateError}
      >
        <Form.Item 
          label="商品名称" 
          name="name"
          style={{width:'300px'}}
          rules={[{ required: true, message: '请填写商品名称' }]}
        >
          <Input
            placeholder="Please fill in the name of the goods" 
          />
        </Form.Item>

        <Form.Item 
          label="商品价格" 
          name="price"
          rules={[{ required: true, message: '请填写商品价格' }]}
        >
          <InputNumber/>
        </Form.Item>

        <Form.Item {...uploadFormItemProps}>
          <Upload {...uploadProps}>
            <Button>
              <UploadOutlined /> 点击上传商品图片
            </Button>
          </Upload>
        </Form.Item>

        <Form.Item 
          label="商品描述" 
          name="describe"
          rules={[{ required: true, message: '请填写商品描述' }]}
        >
          <TextArea 
            placeholder="Please fill in the description" 
            autoSize={{ minRows: 3, maxRows: 5 }}
            style={{resize: 'none'}}
          />
        </Form.Item>

        <Form.Item 
          label="商品单位" 
          name="unit"
          rules={[{ required: true, message: '请填写商品单位' }]}
        >
          <Input
            maxLength={1}
            style={{width:'200px'}}
          />
        </Form.Item>

        <Form.Item 
          label="是否上架" 
          name="putaway"
          valuePropName='checked'
        >
          <Switch 
            checkedChildren="是" 
            unCheckedChildren="否" 
          />
        </Form.Item>

        <Form.Item>
          <Button htmlType="submit" type='primary'>添加商品</Button>
        </Form.Item>
      </Form>
    </Drawer>
  )
}

const CollectionsPage = () => {
  const [visible, setVisible] = useState(false);
  const [dataSource,setDataSource] = useState([])
  const [loading,setLoading] = useState(false)
  const [columns] = useState([
    {
      title: '_id',
      dataIndex: '_id',
      key: '_id',
      align: 'center',
      width: 250
    },
    {
      title: '商品名称',
      dataIndex: 'name',
      key: 'name',
      align: 'center',
      width: 150,
    },
    {
      title: '商品价格',
      dataIndex: 'price',
      key: 'price',
      align: 'center',
      width: 150,
    },
    {
      title: '商品图片',
      key: 'img',
      dataIndex: 'img',
      align: 'center',
      width: 150,
      render: (img)=>{
        return (
          <img src={img} alt="img" style={{height: '100%'}}/>
        )
      }
    },
    {
      title: '商品描述',
      dataIndex: 'describe',
      key: 'describe',
      align: 'center',
      width: 500,
    },
    {
      title: '单位',
      dataIndex: 'unit',
      key: 'unit',
      align: 'center',
      width: 150,
    },
    {
      title: '标签',
      key: 'tags',
      align: 'center',
      width: 150,
      render: (text)=>{
        let putaway = text.putaway;
        return (
          <Tag color={putaway?'lightblue':'lightcoral'} key={putaway}>
            {putaway?'上架':'下架'}
          </Tag>
        );
      }
    },
    {
      title: '操作商品',
      key: 'action',
      align: 'center',
      width: 150,
      render: (text, record) => (
        <div>
          <Button type="link" size={'small'} onClick={()=>{changeSoldState(text._id)}}>上/下架商品</Button>
          <Button type="link" size={'small'} onClick={()=>{deleteGoods(text._id)}}>删除商品</Button>
        </div>
      ),
    },
  ])

  const onCreate = values => {
    addGoods(values)
    setVisible(false);
  };

  const onCreateError = errorInfo => {
    console.log('Failed:', errorInfo);
  }

  useEffect(() => {
    showAllDataList(setDataSource,setLoading)
  },[]);

  return (
    <div>
      <h3 style={{ marginBottom: 16 }}>商品管理</h3>
      <Button
        style={{ marginBottom: 16 }}
        type="primary"
        onClick={() => {
          setVisible(true);
        }}
      >
        添加一个商品
      </Button>

      <DrawerCreateForm
        visible={visible}
        onClose={() => {
          setVisible(false);
        }}
        onCreate={onCreate}
        onCreateError={onCreateError}
      >
      </DrawerCreateForm>
      
      <Table 
        dataSource={dataSource} 
        columns={columns}
        bordered='true'
        pagination={{pageSize: 5, position: 'bottomCenter' }}
        size= 'middle'
        loading={loading}
      >
      </Table>
    </div>
  );
};

export default CollectionsPage