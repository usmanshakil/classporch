import React from 'react'
import {Elements} from 'react-stripe-elements';
import { Grid } from 'semantic-ui-react'
import {connect} from 'react-redux'
import { Notification } from 'react-notification';
import { CardForm } from './checkout-sections'
import  { addMoneyToWallet,getDashboard } from '../../redux/actions'

class AddCredits extends React.Component {

    constructor() {
        super();
        this.state = {
          elementFontSize: window.innerWidth < 450 ? '14px' : '18px',
          isNotificationActive:false          
        };
        window.addEventListener('resize', () => {
          if (window.innerWidth < 450 && this.state.elementFontSize !== '14px') {
            this.setState({elementFontSize: '14px'});
          } else if (
            window.innerWidth >= 450 &&
            this.state.elementFontSize !== '18px'
          ) {
            this.setState({elementFontSize: '18px'});
          }
        });
      }
    
    componentWillReceiveProps(nextProps){
		const { userId, authToken } = this.props;
		
		if(this.props.moneyAddedIndicator !== nextProps.moneyAddedIndicator){
			this.setState({ isNotificationActive:true });
			this.props.getDashboard({ userId,authToken })	
		}
	}

	dismissNotification = () => {
		this.setState({ isNotificationActive :false })
	};

    
    render() {
        const {elementFontSize} = this.state;
        
        return (
            <Grid className='payment-page-container' >
                <Grid.Row>
                    <Grid.Column width={12} >
                        <div className="Checkout">
                            <h2>Add Money to Wallet</h2>
                            <Elements>
                                <CardForm fontSize={elementFontSize}
                                    userId={this.props.userId}
                                    authToken = {this.props.authToken}
                                    addMoneyToWallet = {this.props.addMoneyToWallet}
                                    addingMoney = {this.props.addingMoney}
                                />
                            </Elements>
                            
                        </div>

                        <Notification
                            isActive={this.state.isNotificationActive}
                            message="Notification"
                            action="Dismiss"
                            title={this.props.displayMessage}
                            dismissAfter =  {5000}
                            onDismiss={ this.dismissNotification }
                            onClick={ this.dismissNotification }
                        />
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        );
    }

}

const mapStateToProps = ( {dashboard,auth} ) => {
	let { authToken, id:userId } = auth;
	let { moneyAddedIndicator,displayMessage,addingMoney } = dashboard;
	
	return {  userId, authToken, moneyAddedIndicator, displayMessage,addingMoney }
};

export default connect(mapStateToProps, { addMoneyToWallet,getDashboard })(AddCredits);
