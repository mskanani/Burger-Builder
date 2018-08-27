import React, { Component } from 'react';
import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';
import { Route, Switch } from 'react-router-dom';
import Orders from './containers/Orders/Orders';
import Auth from './containers/Auth/Auth';

class App extends Component {
  /*state = {
    show: true
  }

  componentDidMount() {
    setTimeout((() => {
      this.setState({
        show: false
      });
    }), 5000);
  } */

  render() {
    return (
      <Layout>
          <Switch>
            <Route path="/checkout" component={Checkout} />
            <Route path="/orders" component={Orders} />
            <Route path="/auth" component={Auth} />
            <Route path="/" exact component={BurgerBuilder} />
          </Switch>
          { /* By defaul / is treat me as a prefix standard so both will load if we don't use exact attribute or the switch component.. in case of using switch without exact, the order of the components matters */ }
      </Layout>
    );
  }
}

export default App;
