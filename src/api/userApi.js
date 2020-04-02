import axios from 'axios'
import {message} from 'antd'

const showAllDataList = (_this)=>{
  axios.get('/api/user').then(function (response) {
    if(response.data.code===1001){
      console.log(response.data.userDataList);
      _this.setState({userDataList: response.data.userDataList})
    }
  })
  .catch(function (error) {
    console.log(error);
    message.error('列表内容显示错误,请联系管理员')
  });
}

const addUser = (_this,username,password)=>{
  axios.post(
    '/api/user', {username, password}
  ).then(function (response) {
    if(response.data.code===1001){
      message.success('添加成功')
    }else{
      message.error('添加失败')
    }
    _this.setState({confirmLoading: false, visible: false})
  })
  .catch(function (error) {
      message.success('未知错误,请联系管理员')
      console.log(error);
    _this.setState({confirmLoading: false, visible: false})
  });
}

const deleteUser = (id)=>{
  axios.delete(
    '/api/user', { data: {id: '123123'} }
  ).then(function (response) {
    if(response.data.code===1001){
      message.success('删除成功')
    }else{
      message.success('删除失败')
    }
  })
  .catch(function (error) {
      message.success('未知错误,请联系管理员')
      console.log(error);
  });
}

async function showAllDataListHook(setState) {
  try {
    const response = await axios.get('/api/user')
    if(response.data.code===1001){
      setState( response.data.userDataList)
    }
  } catch (error) {
    console.log(error);
    message.error('列表内容显示错误,请联系管理员')
  }
}

async function addUserHook(setState, username, password) {
  try {
    const response = await axios.post('/api/user', {username, password})
    if(response.data.code===1001){
      message.success('添加成功')
    }else{
      message.error('添加失败')
    }
  } catch (error) {
    message.success('未知错误,请联系管理员')
    console.log(error);
    setState({confirmLoading: false, visible: false})
  }
}

async function deleteUserHook(id='123123') {
  try {
    const response = await axios.delete('/api/user', { data: {id} });
    if(response.data.code===1001){
      message.success('删除成功')
    }else{
      message.success('删除失败')
    }
  } catch (error) {
    message.success('未知错误,请联系管理员')
    console.log(error);
  }
}

export {
  showAllDataList,
  addUser,
  deleteUser,
  showAllDataListHook,
  addUserHook,
  deleteUserHook
}