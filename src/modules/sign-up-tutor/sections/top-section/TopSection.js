import React from 'react';
import {Grid, Button} from 'semantic-ui-react';
import './styles.css';

const TopSection = () => (
    <Grid className='sign-up-tutor-top-section-body'>
        <Grid.Row centered>
            <Grid.Column width={8}  textAlign='left'>
                <p className='sign-up-tutor-top-section-title'>We would like to know more about you. Please fill the details below</p>
                <p className='sign-up-tutor-top-section-subtitle'>Fields marked with * are compulsory</p>
            </Grid.Column>
            <Grid.Column width={4} textAlign='right'>
                <Button basic color='yellow' circular size='large'>CONTINUE</Button>
            </Grid.Column>
        </Grid.Row>
    </Grid>
);

export default TopSection;