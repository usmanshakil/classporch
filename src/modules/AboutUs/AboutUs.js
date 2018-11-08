import React from "react";
import {Grid} from "semantic-ui-react";
import './styles.css';
export default class Home extends React.Component {

    render() {
        const expandedContent = <p className='about-us-content'>
           ClassPorch is an online learning platform created to connect students with the tutors they need at
           a particular point in time. Our services are tailored to meet the educational needs of every student
           no matter how demanding they may be. With instructional videos and top-loginnotch virtual technology,
           students are allowed to learn at their own pace and are given a safe avenue to ask questions and raise concerns.
           
            <br/>
            <br/>
            At ClassPorch, we implement the use of modern techniques and methods, as well as an individual approach with a
             highly interactive and flexible tutoring system to give you a memorable learning experience. .
            <br/>
            <br/>
            With amazing tutors and a flexible learning schedule, we ensure all students are well taught and are getting the 
            help they need. 
        </p>;

        const content = <p className='about-us-content'>
            ClassPorch is a platform that is created and tailored to connect students with tutors, providing
            students
            with simplified learning. The objective of ClassPorch is to provide top-notch education for anyone,
            anywhere
            and at anytime.
            <br/>
            <br/>
            With instructional videos, practice exercises, and a personalized learning dashboard, you are offered
            the
            enablement to study at your own pace in and out of the classroom. Whether it is math, science, computer
            programming, history, art history, economics, and more, with ClassPorch, there is nothing to worry
            about.

        </p>;


        return (
            <Grid container centered stretched columns={2} className={'about-section'}>
                <Grid.Row centered stretched verticalAlign='middle' className=''>
                    <Grid.Column width={12}>
                        <div className='about-us-section'>
                            <p className='about-us-header' style={{color: '#fcbd08'}}>
                                ABOUT US
                            </p>
                            {expandedContent}
                            <br/>
                        </div>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        )
    }
}
