import React,{Component,Fragment} from 'react';
import Admin from './pages/Admin'
import Login from './pages/Login'
import Error from './pages/Error'
import { HashRouter, Route, Switch, Redirect } from 'react-router-dom'

class App extends Component {

  render(){
    return (
      <Fragment>
        <HashRouter>
          <Switch>
            <Redirect exact from="/" to='/admin' />
            <Route path='/admin' component={Admin} />
            <Route path='/login' component={Login} />
            <Route path='/404' component={Error} />
          </Switch>
        </HashRouter>
      </Fragment>
    )
  }
}

export default App;
