import React from 'react';
import {Grid, Checkbox, Button} from 'semantic-ui-react';
import './styles.css';
import {Link} from "react-router-dom";

export default class BottomSection extends React.Component {
    state = { isAgreedToTerms: false };

    onFormSubmitted = (e,{formData}) => {
        e.preventDefault();
    };

    agreedToTerms = (e) => {
        const {isAgreedToTerms} = this.state;
        this.setState({
            isAgreedToTerms: !isAgreedToTerms
        });
    };

    render() {
        const {isAgreedToTerms} = this.state;
        return (
            <Grid className='sign-up-bottom-body'>
                <Grid.Row centered>
                    <Grid.Column width={12} textAlign='left'>
                        <Checkbox name='terms_agreed_check' className='terms-agreed-check' checked={isAgreedToTerms} onClick={this.agreedToTerms} required/>
                        <span>
                          I have read and agree to the
                            <Link to={'/privacy-policy'} className='sign-up-bottom-span-links'> Privacy Policy </Link>
                            and
                            <Link  to = {'/terms-of-service/student'} className='sign-up-bottom-span-links'> Terms of Service </Link>
                            documents of ClassPorch.
                        </span>
                    </Grid.Column>
                </Grid.Row>

                <Grid.Row centered>
                    <Grid.Column width={12}>
                        <br/>
                        <br/>
                        <br/>
                        <Button circular size='large' color='yellow' disabled={!this.state.isAgreedToTerms} type='submit'>CONTINUE</Button>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        );
    }
}