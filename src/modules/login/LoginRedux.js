import React, {Component} from 'react';
import {connect} from 'react-redux';
import FacebookLogin from 'react-facebook-login';
import {emailChanged, emailSubmitted, passwordChanged, passwordDialogClosed, loginUser} from '../../redux/actions';
import {
    Grid,
    Image,
    Button,
    Icon,
    Input,
    Form,
    Modal, Label
} from 'semantic-ui-react';
import './styles.scss';
import compass from '../../assets/login/compass.png';
import {history} from '../../redux/store';
import {Link} from "react-router-dom";


class LoginRedux extends Component {

    state = {
        isEmailFacebook: true,
        emailAfterFbLogin: '',
        fbResponseWithoutEmail: {}
    };

    componentWillUnmount() {
        this.setState({isEmailFacebook: true, emailAfterFbLogin: '', fbResponseWithoutEmail: {}})
    }

    onEmailChanged(event) {
        this.props.emailChanged(event.target.value)
    }

    onEmailSubmit(event) {
        event.preventDefault();
        this.props.emailSubmitted(true)
    }

    onPasswordChanged(event) {
        this.props.passwordChanged(event.target.value)
    }

    onLoginUser(event) {
        event.preventDefault();
        const {email, password} = this.props;
        this.props.loginUser(this.makeLoginApiRequestBody(email, password, null, null, null))
    }

    onClosePasswordDialog(event) {
        event.preventDefault();
        this.props.passwordDialogClosed(false)
    }

    // if user has not kept his email public in facebook profile, ask him to disclose it
    onEmailChangedAfterFbSumit(event) {
        this.setState({emailAfterFbLogin: event.target.value})
    }

    onEmailAfterFbSubmit(event) {
        event.preventDefault();
        this.setState({isEmailFacebook: true});
        const {emailAfterFbLogin, fbResponseWithoutEmail} = this.state;
        this.props.loginUser(this.makeLoginApiRequestBody(emailAfterFbLogin, null, "facebook", fbResponseWithoutEmail.accessToken, null))
    }

    onCloseEmailAfterFbDialog() {
        // clear everything
        this.setState({isEmailFacebook: true, emailAfterFbLogin: '', fbResponseWithoutEmail: {}})
    }

    responseFacebook = (response) => {
        console.log(JSON.stringify(response, null, 4));
        if (!response.accessToken) {
            history.push('/login');
        } else if (response.accessToken && response.email === undefined) {
            this.setState({isEmailFacebook: false});
            this.setState({fbResponseWithoutEmail: response})
            // prompt user to enter email
        } else {
            this.props.loginUser(this.makeLoginApiRequestBody(response.email, null, "facebook", response.accessToken, null))
        }

    };

    makeLoginApiRequestBody(email, password = "", provider = "", access_token = "", secret = "") {
        return {
            "user": {
                "email": email,
                "password": password,
                "provider": provider,
                "access_token": access_token,
                "secret": secret,
            }
        }
    }

    loadingLoginFacebook() {
        if (this.props.loading) {
            return 'Please wait, logging you in ....'
        }
        return 'Login with Facebook'
    }

    render() {
        // console.log(this.props.errorMessage)
        const {email, password, loading, error, errorMessage} = this.props;
        const errorFlag = error !== '';
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
                        <div style={{color: '#4542f4'}}>
                            {errorMessage ? null : null}
                        </div>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row centered>
                    <Grid.Column width={6}>
                        <Form onSubmit={this.onLoginUser.bind(this)}>
                            <Input
                                label="Email"
                                name='email'
                                size='large'
                                type='email'
                                fluid
                                required
                                error={errorFlag}
                                onChange={this.onEmailChanged.bind(this)}
                                value={this.props.email}
                                placeholder='someone@example.com'>
                            </Input>
                            <br/>
                            <Input
                                label="Password"
                                name='password'
                                size='large'
                                type='password'
                                fluid
                                required
                                error={errorFlag}
                                onChange={this.onPasswordChanged.bind(this)}
                                value={this.props.password}
                                placeholder='password'>
                            </Input>
                            <br/>
                            <Button
                                loading={false}
                                circular
                                color='yellow'
                                size='large'
                                className='login-button'>
                                Login
                            </Button>
                        </Form>

                        <p className={'create-account'}>Don't Have an <Link to={'/sign-up'}>Account?</Link></p>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        )
    }
}

const mapStateToProps = ({auth}) => {
    const {email, password, showPasswordModal, userObject, errorObject, loading, errorMessage} = auth;

    return {email, password, showPasswordModal, userObject, errorObject, loading, errorMessage}
};


export default connect(mapStateToProps, {
    emailChanged,
    emailSubmitted,
    passwordChanged,
    passwordDialogClosed,
    loginUser
})(LoginRedux);



