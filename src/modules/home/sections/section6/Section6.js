import React from 'react';
import {Grid, Button} from 'semantic-ui-react';
import {history} from "../../../../redux/store";
import './styles.css'
import $ from "jquery";

const showContactUs = () => {
    history.push('/contact');
    setTimeout(() => {
        $("html, body").animate({scrollTop: $('#contact-us').position().top - 65}, 1000);
    })
};

const Section6 = () => (
    <Grid id='write-us' className='section-six'>
        <Grid.Row centered>
            <Grid.Column width={8}>
                <p className='section6-title' style={{fontSize: '32px'}}>WE WOULD LOVE TO HEAR FROM <span
                    className='section6-title-semibold'>YOU</span>
                </p>
            </Grid.Column>
        </Grid.Row>
        <Grid.Row centered>
            <div className='section6-seperator'/>
        </Grid.Row>
        <Grid.Row centered>
            <Grid.Column width={10}>
                <p className='section6-content' style={{fontSize: '24px'}}>
                    Our online teachers hold a wealth of knowledge, academic degrees and experience. Students will find
                    homework tutors, college-readiness tutors, academic tutors and career tutors. Hiring a tutor who is
                    actually specialist about what they are teaching will assist you become passionate and enthusiastic
                    about learning.
                </p>
            </Grid.Column>
        </Grid.Row>
        <Grid.Row centered>
            <Grid.Column width={8}>
                <br/>
                <br/>
                <Button circular basic color='yellow' size='big' onClick={showContactUs}>WRITE TO US</Button>
            </Grid.Column>
        </Grid.Row>
    </Grid>
);

export default Section6;