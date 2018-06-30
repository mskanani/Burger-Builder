import React, {Component} from 'react';
import Aux from '../../../hoc/Aux';
import Button from '../../UI/Button/Button';

class OrderSummery extends Component {
    // This could be a functional component - should update is handled in its wrapper (Modal)
    componentWillUpdate() {
        console.log('[OrderSummery] will update');
    }

    render() {
        const ingredientSummery = Object.keys(this.props.ingredients)
        .map(igKey => {
            return (
                <li key={igKey}>
                     <span style={{textTransform: 'capitlize'}}>{igKey}</span> : {this.props.ingredients[igKey]} 
                </li>
            );
        }); 
        return (
            <Aux>
                <h3>Your Order</h3>
                <p>A delecious with the following ingredients:</p>
                <ul>
                    {ingredientSummery}
                </ul>
                <p><strong>Total Price: ${this.props.price.toFixed(2)}</strong></p>
                <p>Continue to Checkout?</p>
                <Button clicked={this.props.purchaseCanceled} btnType="Danger">Cancel</Button>
                <Button clicked={this.props.purchaseContinued} btnType="Success">Continue</Button>
            </Aux>
        );
    }
}

export default OrderSummery;