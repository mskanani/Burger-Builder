import React, { Component } from 'react';
import CheckoutSummery from '../../components/Order/CheckoutSummery/CheckoutSummery';
import { Route } from 'react-router-dom';
import ContactData from './ContactData/ContactData';

class Checkout extends Component {
    state = {
        ingredients: null,
        totalPrice: 0
    }

    componentWillMount() { //We use WillMount, so before we render the child component
        const query = new URLSearchParams(this.props.location.search);
        const ingredients = {};
        let price = 0;
        //console.log(query.entries());
        for(let param of query.entries()) { //for of not for in
            // each param is like ['','']
            if(param[0] === 'price') {
                price = param[1];
            } else {
                ingredients[param[0]] = +param[1]; //the + to convert the string to number
            }
        }
        console.log(price+'1'); 
        this.setState({ ingredients: ingredients, totalPrice: price });
    }

    checkoutCancelledHandler = () => {
        // Since this component was loaded through the route component, we have access to history...etc
        this.props.history.goBack();
    }

    checkoutContinuedHandler = () => {
        this.props.history.replace('checkout/contact-data');
    }

    render() {
        return(
            <div>
                <CheckoutSummery 
                    ingredients={this.state.ingredients} 
                    checkoutCancelled={this.checkoutCancelledHandler}
                    checkoutContinued={this.checkoutContinuedHandler} />

                <Route path={this.props.match.path + '/contact-data'} render={(props) => (<ContactData ingredients={this.state.ingredients} price={this.state.totalPrice} {...props} />)} /> { /* Since we are rendering ContactData manualy (using render not component) we can pass props to it */ }   
            </div>
        );
    }
}

export default Checkout;