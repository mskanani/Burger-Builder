import React, {Component} from 'react';
import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';

const INGREDIENT_PRICES = { //Global constance
    salad:    3,
    cheese:   5,
    mushroom: 5,
    meat:     5
}

class BurgerBuilder extends Component {
    // constructor(props) {
    //     super(props);
    //     this.state = {
    //     }
    // }
    state = {
        ingredients: {
            salad:    0,
            cheese:   0,
            mushroom: 0,
            meat:     0
        },
        totalPrice: 25
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
    }

    render() {
        const disabledInfo = {
            ...this.state.ingredients
        };
        for(let key in disabledInfo) {
            disabledInfo[key] = (disabledInfo[key] === 0 ? true : false)
        }
        return(
            <Aux>
                <Burger ingredients={this.state.ingredients} />
                <BuildControls
                    ingredientAdded={this.addIngredientHandler} 
                    ingredientRemoved={this.removeIngredientHandler}
                    disabled={disabledInfo} />
            </Aux>
        );
    }
}

export default BurgerBuilder;