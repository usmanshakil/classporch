
import React from 'react'
import { Grid, Header, Button, Form, Input } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { Notification } from 'react-notification';
import './styles.css'
import { requestLinkAccount,getDashboard } from '../../redux/actions';

class LinkAccount extends React.Component {

    state = {
        bankName:'',
        ifscCode:'',
        accountNumber:'',
        accountHolderName:'',
        isNotificationActive:false
        
    };

    componentWillReceiveProps(nextProps){
		const { userId, authToken } = this.props;
		
		if(this.props.accountLinkIndicator !== nextProps.accountLinkIndicator){
            this.setState({ isNotificationActive:true });
            this.props.getDashboard({ userId,authToken })			            
		}
	}


    onChangeValue = (key,e,{value}) => this.setState({
        ...this.state,
        [key]: value
    });

    onFormSubmit = (e) => {
        e.preventDefault();
        const { bankName,ifscCode,accountHolderName,accountNumber } = this.state;
        const { userId, authToken } = this.props;
        this.props.requestLinkAccount({ userId, authToken, bankName,ifscCode,accountHolderName,accountNumber });
        this.setState({ bankName:'',accountHolderName:'',accountNumber:'',ifscCode:'' })
    };

    dismissNotification = () => {
		this.setState({ isNotificationActive :false })
	};

    render(){
        return(

                <Grid padded centered style={{ paddingBottom:'600px' }} >
                    <Grid.Row >
                        <Grid.Column width={10} textAlign='left'>
                            <Header size='medium' > LINK ACCOUNT </Header>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row style={{marginTop:"20px"}} >
                        <Grid.Column width={10} textAlign='left'>
                            <Form onSubmit={this.onFormSubmit}>
                                <Form.Group widths='equal' >
                                    <Form.Field control={Input} label='Account Holder Name'  
                                        onChange = {this.onChangeValue.bind(this,'accountHolderName')}
                                        name='amount'
                                        value={this.state.accountHolderName} 
                                        required
                                        placeholder='Enter account holder name' />
                                    <Form.Field control={Input} label='Account Number'  
                                        onChange = {this.onChangeValue.bind(this,'accountNumber')}
                                        name='amount'
                                        value={this.state.accountNumber} 
                                        required
                                        placeholder='Enter account number' />
                                </Form.Group>
                                <br/>
                                <br/>
                                <Form.Group widths='equal' >
                                    <Form.Field control={Input} label='Bank Name'  
                                        onChange = {this.onChangeValue.bind(this,'bankName')}
                                        name='amount'
                                        value={this.state.bankName} 
                                        required
                                        placeholder='Enter bank name' />
                                    <Form.Field control={Input} label='IFSC Code'  
                                        onChange = {this.onChangeValue.bind(this,'ifscCode')}
                                        name='amount'
                                        value={this.state.ifscCode} 
                                        required
                                        placeholder='Enter IFSC code of bank branch' />
                                </Form.Group>

                                <br/>
                                <br/>

                                <Grid.Row >
                                    <Grid.Column width={10} textAlign='left' className='button-container' >
                                        <Button size='medium' color='yellow' type='submit' className='button-style' >
                                            LINK ACCOUNT
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
    const { profile, displayMessage, accountLinkIndicator } = dashboard;

	return { authToken, userId, role,firstName, lastName, loggedIn, profile, displayMessage, accountLinkIndicator }
};


export default connect(mapStateToProps, { requestLinkAccount,
                                            getDashboard
                                        })(LinkAccount);







// // Endpoint - api/v1/user/56/add_bank_details (PUT)

// //Request 

// {
//     "bank_name": "Andhra Bank",
//     "ifsc_code": "JASHJSA",
//     "account_number": "",
//     "account_holder_name": "Mr. Jones"
// }
