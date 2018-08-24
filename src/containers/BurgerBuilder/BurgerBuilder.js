import React, {Component} from 'react';

import { connect } from 'react-redux';
import * as BurgerBuilderActions from '../../store/actions/index';

import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummery from '../../components/Burger/OrderSummery/OrderSummery';
import Spinner from '../../components/UI/Spinner/Spinner'; 
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'; //starting with lower case character because we are not going to use it in JSX
import axios from '../../axios-orders';


class BurgerBuilder extends Component {
    // constructor(props) {
    //     super(props);
    //     this.state = {
    //        ...
    //     }
    // }
    state = {
        purchasing: false,
    }

    componentDidMount() {
        console.log(this.props);
        this.props.onInitIngredients();
    }

    updatePurchaseStateHandler(ingredients) {
        const sum = Object.keys(ingredients).map(igKey => {
            return ingredients[igKey];
        }).reduce((acc, val) => {
            return acc + val;
        },0);
        return sum > 0;
    }

    purchaseHandler = () => {
        this.setState({
            purchasing: true
        });
    }

    purchaseCancelHandler = () => {
        this.setState({purchasing: false});
    }

    purchaseContinueHandler = () => {
       this.props.history.push('/checkout');
    }

    render() {
        const disabledInfo = {
            ...this.props.ings
        };
        for(let key in disabledInfo) {
            disabledInfo[key] = (disabledInfo[key] === 0 ? true : false)
        }

        let orderSummery = null;
        // burger variable to assign the JSX after getting the ingredients from Firebase
        let burger = this.props.error ? <p style={{textAlign:'center'}}>Ingredients can not be loaded!</p> : <Spinner />
        if(this.props.ings) {
            burger = (
                <Aux>
                    <Burger ingredients={this.props.ings} />
                    <BuildControls
                        ingredientAdded={this.props.onIngredientAdded} 
                        ingredientRemoved={this.props.onIngredientRemoved}
                        disabled={disabledInfo}
                        price={this.props.price}
                        purchasable={this.updatePurchaseStateHandler(this.props.ings)}
                        ordered={this.purchaseHandler} />
                </Aux>
            );
            orderSummery = <OrderSummery
            price={this.props.price}
            purchaseCanceled={this.purchaseCancelHandler}
            purchaseContinued={this.purchaseContinueHandler}
            ingredients={this.props.ings}  />
        }
        /* if(this.state.loading) {
            orderSummery = <Spinner />
        } */

        return(
            <Aux>
                <Modal show={this.state.purchasing} 
                    modalClosed={this.purchaseCancelHandler}>
                        {orderSummery}
                </Modal>
                {burger}
            </Aux>
        );
    }
}

const mapStateToProps = state => {
    return {
        ings: state.ingredients,
        price: state.totalPrice,
        error: state.error
    };
};

const mapDispatchToProps = dispatch => { // it recieves dispatch function as an argument
    return {
        onIngredientAdded: (ingName) => dispatch(BurgerBuilderActions.addIngredient(ingName)),
        onIngredientRemoved: (ingName) => dispatch(BurgerBuilderActions.removeIngredient(ingName)),
        onInitIngredients: () => dispatch(BurgerBuilderActions.initIngredients())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));