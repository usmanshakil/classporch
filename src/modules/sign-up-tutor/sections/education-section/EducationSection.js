import React from 'react';
import {Button, Form, Grid, Header, Input} from 'semantic-ui-react';
import moment from 'moment';
import './styles.css';

export default class EducationSection extends React.Component {

    constructor() {
        super();
        this.state = {
            listOfEducation: [{}],
            numberOfEducationFields: 1
        };
        this.renderEduction = this.renderEduction.bind(this);
        this.onEducationChange = this.onEducationChange.bind(this);
    }

    onFocusChange = (event, data) => {
        if (event.type === 'focus') {
            event.target.type = 'date';
            event.target.click()
        } else {
            event.target.type = 'text'
        }
    };

    getEducations = () => {
        const {startDate, endDate, numberOfEducationFields} = this.state;
        const Educations = [];

        for (let i = 0; i < numberOfEducationFields; i++) {
            Educations.push(
                <Grid>

                </Grid>
            )
        }
        return Educations;
    };

    addEducation(e) {
        e.preventDefault();
        this.setState({listOfEducation: [{}, ...this.state.listOfEducation]})
    }

    onEducationChange(key, e, {name, value}) {
        let educations = [...this.state.listOfEducation];
        educations[key][name] = value;  //new value
        this.setState({listOfEducation: educations});
        this.props.onChangeEdu(this.state.listOfEducation)
    }

    startUploading() {

    }
    renderEduction() {
        return this.state.listOfEducation.map((edu, key) => {
            return <Grid.Row columns={12} centered key={key}>
                <Grid.Column width={12} textAlign='left' style={{paddingBottom: '20px'}}>
                    <Input label="School Name" type='text' name={'university_name'} fluid placeholder='Name of School'
                           onChange={this.onEducationChange.bind(this, key)}/>
                </Grid.Column>
                <Grid.Column width={6} textAlign='left'>
                    <Input label="Start" fluid name={'start_education'} type='text' placeholder='Start Date * (dd/mm/yyyy)'
                           onFocus={this.onFocusChange} min='1970-01-01' max={moment().format('Y-mm-D')}
                           onBlur={this.onFocusChange} required onChange={this.onEducationChange.bind(this, key)}/>
                </Grid.Column>
                <Grid.Column width={6} textAlign='left'>
                    <Input label="End" fluid name={'finish_education'} type='text' placeholder='End Date * (dd/mm/yyyy)'
                           onFocus={this.onFocusChange} min='1970-01-01' max={moment().format('Y-mm-D')}
                           onBlur={this.onFocusChange} required onChange={this.onEducationChange.bind(this, key)}/>
                </Grid.Column>
                <Grid.Column width={12} align={'center'} style={{paddingTop:'30px'}}>
                    <Header as="h3" textAlign={'center'}>Upload verification document</Header>
                    <div id="verifiy-doc" className="ui middle aligned center aligned grid container">
                        <div className="ui fluid segment">
                            <input type="file" onChange={this.startUploading}
                                   className="inputfile"/>

                            <label htmlFor="embedpollfileinput" className="ui huge yellow right floated button">
                                <i className="ui upload icon"/>
                                Upload File
                            </label>
                        </div>
                    </div>
                </Grid.Column>
            </Grid.Row>
        })
    }

    render() {
        return (
            <Grid className='sign-up-about-education-body'>
                <Grid.Row centered>
                    <Grid.Column width={12} textAlign='left'>
                        <p className='sign-up-label'>EDUCATION</p>
                    </Grid.Column>
                </Grid.Row>
                {this.renderEduction()}
                <Grid.Row centered>
                    <Button onClick={this.addEducation.bind(this)}>Add Education</Button>
                </Grid.Row>
                <Grid.Row centered>
                    <Grid.Column width={4}>
                        <p>Your total experience in months</p>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row centered>
                    <Grid.Column width={4}>
                        <Input label="Experience" required fluid name='experience' placeholder='Experience (in months)'
                               onChange={this.props.onChange}/>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        );
    }
}