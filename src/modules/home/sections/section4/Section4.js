import React from 'react';
import {Grid, Button, Image} from 'semantic-ui-react';
import {history} from "../../../../redux/store";
import './styles.css';
import $ from "jquery";
import steps from '../../../../assets/howitworks/steps.png';
const showSignUp = () => {
    history.push('/sign-up');
    setTimeout(() => {
        $("html, body").animate({scrollTop: $('#sign-up').position().top}, 500);
    })
};

const Section4 = () => (
    <Grid className='how-it-works-section section4-background' id='how-it-works'>
            <Grid.Row centered><p className='section4-header' style={{color: '#fcbd08', fontSize: '32px'}}>
                HOW IT WORKS
            </p>
            </Grid.Row>
            <Grid.Row centered>
                <Grid>
                    <Grid.Row centered>
                        <Grid.Column width={10}>
                            <p style={{fontSize: '24px'}}>
                                At ClassPorch we make everything easy. You can easily sign up
                                by creating your profile, search for the tutors you need and schedule
                                the available sessions in advance. You can also request for an immediate session
                                if the tutor you need is online.
                            </p>
                         <Image centered src={steps} className='how_it_works-steps'></Image>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Grid.Row>
            <Grid.Row centered>
                <Button circular size='big' basic color='yellow' className='section4-find-more-button'
                        onClick={showSignUp}>FIND
                    MORE</Button>
            </Grid.Row>
    </Grid>

);

export default Section4;

