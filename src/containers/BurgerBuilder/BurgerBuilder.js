import React, {Component} from 'react';
import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummery from '../../components/Burger/OrderSummery/OrderSummery';
import Spinner from '../../components/UI/Spinner/Spinner'; 
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'; //starting with lower case character because we are not going to use it in JSX
import axios from '../../axios-orders';

const INGREDIENT_PRICES = { //Global constance
    salad:    0.4,
    cheese:   0.5,
    mushroom: 0.3,
    meat:     0.7
}

class BurgerBuilder extends Component {
    // constructor(props) {
    //     super(props);
    //     this.state = {
    //        ...
    //     }
    // }
    state = {
        ingredients: null,
        totalPrice: 6,
        purchasable: false,
        purchasing: false,
        loading: false,
        error: false
    }

    componentDidMount() {
        console.log(this.props);

        axios.get('https://react-my-burger-954cd.firebaseio.com/ingredients.json')
            .then(response => {
                this.setState({ ingredients: response.data });
            }).catch(error => {
                this.setState({
                    error: true
                });
            });
    }

    updatePurchaseStateHandler(ingredients) {
        const sum = Object.keys(ingredients).map(igKey => {
            return ingredients[igKey];
        }).reduce((acc, val) => {
            return acc + val;
        },0);
        this.setState({purchasable: sum > 0});
    }

    addIngredientHandler = (type) => {
        var updatedCount = this.state.ingredients[type] + 1;
        var updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;
        var additionalPrice = INGREDIENT_PRICES[type];
        var newPrice = this.state.totalPrice + additionalPrice;
        this.setState({
            ingredients: updatedIngredients,
            totalPrice: newPrice
        });
        this.updatePurchaseStateHandler(updatedIngredients);
    }

    removeIngredientHandler = (type) => {
        if(this.state.ingredients[type] === 0) {
            return;
        }
        var updatedCount = this.state.ingredients[type] - 1;
        var updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;
        var DeductedPrice = INGREDIENT_PRICES[type];
        var newPrice = this.state.totalPrice - DeductedPrice;
        this.setState({
            ingredients: updatedIngredients,
            totalPrice: newPrice
        });
        this.updatePurchaseStateHandler(updatedIngredients);
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
       const queryParams = [];
       for(let i in this.state.ingredients) {
           queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]));
       }
       queryParams.push('price=' + this.state.totalPrice);
       const queryString = queryParams.join('&');
       this.props.history.push({
            pathname: '/checkout',
            search: '?' + queryString
       });
    }

    render() {
        const disabledInfo = {
            ...this.state.ingredients
        };
        for(let key in disabledInfo) {
            disabledInfo[key] = (disabledInfo[key] === 0 ? true : false)
        }

        let orderSummery = null;
        // burger variable to assign the JSX after getting the ingredients from Firebase
        let burger = this.state.error ? <p style={{textAlign:'center'}}>Ingredients can not be loaded!</p> : <Spinner />
        if(this.state.ingredients) {
            burger = (
                <Aux>
                    <Burger ingredients={this.state.ingredients} />
                    <BuildControls
                        ingredientAdded={this.addIngredientHandler} 
                        ingredientRemoved={this.removeIngredientHandler}
                        disabled={disabledInfo}
                        price={this.state.totalPrice}
                        purchasable={this.state.purchasable}
                        ordered={this.purchaseHandler} />
                </Aux>
            );
            orderSummery = <OrderSummery
            price={this.state.totalPrice}
            purchaseCanceled={this.purchaseCancelHandler}
            purchaseContinued={this.purchaseContinueHandler}
            ingredients={this.state.ingredients}  />
        }
        if(this.state.loading) {
            orderSummery = <Spinner />
        }

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

export default withErrorHandler(BurgerBuilder, axios);