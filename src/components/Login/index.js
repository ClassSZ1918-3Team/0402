import React from 'react'
import { Form, Input, Button, Checkbox, message } from 'antd';
import axios from 'axios'
export default class Index extends React.Component {

  render(){
    return (
      <div className='container'>
        <div className="wrap">
          <Form 
            name="basic" 
            initialValues={{ remember: true }} 
            onFinish={this.onFinish.bind(this)} 
            onFinishFailed={this.onFinishFailed.bind()}
            
          >

            <Form.Item 
              label="Username" 
              name="username"
              rules={[{ required: true, message: 'Please input your username!' }]}
            >
              <Input/>
            </Form.Item>

            <Form.Item 
              label="Password" 
              name="password"
              rules={[{ required: true, message: 'Please input your password!' }]}
            >
              <Input.Password/>
            </Form.Item>

            <Form.Item name="remember" valuePropName="checked">
              <Checkbox>Remember me</Checkbox>
            </Form.Item>
            <Form.Item>
              <Button htmlType="submit">Submit</Button>
            </Form.Item>

          </Form>
        </div>
      </div>
    )
  }

  onFinish = values => {
    let username = values.username
    let password = values.password
    axios.post(
      '/api/login',
      {username, password}
    ).then((response)=>{
      if(response.data.code===1001){
        message.success('登录成功,页面跳转中')
        setTimeout(() => {
          window.location = '/#admin'
        }, 3000);
      }else{
        message.error('账号或密码错误')
      }

    }).catch((error)=>{
      console.log(error);
    })
  }

  onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  }

}