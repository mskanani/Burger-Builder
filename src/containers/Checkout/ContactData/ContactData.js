import React, { Component } from 'react';
import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import classes from './ContactData.css';
import axios from '../../../axios-orders';
import Input from '../../../components/UI/Input/Input';

class ContactData extends Component {
    state = {
        name:  '',
        email: '',
        address: {
            street:     '',
            postalCode: ''
        },
        loading: false
    }

    orderHandler = (event) => {
        event.preventDefault();
        //console.log(this.props.price);

        this.setState({ loading: true });
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price, //in a real app this should be calculated on the server to make sure that the user is not manipulating the price before sending it
            customer: {
                name: 'Mahmoud',
                address: {
                    country: 'UAE',
                    city: 'Dubai'
                },
                email: 'mahmoud.srouji@gmail.com'
            },
            deliveryMethod: 'fastest'
        }
        axios.post('/orders.json', order).then(response => {
            this.setState({ 
                loading: false, 
            });
            this.props.history.push('/'); // this one would not work unless we pass the props from which we are rendering ContactData because we rendered it manualy (render instead of component)
        }).catch(error => {
            console.log(error);
            this.setState({ 
                loading: false
            });
        });
        
    }

    render() {
        let form =(
            <form>
                <Input inputtype="input" type="text" name="name" placeholder="Your name" />
                <Input inputtype="input" type="email" name="email" placeholder="Your email" />
                <Input inputtype="input" type="text" name="street" placeholder="Street" />
                <Input inputtype="input" type="text" name="postal" placeholder="Postal" />
                <Button btnType="Success" clicked={this.orderHandler}>Order</Button>
            </form>
        );
        if(this.state.loading) {
            form = <Spinner />
        }
        return(
            <div className={classes.ContactData}>
                <h4>Enter your Contact Data</h4>
                {form}
            </div>
        );
    }
}

export default ContactData;