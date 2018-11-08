import React, {Component} from 'react';
import './styles.scss';
import {
    Grid,
    Menu
} from 'semantic-ui-react';
import {history} from '../../redux/store';
import {connect} from 'react-redux'
import {Intro} from "./Intro/index";

class Footer extends Component {

    constructor(props) {
        super(props);
        this.handleItemClick = this.handleItemClick.bind(this);
        this.showSignUp = this.showSignUp.bind(this);
    }

    handleItemClick = (e, {name}) => {
        switch (name) {
            case 'privacy-policy':
                window.scrollTo(0, 0);
                history.push('/privacy-policy');
                break;
            case 'terms-of-service':
                window.scrollTo(0, 0);
                history.push('/terms-of-service');
                break;
            case 'contact-us':
                window.scrollTo(0, 0);
                history.push('/contact');
                break;
            case 'pricing':
                history.push('/');
                setTimeout(() => document.getElementById('pricing').scrollIntoView({block: 'start', behavior: 'smooth'}));
                break;
            default:
                console.error('Pages not available');
                break;
        }
    };

    showSignUp = () => {
        history.push('/sign-up');
    };

    render() {
        return (
            <div>
                <div className='footer-bottom-background no-pad'>
                    <Intro/>
                    <Grid centered padded={'horizontally'}>
                        <Grid.Row>
                            <Grid.Column width={14}>
                                <Menu secondary borderless className={'footer-elements'}>
                                    <Menu.Item>
                                        <div className='copyright-text'>
                                            Copyright ClassPorch 2017
                                        </div>
                                    </Menu.Item>
                                    <Menu.Menu position='right'>
                                        <Menu.Item
                                            className='footer-button'
                                            onClick={this.handleItemClick}
                                            name='privacy-policy'>
                                            Privacy Policy
                                        </Menu.Item>
                                        <Menu.Item
                                            className='footer-button'
                                            onClick={this.handleItemClick}
                                            name='terms-of-service'>
                                            Terms of Service
                                        </Menu.Item>
                                        <Menu.Item
                                            className='footer-button'
                                            onClick={this.handleItemClick}
                                            name='contact-us'>
                                            Contact Us
                                        </Menu.Item>
                                        <Menu.Item
                                            className='footer-button'
                                            onClick={this.handleItemClick}
                                            name='pricing'>
                                            Pricing
                                        </Menu.Item>
                                    </Menu.Menu>
                                </Menu>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </div>
            </div>
        );
    }
}


const mapStateToProps = ({auth}) => {
    const {role} = auth;
    return {role}
};

export default connect(mapStateToProps, {})(Footer)