import React from 'react';
import Layout from './hoc/Layout/Layout'
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder'
import Logout from './containers/Auth/Logout/Logout';
import {Switch, Route, withRouter, Redirect} from 'react-router-dom'
import { connect } from 'react-redux';
import * as actions from './store/actions/index';
import asyncComponent from './hoc/asyncComponent/asyncComponent';

const asyncCheckout = asyncComponent(() => {
  return import('./containers/checkout/Checkout')
})
const asyncOrders = asyncComponent(() => {
  return import('./containers/Orders/Orders');
});

const asyncAuth = asyncComponent(() => {
  return import('./containers/Auth/Auth');
});

class  App extends React.Component {
  componentDidMount(){
    this.props.onTrySignIn()
  }
  render(){
    let routes = (
                <Switch>
                  <Route path="/authenticate" component={asyncAuth} />
                  <Route path="/" exact component={BurgerBuilder}/>
                  <Redirect to="/" />
                </Switch>
              )
    if(this.props.isAuth){
      routes = (
                <Switch>
                  <Route path="/" exact component={BurgerBuilder}/>
                  <Route path="/orders" component={asyncOrders} />
                  <Route path="/checkout" component={asyncCheckout} />
                  <Route path="/authenticate" component={asyncAuth} />
                  <Route path="/logout" component={Logout} />
                  <Redirect to="/" />
               </Switch>
               )
    }
      return (
        <div className="App">
          <Layout>
              {routes}
          </Layout>
        </div>
      );
  }
  }
const mapStateToProps = (state) => {
  return {
    isAuth: state.auth.token !== null
  }
}
const mapDispatchToProps = dispatch => {
  return {
    onTrySignIn : () => {
      dispatch(actions.authCheckState())
    }
  }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
