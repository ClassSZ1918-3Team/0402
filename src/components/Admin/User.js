import React from 'react'
import { Table, Button, Modal, Form, Input  } from 'antd';
import {showAllDataList, addUser, deleteUser} from '../../api/userApi.js'

export default class User extends React.Component {
  state = {
    userDataList: [],
    columns: [
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
            {/* {console.log(text,record)} */}
            <Button type="link" size={'small'} >Update</Button>
            <Button type="link" size={'small'} onClick={deleteUser.bind(this)}>Delete</Button>
          </div>
        ),
      },
    ],
    visible: false,
    confirmLoading: false
  }

  componentDidMount(){
    showAllDataList(this)
  }

  showModal(){
    this.setState({visible: true})
  }

  handleOk(){
    this.setState({confirmLoading: true})
    const refs = this.refs
    addUser(this, refs.us.props.value, refs.ps.props.value)
  }

  handleCancel(){
    this.setState({visible: false})
  }

  render (){
    return (
      <div>
        <h3 style={{ marginBottom: 16 }}>管理员管理</h3>
        <Button style={{marginBottom: 16}} type="primary" onClick={this.showModal.bind(this)}>Add User</Button>
        
        <Modal
          title="添加一个用户"
          visible={this.state.visible}
          confirmLoading={this.state.confirmLoading}
          onOk={this.handleOk.bind(this)}
          onCancel={this.handleCancel.bind(this)}
        >
          <Form>
            <Form.Item label="Username" name="username" >
              <Input ref='us'/>
            </Form.Item>
            <Form.Item label="Password" name="password" >
              <Input.Password ref='ps'/>
            </Form.Item>
          </Form>
        </Modal>

        <Table 
          dataSource={this.state.userDataList} 
          pagination={{ position: ['bottomLeft'], pageSize: 5 }}
          columns={this.state.columns} 
          bordered='true'
        />

      </div>
    )
  }
}