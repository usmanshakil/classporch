import React from 'react';
import { Grid, Input, Radio, Select, Form } from 'semantic-ui-react';
import * as moment from 'moment';
import './styles.css';
import { CountryList } from "../../../../helpers/utils";
import $ from 'jquery';

export default class AboutSection extends React.Component {

    constructor() {
        super();

        this.password = this.Confrmpassword.bind(this);
        this.changeGender = this.changeGender.bind(this);
        this.state = {
            gender: 'male',
            gradesList: [
                { key: 'Grade 1', value: '1', text: 'Grade 1' },
                { key: 'Grade 2', value: '2', text: 'Grade 2' },
                { key: 'Grade 3', value: '3', text: 'Grade 3' },
                { key: 'Grade 4', value: '4', text: 'Grade 4' },
                { key: 'Grade 5', value: '5', text: 'Grade 5' },
                { key: 'Grade 6', value: '6', text: 'Grade 6' },
                { key: 'Grade 7', value: '7', text: 'Grade 7' },
                { key: 'Grade 8', value: '8', text: 'Grade 8' },
                { key: 'Grade 9', value: '9', text: 'Grade 9' },
                { key: 'Grade 10', value: '10', text: 'Grade 10' },
                { key: 'Grade 11', value: '11', text: 'Grade 11' },
                { key: 'Grade 12', value: '12', text: 'Grade 12' },
                { key: 'Year 1', value: '13', text: 'Year 1' },
                { key: 'Year 2', value: '14', text: 'Year 2' },
                { key: 'Year 3', value: '15', text: 'Year 3' },
                { key: 'Year 4', value: '16', text: 'Year 4' },
            ],
            showParents:false
        }; 
        
    
        this.handleLoad = this.handleLoad.bind(this);
    }

    componentDidMount() {
        window.addEventListener('load', this.handleLoad);
     }
     
    
     handleLoad() {      
         //document.getElementById("ParentfName").style.display = 'none';
         //document.getElementById("ParentlName").style.display = 'none';
     }

    Confrmpassword(e, { name, value }) {
        var password = document.getElementById("password");
        var confirmpassword = document.getElementById("CPassword");
    }

    changeGender(e, { name, value }) {
        this.setState({ gender: value });
        this.props.onChange(e, { name, value })

    };
    onchangeGrade = (event, data) => {
      
        if (data.value < 12) {
           
        
            this.setState({'showParents':true})
        }
        else {
           
            this.setState({'showParents':false})

        }
        
    };
    render() {
        let renderParentInfo;       
      
        const { gender } = this.state;
        if (this.state.needParent) {
            renderParentInfo = <Grid.Row centered>
                <Grid.Column width={6} textAlign='left'>
                    <Input fluid name='parent_email' error label="Parent Email" placeholder='Parent Email' required
                        onChange={this.props.onChange} />
                </Grid.Column>
                <Grid.Column width={6} textAlign='left'>
                    <Input fluid name='parent_name' placeholder='Parent Name' error label="Parent Name" required
                        onChange={this.props.onChange} />
                </Grid.Column>
            </Grid.Row>
        }
        const parents=<Grid.Row centered id="ParentDetails">
                    <Grid.Column width={6} textAlign='left'>

                        <Input label="Parent/Guardian first Name" type="hidden" id="ParentfName" name='ParentfName' fluid hidden placeholder="Parent/Guardian First Name" />
                    </Grid.Column>
                    <Grid.Column width={6} textAlign='left'>
                        <Input label="Parent/Guardian last Name" type="hidden" id="ParentlName" name='ParentlName' fluid hidden placeholder="Parent/Guardian Last Name" />
                    </Grid.Column>

                </Grid.Row>
               
                
                        return (
            <Grid className='sign-up-about-section-body'>
                <Grid.Row centered>
                    <Grid.Column width={12} textAlign='left'>
                        <p className='sign-up-label'>ABOUT</p>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row centered>
                    <Grid.Column width={6} textAlign='left'>
                        <Input fluid name='first_name' label="First Name" error placeholder='First Name *' required
                            onChange={this.props.onChange} />

                    </Grid.Column>
                    <Grid.Column width={6} textAlign='left'>
                        <Input fluid name='last_name' placeholder='Last Name *' error label="Last Name" required
                            onChange={this.props.onChange} />
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row centered>
                    <Grid.Column width={12} textAlign='left'>
                        <Form.Select size={'large'} label="Grade" id='grade' name='grade' onChange={this.onchangeGrade} placeholder='Select your grade'
                            options={this.state.gradesList} />

                    </Grid.Column>

                </Grid.Row>

                {this.state.showParents && parents}
                {renderParentInfo}
                <Grid.Row centered>
                    <Grid.Column width={6} textAlign='left'>
                        <Select label={'Country'} labeled={true} fluid name='country' required onChange={this.props.onChange} placeholder='Select your country' options={CountryList} required search />
                        {/*<Input fluid name='country' type='text' placeholder='Country' required*/}
                        {/*onChange={this.props.onChange}/>*/}
                    </Grid.Column>
                    <Grid.Column width={6} textAlign='left'>
                        <Input fluid name='city' type='text' placeholder='City' error label="City"
                            onChange={this.props.onChange} />
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
                            onChange={this.changeGender} />
                        <Radio
                            label='Female'
                            name='gender'
                            value='female'
                            className='space'
                            checked={gender === 'female'}
                            onChange={this.changeGender} />
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row centered>
                    <Grid.Column width={6} textAlign='left'>
                        <Input fluid name='password' id='password' label="Password" pattern=".{8,}" error type='password' required title="8 characters minimum"
                            onChange={this.props.onChange} />
                        <label id='lblpassword' className="ErrorLabel"></label>
                    </Grid.Column>
                    <Grid.Column width={6} textAlign='left'>
                        <Input fluid name='password_confirmation' id='CPassword' error label="Confirm Password" type='password' placeholder='Password Confirmation *'
                            required
                            onChange={this.Confrmpassword} />
                        <label id='lblCpassword' className="ErrorLabel"></label>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        );

    }
}
