import React, { Component } from 'react';
import axios from 'axios';
import StripeCheckout from 'react-stripe-checkout';

class CheckoutForm extends Component{
    constructor(){
        super();
        this.state = {
            stripeKey: 'pk_test_AiKr5auFY37g1kC4rtDGhn5500dvNReUzp',
            amount: null
        }
    }
    componentDidMount(){
        this.setState({ amount: 2200 })
    }
    onToken = token => {
        let stringToken = JSON.stringify(token),
            body = {
                token: stringToken,
                total: this.state.amount
            };
        axios
        .post('/auth/handleStripe', body)
        .then( res => console.log(res) )
        .catch( err => console.log(err) );
    }

    render(){
        return(
            <StripeCheckout 
                stripeKey={this.state.stripeKey}
                token={this.onToken}
                amount={this.state.amount}
                currency='USD'
                locale='en'
                description='Dynamic user info coming soon'
                name='Therapist Finder'
            >
                <button className='btn btn-primary'>Schedule</button>
            </StripeCheckout>
        )
    }

}

export default CheckoutForm;