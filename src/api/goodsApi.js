import axios from 'axios'
import {message} from 'antd'

async function showAllDataList(setDataSource,setLoading) {
  try {
    setLoading(true)
    const response = await axios.get('/api/goods')
    if(response.data.code===2001){
      setDataSource( response.data.goodsDataList)
    }
    setLoading(false)
  } catch (error) {
    console.log(error);
    message.error('列表内容显示错误,请联系管理员')
  }
}

async function addGoods(values) {
  console.log('addGoodsApi:',values);
  try {
    const response = await axios.post('/api/goods', {...values,img:(values.img)[0].thumbUrl})
    if(response.data.code===2001){
      message.success('添加成功')
    }else{
      message.error('添加失败')
    }
  } catch (error) {
    message.success('未知错误,请联系管理员')
    console.log(error);
  }
}

async function deleteGoods(id) {
  console.log('deleteGoodsApi:',id);
  try {
    const response = await axios.delete('/api/goods', { data: {id} });
    if(response.data.code===2001){
      message.success('删除成功')
    }else{
      message.error('删除失败')
    }
  } catch (error) {
    message.success('未知错误,请联系管理员')
    console.log(error);
  }
}

async function changeSoldState(id) {
  console.log('changeSoldStateApi:',id);
  try {
    const response = await axios.put('/api/goods/sold', { data: {id} });
    if(response.data.code===2001){
      message.success('修改成功')
    }else{
      message.error('修改失败')
    }
  } catch (error) {
    message.success('未知错误,请联系管理员')
    console.log(error);
  }
}

export {
  showAllDataList,
  addGoods,
  deleteGoods,
  changeSoldState
}