import React from 'react';
import {Grid, Input} from 'semantic-ui-react';
import './styles.css';

const ContactSection = (props) => (
    <Grid className='sign-up-contact-section-body'>
                <Grid.Row centered>
                    <Grid.Column width={12} textAlign='left'>
                        <p className='sign-up-label'>CONTACT DETAILS</p>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row centered>
                    <Grid.Column width={6} textAlign='left'>
                        <Input label="Email" fluid name='email' placeholder='Email' type='email' onChange={props.onChange}/>
                    </Grid.Column>
                    <Grid.Column width={6} textAlign='left'>
                        <Input fluid name='mobile' label="Phone" placeholder='Phone *' required type='phone' onChange={props.onChange}/>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
);

export default ContactSection;