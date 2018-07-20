import React, { Component } from 'react';
import CheckoutSummery from '../../components/Order/CheckoutSummery/CheckoutSummery';
import { Route } from 'react-router-dom';
import ContactData from './ContactData/ContactData';

class Checkout extends Component {
    state = {
        ingredients: {
            salad:    1,
            cheese:   1,
            mushroom: 1,
            meat:     1
        }
    }

    componentDidMount() {
        const query = new URLSearchParams(this.props.location.search);
        const ingredients = {};
        //console.log(query.entries());
        for(let param of query.entries()) { //for of not for in
            // each param is like ['','']
            ingredients[param[0]] = +param[1]; //the + to convert the string to number
        }
        //console.log(ingredients); 
        this.setState({ ingredients: ingredients });
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

                <Route path={this.props.match.path + '/contact-data'} component={ContactData} />    
            </div>
        );
    }
}

export default Checkout;