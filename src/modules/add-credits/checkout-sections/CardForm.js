import React from 'react';

import {StripeProps} from 'react-stripe-elements';
import { Input } from 'semantic-ui-react'
import '../styles.css'

import {
  CardElement,
  injectStripe,
} from 'react-stripe-elements';

// const handleBlur = () => {
//   console.log('[blur]');
// };
// const handleChange = change => {
//   console.log('[change]', change);
// };
// const handleClick = () => {
//   console.log('[click]');
// };
// const handleFocus = () => {
//   console.log('[focus]');
// };
// const handleReady = () => {
//   console.log('[ready]');
// };

const createOptions = (fontSize) => {
  return {
    style: {
      base: {
        fontSize,
        color: '#424770',
        letterSpacing: '0.025em',
        fontFamily: 'Source Code Pro, monospace',
        '::placeholder': {
          color: '#aab7c4',
        },
      },
      invalid: {
        color: '#9e2146',
      },
    },
  };
};

class _CardForm extends React.Component {

  state={
    amount:'',
    paymentType:'wallet add'
  };

  onFocusAmount = (e) => {
    e.target.click()
  };

  onAmountChange = (e,{value}) => {
    this.setState({ amount:value })
  };

  handleSubmit = ev => {
    ev.preventDefault();
    if(!this.state.amount){
      return
    }
    this.props.stripe.createToken().then(resToken => {
      console.log(JSON.stringify(resToken,null,4));
      this.props.addMoneyToWallet({ 
        userId : this.props.userId,
        authToken: this.props.authToken,
        amountToBeAdded : parseFloat(this.state.amount),
        stripeToken: resToken.token.id, 
        paymentType : this.state.paymentType
      });
      this.setState({ amount:'' })
    })
  };
  render() {
    return (
      <form onSubmit={this.handleSubmit} className='cardform-container' >
        <label>
          Card details
          <CardElement
            {...createOptions(this.props.fontSize)}
          />
        </label>
        <label>
          Amount <br/>
            <Input 
              type='number' 
              value={this.state.amount} 
              className='input-amount-style' 
              onFocus={this.onFocusAmount}
              onChange={this.onAmountChange}
            />
        </label>
        <br/>
        <button className='stripe-button' > { this.props.addingMoney? 'Adding Credits ...' :  'Add Credits' }</button>
      </form>
    );
  }
}
const CardForm = injectStripe(_CardForm);

export default CardForm