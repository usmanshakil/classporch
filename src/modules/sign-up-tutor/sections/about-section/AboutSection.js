import React from 'react';
import {Form, Grid, Header, Input, Radio, Select} from 'semantic-ui-react';
import './styles.css';
import * as moment from "moment/moment";
import {CountryList} from "../../../../helpers/utils";
import * as $ from 'jquery';

export default class AboutSection extends React.Component {
    constructor() {
        super();
        this.changeGender = this.changeGender.bind(this);
        this.changeDob = this.changeDob.bind(this);
    }

    state = {
        gender: 'male',
        dobError: ""
    };



    changeDob(e, {name, value}) {
        const age = moment(value).month(0).from(moment().month(0));
        const ageInYears = Number(age.match(/\d+/g));
        this.setState(Object.assign(this.state, {
            dob: value,
            needParent: ageInYears < 18,
            dobError: ageInYears < 18 ? "You must be 18 years old minimum" : ""
        }));
        this.props.onChange(e, {name, value})
    }

    changeGender = function (e, {name, value}) {
        this.setState({gender: value});
        this.props.onChange(e, {name, value})
    };

    onFocusChange = function (event, data) {
        if (event.type === 'focus') {
            event.target.type = 'date';
            event.target.click();
        } else {
            event.target.type = 'text';
        }
    };

    startUploading(e) {
        console.log(e)
    }

    uploadFile(e){
        console.log(e)
    }
    render() {
        const {gender} = this.state;
        return (
            <Grid className='sign-up-about-section-body'>
                <Grid.Row centered>
                    <Grid.Column width={12} textAlign='left'>
                        <p className='sign-up-label'>ABOUT</p>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row centered>
                    <Grid.Column width={6} textAlign='left'>
                        <Input label="First Name" fluid name='first_name' placeholder='First Name *' required
                               onChange={this.props.onChange}/>
                    </Grid.Column>
                    <Grid.Column width={6} textAlign='left'>
                        <Input label="Last Name" fluid name='last_name' placeholder='Last Name *' required
                               onChange={this.props.onChange}/>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row centered>
                    <Grid.Column width={12} textAlign='left'>
                        <Input label="Date of Birthday" id="datepicker" fluid name='dob'  type='date' placeholder='Date of birth* (dd/mm/yyyy)'
                               onFocus={this.onFocusChange}
                               onBlur={this.onFocusChange} required onChange={this.changeDob}/>
                        <p style={{color: 'red', fontSize: '15px'}}>{this.state.dobError}</p>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row centered>
                    <Grid.Column width={6} textAlign='left'>
                        <Select label={'Country'} labeled={true} fluid name='country' onChange={this.props.onChange}
                                placeholder='Select your country' options={CountryList} required/>
                        {/*<Input fluid name='country' type='text' placeholder='Country' required*/}
                        {/*onChange={this.props.onChange}/>*/}
                    </Grid.Column>
                    <Grid.Column width={6} textAlign='left'>
                        <Input fluid name='city' label="City" type='text' placeholder='City' required
                               onChange={this.props.onChange}/>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row centered>
                    <Grid.Column width={12} textAlign='left'>
                        <span>Gender</span>
                        <Radio
                            label='Male'
                            name='gender'
                            value='male'
                            className='space'
                            checked={gender === 'male'}
                            onChange={this.changeGender}/>
                        <Radio
                            label='Female'
                            name='gender'
                            value='female'
                            className='space'
                            checked={gender === 'female'}
                            onChange={this.changeGender}/>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row centered>
                    <Grid.Column width={6} textAlign='left'>
                        <Input fluid name='password' label="Password" type='password' placeholder='Password *' required
                               onChange={this.props.onChange}/>
                    </Grid.Column>
                    <Grid.Column width={6} textAlign='left'>
                        <Input fluid name='password_confirmation' label="Confirm Password" type='password' placeholder='Password Confirmation *'
                               required
                               onChange={this.props.onChange}/>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row centered>
                    <Grid.Column width={6} textAlign='left'>
                        <Header as="h3" textAlign={'center'}>Upload verification document(Passport, Driver License etc)</Header>

                        <div className="ui middle aligned center aligned grid container">
                            <div className="ui fluid segment">
                                <input type="file" onChange={this.startUploading}
                                       className="inputfile"/>

                                <label htmlFor="embedpollfileinput" onClick={this.uploadFile.bind(this)} className="ui huge yellow right floated button">
                                    <i className="ui upload icon"/>
                                    Upload File
                                </label>
                            </div>
                        </div>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        );
    }
}