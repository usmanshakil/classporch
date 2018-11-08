// // import React from 'react';
// // import {injectStripe} from 'react-stripe-elements';

// // import {  CardSection, PaymentRequestButton } from './checkout-sections'

// // class CheckoutForm extends React.Component {
// //   handleSubmit = (ev) => {
// //     // We don't want to let default form submission happen here, which would refresh the page.
// //     ev.preventDefault();

// //     // Within the context of `Elements`, this call to createToken knows which Element to
// //     // tokenize, since there's only one in this group.
// //     this.props.stripe.createToken({name: 'Jenny Rosen'}).then(({token}) => {
// //       console.log('Received Stripe token:', token);
// //     });

// //     // However, this line of code will do the same thing:
// //     // this.props.stripe.createToken({type: 'card', name: 'Jenny Rosen'});
// //   }

// //   render() {
// //     return (
// //       <form onSubmit={this.handleSubmit} style={{ flex:1, padding:100 }} >
// //         {/* <AddressSection /> */}
// //         <CardSection />
// //         <button>Confirm order</button>
// //         <PaymentRequestButton />
// //       </form>
// //     );
// //   }
// // }

// // export default injectStripe(CheckoutForm);


// import React from 'react';

// import {StripeProps} from 'react-stripe-elements';
// import { Input } from 'semantic-ui-react'
// import './styles.css'

// import {
//   CardElement,
//   CardNumberElement,
//   CardExpiryElement,
//   CardCVCElement,
//   PostalCodeElement,
//   PaymentRequestButtonElement,
//   StripeProvider,
//   Elements,
//   injectStripe,
// } from 'react-stripe-elements';

// // const handleBlur = () => {
// //   console.log('[blur]');
// // };
// // const handleChange = change => {
// //   console.log('[change]', change);
// // };
// // const handleClick = () => {
// //   console.log('[click]');
// // };
// // const handleFocus = () => {
// //   console.log('[focus]');
// // };
// // const handleReady = () => {
// //   console.log('[ready]');
// // };

// const createOptions = (fontSize) => {
//   return {
//     style: {
//       base: {
//         fontSize,
//         color: '#424770',
//         letterSpacing: '0.025em',
//         fontFamily: 'Source Code Pro, monospace',
//         '::placeholder': {
//           color: '#aab7c4',
//         },
//       },
//       invalid: {
//         color: '#9e2146',
//       },
//     },
//   };
// };

// class _CardForm extends React.Component {

//   state={
//     amount:''
//   }

//   onAmountChange = (e,{value}) => {
//     e.preventDefault()
//     this.setState({ amount:value })
//   }

//   handleSubmit = ev => {
//     ev.preventDefault();
//     this.props.stripe.createToken().then(payload => console.log(JSON.stringify(payload,null,4)))
//   };
//   render() {
//     return (
//       <form onSubmit={this.handleSubmit}>
//         <label>
//           Card details
//           <CardElement
//             {...createOptions(this.props.fontSize)}
//           />
//           Amount 
//           <Input type='number' value={this.state.amount} onChange={this.onAmountChange} 
                  
//           />
//           <br/>
//         </label>
//         <button>Pay</button>
//       </form>
//     );
//   }
// }
// const CardForm = injectStripe(_CardForm);



// class CheckoutForm extends React.Component {
//   constructor() {
//     super();
//     this.state = {
//       elementFontSize: window.innerWidth < 450 ? '14px' : '18px',
//     };
//     window.addEventListener('resize', () => {
//       if (window.innerWidth < 450 && this.state.elementFontSize !== '14px') {
//         this.setState({elementFontSize: '14px'});
//       } else if (
//         window.innerWidth >= 450 &&
//         this.state.elementFontSize !== '18px'
//       ) {
//         this.setState({elementFontSize: '18px'});
//       }
//     });
//   }

//   render() {
//     const {elementFontSize} = this.state;
//     return (
//       <div className="Checkout">
//         <h2>Add Money to Wallet</h2>
//         <Elements>
//           <CardForm fontSize={elementFontSize} />
//         </Elements>
        
//       </div>
//     );
//   }
// }

// export default CheckoutForm