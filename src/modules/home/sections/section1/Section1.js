import React from 'react';
import {Grid, Button} from 'semantic-ui-react';
import {history} from '../../../../redux/store';
import './styles.css';
import $ from "jquery";

const showSignUp = () => {
    history.push({
        pathname: '/sign-up',
        state: {
            from:'student'
        }
    });
    setTimeout(() => {
        $("html, body").animate({scrollTop: $('#sign-up').position().top - 60}, 1000);
    })
};

const Section1 = () => (
    <Grid style={{
        backgroundImage: 'url(\'back.jpg\')',
        backgroundPosition: 'center center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover'
    }}>
        <Grid.Row centered className='section-one'>
            <Grid.Column width={12}>
                <p className='home-title'>Student learning. <span className='home-title-bold'>Simplified.</span></p>
                <p className='home-subtitle'>Connecting students with tutors and instructors across the globe.</p>
                
                <Grid.Row centered>
                    <Button circular color='yellow' size='big' onClick={showSignUp}>Find Tutors Now</Button>
                </Grid.Row>
                {/*<Grid.Row centered>*/}
                    {/*<div onClick={scrollTo} className="scroll-to">*/}
                        {/*<i className="fa fa-long-arrow-down fa-5x" aria-hidden="true"/>*/}
                    {/*</div>*/}
                {/*</Grid.Row>*/}
            </Grid.Column>
        </Grid.Row>

    </Grid>
);

export default Section1;
