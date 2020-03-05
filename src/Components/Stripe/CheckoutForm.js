import React, { Component } from 'react';
import axios from 'axios';
import StripeCheckout from 'react-stripe-checkout';

class CheckoutForm extends Component{
    constructor(){
        super();
        this.state = {
            stripeKey: 'pk_test_AiKr5auFY37g1kC4rtDGhn5500dvNReUzp',
            amount: null,
            name: ''
        }
    }
    onToken = token => {
        let stringToken = JSON.stringify(token),
            body = {
                token: stringToken,
                total: this.props.amount
            };
        axios
        .post('/auth/handleStripe', body)
        .then( () => {
            axios
            .put(`/api/therapists/appointments/${this.props.appointment}`, this.props.details)
            .then( () => this.props.update() )
            .catch( err => console.log( err ) )
        } )
        .catch( err => console.log(err) );
    }

    render(){
        console.log(this.props.appointment, this.props.details)
        return(
            <StripeCheckout 
                stripeKey={this.state.stripeKey}
                token={this.onToken}
                amount={this.props.amount}
                currency='USD'
                locale='en'
                description='Pre-pay for appointment time'
                name={this.props.name}
            >
                <button className='btn btn-primary'>Schedule</button>
            </StripeCheckout>
        )
    }

}

export default CheckoutForm;