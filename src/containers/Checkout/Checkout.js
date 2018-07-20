import React, { Component } from 'react';
import CheckoutSummery from '../../components/Order/CheckoutSummery/CheckoutSummery';

class Checkout extends Component {
    state = {
        ingredients: {
            salad:    1,
            cheese:   1,
            mushroom: 1,
            meat:     1
        }
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
            </div>
        );
    }
}

export default Checkout;