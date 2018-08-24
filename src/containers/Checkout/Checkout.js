import React, { Component } from 'react';
import CheckoutSummery from '../../components/Order/CheckoutSummery/CheckoutSummery';
import { Route, Redirect } from 'react-router-dom';
import ContactData from './ContactData/ContactData';

import { connect } from 'react-redux';

class Checkout extends Component {
    checkoutCancelledHandler = () => {
        // Since this component was loaded through the route component, we have access to history...etc
        this.props.history.goBack();
    }

    checkoutContinuedHandler = () => {
        this.props.history.replace('checkout/contact-data');
    }

    render() {
        let summary = <Redirect to="/" />
        if(this.props.ings) {
            summary = (
                <div>
                    <CheckoutSummery 
                        ingredients={this.props.ings} 
                        checkoutCancelled={this.checkoutCancelledHandler}
                        checkoutContinued={this.checkoutContinuedHandler} />
                    <Route path={this.props.match.path + '/contact-data'} component={ContactData}  />
                </div>
            );
        }
        return summary;
    }
}

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients
    }
};

export default connect(mapStateToProps)(Checkout);