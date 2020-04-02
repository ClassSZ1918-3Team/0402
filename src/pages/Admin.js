import React from 'react'
import {Layout, Menu, Breadcrumb} from 'antd'
import '../style/common.less'
import {
  PieChartOutlined,
  HomeOutlined,
  UserOutlined,
  EnvironmentOutlined,
  KeyOutlined
} from '@ant-design/icons';
import AdminRouterView from '../router/adminRouter'
import { Link } from 'react-router-dom'
import logo from '../img/logo1.png'

const { Header, Footer, Sider, Content } = Layout;

export default class Admin extends React.Component {
  state = {
    selectedKeys: '0',
    collapsed: false,
    breadcrumb: [],
    slideList: [
      {icon: <HomeOutlined />, value: '首页', to: '/admin/'},
      {icon: <UserOutlined />, value: '管理员管理', to: '/admin/user'},
      {icon: <UserOutlined />, value: '商品管理', to: '/admin/goods'},
      {icon: <EnvironmentOutlined />, value: '城市管理', to: '/admin/city'},
      {icon: <PieChartOutlined />, value: '订单管理', to: '/admin/order'},
      {icon: <KeyOutlined />, value: '车辆地图', to: '/admin/bike'},
    ]
  }
  
  static getDerivedStateFromProps(props,state){
    let pathname = props.location.pathname
    state.breadcrumb = pathname.split('/')
    for (var i = 0; i < state.slideList.length; i++) {
      if (state.slideList[i].to.indexOf(pathname) !== -1) {
        state.selectedKeys = String(i)
        break;
      }
    }
    return null
  }

  onCollapse = (collapsed)=>{
    this.setState({collapsed})
  }

  onClickLogOut(){
    console.log('清空登录状态,退出登录');
  }

  render(){
    return (
      <Layout>
        <Sider collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse}>
          <Link className="brand" to='/'>
            <img src={logo} alt="logo"/>
            {this.state.collapsed||<span>V2Gon管理系统</span>}
          </Link>
          <Menu theme="dark" defaultSelectedKeys={[this.state.selectedKeys]} mode="inline">
            {this.state.slideList.map((item,index)=>{
              return (
                <Menu.Item key={index}>
                  <Link to={item.to}>
                    {item.icon}
                    <span>{item.value}</span>
                  </Link>
                </Menu.Item>
              )
            })}
          </Menu>
        </Sider>

        <Layout className="site-layout">
          <Header className="site-layout-background">
            <div className='login-user'>
              <span>超级管理员 V2Gon</span>
              <Link to='/login' onClick={this.onClickLogOut.bind(this)}>
                退出
              </Link>
            </div>
            <div>
              <span>XX后台管理系统 v.1.0.0</span>
            </div>
          </Header>

          <Content>
            <Breadcrumb>
              {
                this.state.breadcrumb.map((item,index)=>{
                  if(item){
                    return <Breadcrumb.Item key={index}>{item}</Breadcrumb.Item>
                  }
                  return null
                })
              }
            </Breadcrumb>
            <div className="site-layout-background">
              <AdminRouterView/>
            </div>
          </Content>

          <Footer>
            Ant Design ©2018 Created by Ant UED
          </Footer>
        </Layout>
      </Layout>
    )
  }
}
