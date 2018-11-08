/**
 * Created by raffi.
 * User: raffi
 * Date: 1/23/18
 */

import React, {Component} from 'react';
import {Grid} from "semantic-ui-react";
export class iWant extends Component {
    constructor() {
        super()
    }

    render() {
		 const content = <p className='i-want-content'>
           <b>BENEFITS FOR TUTORS</b> 
           <br />
ClassPorch offers its tutors a wide range of benefits that keeps them satisfied and in great form to carry out their duties. 
<ul><li><b>Make good money from your expertise login</b></li></ul>
Our students need qualified and expert tutors like you. This is a great way to cash in and earn some money during your spare 
time and all you need is your knowledge, computer and of course a Wi-Fi connection. 
<ul><li><b>Custom Schedule</b></li></ul>
At ClassPorch, there is no pressure on tutors. So, you can accept sessions only when they work for you and log in when you have 
time to accept immediate sessions. 
<ul><li><b>Impact Someone’s life </b></li></ul>
ClassPorch offers its tutors a wide range of benefits that keeps them satisfied and in great form to carry out their duties. 
<ul><li><b>Make good money from your expertise login</b></li>
<li><b>Our students need qualified and expert tutors like you.</b></li> </ul>This is a great way to cash in and earn some money during 
There is a student out there who needs your expertise and you get to impact lives whilst improving your skills and boosting your CV. 

        </p>;
        return  (
            <Grid container centered stretched columns={2} className={'iwant-section'}>
                <Grid.Row centered stretched verticalAlign='middle' className=''>
                    <Grid.Column width={12}>
                        <div className='i-want-section'>
                            <p className='about-us-header' style={{color: '#fcbd08'}}>
                                BENEFITS FOR TUTORS
                            </p>
                            {content}
                            <br/>
                        </div>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        )
    }
}
