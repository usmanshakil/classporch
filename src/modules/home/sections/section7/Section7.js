import React from 'react';
import {Grid, Button} from 'semantic-ui-react';
const Section3 = () => (
    <Grid className='section-three'>
        <Grid.Row centered>
            <Grid.Column width={8}>
                <p className='section3-title'><span className='section3-title-semibold'>BENEFITS OF STUDENTS</span> ON THE PLATFORM
                </p>
            </Grid.Column>
        </Grid.Row>
        <Grid.Row centered>
            <div className='section3-seperator'></div>
        </Grid.Row>
        <Grid.Row centered>
            <Grid.Column width={10}>
                <p className='section3-subtitle'>At ClassPorch tutors we have experienced and certified tutors as new tutors are carefully interview to ensure they are well qualified before they acquire a tutoring position. With this, we can be sure that our students feel comfortable working with a particular tutor and get the best help possible!</p>
            </Grid.Column>
        </Grid.Row>
        <Grid.Row centered textAlign='center' className='section-three-features'>
            <Grid.Column width={6}>
                <Grid>
                    <Grid.Row>
                        <Grid.Column width={16}>
                            <p className='section-three-feature-header'>24-7 Availability</p>
                            <p className='section-three-feature-details'>Our tutors at ClassPorch are always available 24/7 at anytime and any day for the student. This will enable the student ask for help at their own convenience whenever they choose. It is a great thing that with our online tutor, college students can now learn 24/7 with an online instructor making contact through live chat or online email.</p>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Grid.Column>
            <Grid.Column width={1}>
            </Grid.Column>
            <Grid.Column width={6}>
                <Grid>
                    <Grid.Row>
                        <Grid.Column width={16}>
                            <p className='section-three-feature-header'>Variety of Subjects</p>
                            <p className='section-three-feature-details'>At ClassPorch, we offer assistance in a large variety of subjects ranging from K-5, Middle School, High School, College and University. Our tutors will help with your school homework or college/university assignments, provide timely test prep tips and offer expert advice with your AP courses. If you happen to need help with college math for example, just search for college math help and you will find our online tutors ready to offer their services.</p>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Grid.Column>
        </Grid.Row>
        <Grid.Row centered textAlign='center'>
            <Grid.Column width={6}>
                <Grid>
                    <Grid.Row>
                        <Grid.Column width={16}>
                            <p className='section-three-feature-header'>Homeworks made easy</p>
                            <p className='section-three-feature-details'>Irrespective the problem or question you need help with, our experienced tutors will help you work it out. We do not simply provide our students with ready-to-go answers but make sure they understand the solution and can easily work out similar tasks on their own. Homework help with online tutoring can give a student the needed support to succeed and regain the confidence to become a better learner.</p>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Grid.Column>
            <Grid.Column width={1}>
            </Grid.Column>
            <Grid.Column width={6}>
                <Grid>
                    <Grid.Row>
                        <Grid.Column width={16}>
                            <p className='section-three-feature-header'>Easy video chats</p>
                            <p className='section-three-feature-details'>With our interactive technology at ClassPorch tutors, we make learning very effective and fun. Our virtual classroom is equipped with live video, whiteboard, text- and voice-chat, and file sharing tools that allow students to get the most out of every session.</p>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Grid.Column>
        </Grid.Row>
        <Grid.Row centered>
            <Button circular color='yellow' size='large' className='pricing-plans-button'>VIEW OUR PRICING PLANS</Button>
        </Grid.Row>
    </Grid>
);

export default Section3;