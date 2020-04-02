import React from "react";
import {
  Switch,
  Route
} from "react-router-dom";
import Index from '../components/Admin/Index'
// import User from '../components/Admin/User'
import User from '../components/Admin/UserHook'
import City from '../components/Admin/City'
import Order from '../components/Admin/Order'
import Bike from '../components/Admin/Bike'
import Goods from '../components/Admin/Goods'

export default class AdminRouter extends React.Component {
  render (){
    return (
      <Switch>
        <Route path="/admin/goods">
          <Goods />
        </Route>
        <Route path="/admin/bike">
          <Bike />
        </Route>
        <Route path="/admin/order">
          <Order />
        </Route>
        <Route path="/admin/city">
          <City />
        </Route>
        <Route path="/admin/user">
          <User />
        </Route>
        <Route path="/admin/">
          <Index />
        </Route>
      </Switch>
    )
  }
}