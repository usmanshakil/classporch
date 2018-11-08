
import React from 'react'
import { Grid, Header, Button, Form, Input } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { Notification } from 'react-notification';
import { requestMoneyAction,getDashboard } from '../../redux/actions';

class RequestMoney extends React.Component {

    state = {
        enteredAmount:'',
        isNotificationActive:false
        
    };

    componentWillReceiveProps(nextProps){
		const { userId, authToken } = this.props;
		
		if(this.props.requestMoneyIndicator !== nextProps.requestMoneyIndicator){
            this.setState({ isNotificationActive:true });
            this.props.getDashboard({ userId,authToken })			            
		}
	}


    onChangeValue = (e,{value}) => this.setState({ enteredAmount:value });

    onFormSubmit = (e) => {
        e.preventDefault();
        const availableCredits = parseFloat(this.props.profile.credits);
        const enteredCredits = parseFloat(this.state.enteredAmount);
        const { userId, authToken } = this.props;
        this.props.requestMoneyAction({ userId, authToken, availableCredits, enteredCredits })
    };

    dismissNotification = () => {
		this.setState({ isNotificationActive :false })
	};

    render(){
        return(

                <Grid padded centered style={{ paddingBottom:'600px' }} >
                    <Grid.Row >
                        <Grid.Column width={10} textAlign='left'>
                            <Header size='medium' > REQUEST MONEY </Header>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row style={{marginTop:"20px"}} >
                        <Grid.Column width={10} textAlign='left'>
                            <Form onSubmit={this.onFormSubmit}>
                                <Form.Group widths='equal' >
                                    <Form.Field control={Input} label='Amount'  
                                        onChange = {this.onChangeValue}
                                        name='amount'
                                        value={this.state.enteredAmount} 
                                        type='number'
                                        required
                                        placeholder='Enter amount you want to remit' />
                                </Form.Group>

                                <br/>
                                <br/>

                                <Grid.Row >
                                    <Grid.Column width={10} textAlign='left' className='button-container' >
                                        <Button size='medium' color='yellow' type='submit' className='button-style' >
                                            REQUEST MONEY
                                        </Button>
                                    </Grid.Column>
                                </Grid.Row> 

                                <Notification
                                    isActive={this.state.isNotificationActive}
                                    message="Notification"
                                    action="Dismiss"
                                    title={this.props.displayMessage}
                                    dismissAfter =  {5000}
                                    onDismiss={ this.dismissNotification }
                                    onClick={ this.dismissNotification }
                                />
                                
                            </Form>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
        )
    }
}

const mapStateToProps = ( {auth,dashboard} ) => {
    const { authToken, id:userId, role,firstName, lastName, loggedIn } =  auth;
    const { profile, displayMessage, requestMoneyIndicator } = dashboard;

	return { authToken, userId, role,firstName, lastName, loggedIn, profile, displayMessage, requestMoneyIndicator }
};


export default connect(mapStateToProps, { requestMoneyAction,
                                            getDashboard
                                        })(RequestMoney);




// URL: http://localhost:3000/api/v1/users/60/transact

// Request Parameters:

// {
// 	"requested_amount": 5000
// }
