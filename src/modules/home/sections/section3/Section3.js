import React from 'react';
import {Grid, Image, Button} from 'semantic-ui-react';
import './styles.css';
import imageOne from '../../../../assets/section3/section3_1.png';
import imageTwo from '../../../../assets/section3/section3_2.png';
import imageThree from '../../../../assets/section3/section3_3.png';
import imageFour from '../../../../assets/section3/section3_4.png';

const scrollTo = () => {
    document.getElementById('pricing').scrollIntoView({block: 'start', behavior: 'smooth'});
};

const Section3 = () => (
    <Grid className='section-three' id="introduction">
        <Grid.Row centered>
            <Grid.Column width={8}>
                <p className='section3-title'>INTRODUCING <span className='section3-title-semibold'>TOP TUTORS</span>
                </p>
            </Grid.Column>
        </Grid.Row>
        <Grid.Row centered>
            <div className='section3-seperator'/>
        </Grid.Row>
        <Grid.Row centered>
            <Grid.Column width={10}>
                <p className='section3-subtitle' style={{fontSize: '18px'}}>At ClassPorch, we take ample time to interview all our tutors to ensure they
                 are well qualified before they are granted a tutoring position.</p>
            </Grid.Column>
        </Grid.Row>
        <Grid.Row className='section-three-features'>
            <Grid celled='internally' style={{marginLeft: 80, marginRight: 80}}>
                <Grid.Row centered textAlign='left'>
                    <Grid.Column width={6} style={{paddingRight: 40, paddingBottom: 40}}>
                        <Grid>
                            <Grid.Row textAlign='right'>
                                <Grid.Column width={12}>
                                    <p className='section-three-feature-header'>24-7 Availability</p>
                                    <p className='section-three-feature-details'>Our tutors are available 24-7 enabling students
                                     to reach out for help at their convenience.</p>
                                </Grid.Column>
                                <Grid.Column width={4}>
                                    <Image style={{paddingTop: 20}} src={imageOne}/>
                                </Grid.Column>
                            </Grid.Row>
                        </Grid>
                    </Grid.Column>
                    <Grid.Column width={6} style={{paddingLeft: 40, paddingBottom: 40}}>
                        <Grid>
                            <Grid.Row>
                                <Grid.Column width={4}>
                                    <Image style={{paddingTop: 20}} src={imageTwo}/>
                                </Grid.Column>
                                <Grid.Column width={12}>
                                    <p className='section-three-feature-header'>Variety of Subjects</p>
                                    <p className='section-three-feature-details'>We offer tutoring services 
                                    for a wide variety of subjects ranging from K-5, middle & high school and college subjects. </p>
                                </Grid.Column>
                            </Grid.Row>
                        </Grid>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row centered textAlign='left'>
                    <Grid.Column width={6} style={{paddingRight: 40, paddingTop: 40}}>
                        <Grid>
                            <Grid.Row textAlign='right'>
                                <Grid.Column width={12}>
                                    <p className='section-three-feature-header'>Homeworks made easy</p>
                                    <p className='section-three-feature-details'>Our tutors are qualified and readily available to
                                     help you with homework and assignments.</p>
                                </Grid.Column>
                                <Grid.Column width={4}>
                                    <Image style={{paddingTop: 20}} src={imageThree}/>
                                </Grid.Column>
                            </Grid.Row>
                        </Grid>
                    </Grid.Column>
                    <Grid.Column width={6} style={{paddingLeft: 40, paddingTop: 40}}>
                        <Grid>
                            <Grid.Row>
                                <Grid.Column width={4}>
                                    <Image style={{paddingTop: 20}} src={imageFour}/>
                                </Grid.Column>
                                <Grid.Column width={12}>
                                    <p className='section-three-feature-header'> Whiteboard + Audio/Video
                                        Compatability</p>
                                    <p className='section-three-feature-details'>Our highly interactive technology
                                     makes the learning process more effective and fun for both tutors and students.</p>
                                </Grid.Column>
                            </Grid.Row>
                        </Grid>
                    </Grid.Column>
                </Grid.Row>
            </Grid>

        </Grid.Row>
        <Grid.Row centered>
            <Button style={{marginTop: 30}} onClick={scrollTo} circular color='yellow' size='large'
                    className='pricing-plans-button'>VIEW OUR PRICING PLANS</Button>
        </Grid.Row>
    </Grid>
);

export default Section3;
