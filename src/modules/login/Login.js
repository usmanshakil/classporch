import React, {Component} from 'react';
import {
    Grid,
    Image,
    Button,
    Icon,
    Input,
    Form,
    Modal
} from 'semantic-ui-react';

import compass from '../../assets/login/compass.png';
import MenuChangeStore from '../../menu';
import {apiEndpoints} from '../../ApiEndpoints';
import {history} from '../../redux/store';

//change login inputs controlled components, move logic of login out into auth reducer. these propsed changes written in adjacent
// login_redux file

class Login extends Component {

    state = {
        isLoading: false,
        noEmailError: false,
        formData: {},
        showPasswordModal: false,
        email: '',
        isSigningIn: false
    };

    componentWillMount() {
        this.items = [
            {
                key: 'home',
                name: 'home',
                buttonTitle: 'HOME'
            }, {
                key: 'contact-us',
                name: 'contact-us',
                buttonTitle: 'CONTACT US'
            }
        ];
        MenuChangeStore.changeMenu(this.items);
    }

    checkAuth = (e, {formData}) => {
        e.preventDefault();
        if (formData.email !== '') {
            this.setState({isLoading: true});
            const that = this;
            const params = {
                user: formData
            };
            fetch(apiEndpoints.auth.signIn, {
                method: 'POST',
                headers: {
                    'Accept': '*/*',
                    'Content-Type': 'application/json'
                },
                    body: JSON.stringify(params)
                })
                .then(function (response) {
                    that.setState({isLoading: false});
                    if (response.ok) {
                        return response.json();
                    } else if (response.status === 401) {
                        that.setState({showPasswordModal: true, email: formData.email});
                        throw new Error(response.statusText);
                    }else if(response.status === 404){
                        history.push('/sign-up');
                    }
                }, function (error) {
                    console.log(error);
                    that.setState({isLoading: false});
                }).catch(function(error){});
            console.log("Form data: ", {user: formData});
        } else if (this.state.isLoading) {
            console.log("Already signing in");
        } else {
            console.log("Email is empty!! ", formData);
            this.setState({noEmailError: true});
        }
    };

    signIn = (e, {formData}) => {
        e.preventDefault();
        const {email, isSigningIn} = this.state;
        const params = {
            user: {
                email: email,
                password: formData.password
            }
        };
        if (!isSigningIn) {
            const that = this;
            fetch(apiEndpoints.auth.signIn, {
                method: 'POST',
                headers: {
                    'Accept': '*/*',
                    'Content-Type': 'application/json'
                },
                    body: JSON.stringify(params)
                })
                .then(function (response) {
                    that.setState({isSigningIn: false});
                    if (response.ok) {
                        return response.json();
                    } else if (response.status === 401) {
                        throw new Error(response.statusText);
                    }
                }, function (error) {
                    console.log(error);
                    that.setState({isSigningIn: false});
                })
                .then(function (json) {
                    
                }).catch(function (error){
                    alert('You\'ve entered a wrong password');
                });
        }
    };

    closePsswordDialog = (e) => {
        e.preventDefault();
        this.setState({showPasswordModal: false});
    };

    render() {
        const {isLoading, noEmailError, showPasswordModal, isSigningIn} = this.state;

        return (
            <Grid className='login-body'>
                <Grid.Row centered>
                    <Grid.Column width={4}>
                        <Image centered src={compass} className='login-compass'></Image>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row centered>
                    <Grid.Column>
                        <p className='login-welcome'>WELCOME</p>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row centered>
                    <Grid.Column>
                        <p>Please continue with the following login options.</p>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row centered>
                    <Grid.Column>
                        <br/>
                        <br/>
                        <br/>
                        <Button circular color='facebook' size='large' className='login-button'>
                            <Icon className='login-no-border-icon' size='large' name='facebook'/>
                            Continue with Facebook
                        </Button>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row centered>
                    <Grid.Column>
                        <Button circular color='linkedin' size='large' className='login-button'>
                            <Icon className='login-no-border-icon' size='large' name='linkedin'/>
                            Continue with LinkedIn
                        </Button>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row centered>
                    <Grid.Column>
                        <p>OR</p>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row centered>
                    <Grid.Column width={6}>
                        <Form onSubmit={this.checkAuth}>
                            <Input
                                name='email'
                                size='large'
                                type='email'
                                iconPosition='left'
                                fluid
                                required
                                error={noEmailError}
                                placeholder='someone@example.com'>
                                <Icon className='login-no-border-icon' color='black' name='at'/>
                                <input/>
                            </Input>
                            <br/>
                            <br/>
                            <Button
                                loading={isLoading}
                                circular
                                color='yellow'
                                size='large'
                                className='login-button'>
                                Continue with Email
                            </Button>
                        </Form>

                    </Grid.Column>
                </Grid.Row>
                <Grid.Row centered>
                    <Grid.Column textAlign='center'>
                        <Modal dimmer='blurring' size='small' open={showPasswordModal}>
                            <Modal.Content>
                                <Grid>
                                    <Grid.Row centered>
                                        <Grid.Column>
                                            <p className='login-modal-header'>Please enter your password</p>
                                            <br/>
                                            <br/>
                                            <Form onSubmit={this.signIn}>
                                                <Input type='password' name='password' required placeholder='Password'/>
                                                <br/>
                                                <br/>
                                                <br/>
                                                <Button basic circular color='red' onClick={this.closePsswordDialog}>
                                                    Cancel
                                                </Button>
                                                <Button loading={isSigningIn} circular color='yellow'>
                                                    Sign In
                                                </Button>
                                            </Form>
                                        </Grid.Column>
                                    </Grid.Row>
                                </Grid>

                            </Modal.Content>
                        </Modal>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        );
    }
}

export default Login;