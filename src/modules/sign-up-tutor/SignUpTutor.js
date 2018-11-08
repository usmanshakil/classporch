import React from 'react';
import {
    AboutSection,
    BottomSection,
    ContactSection,
    EducationSection,
    HourlyRateSection,
    SkillsSection,
    TopSection
} from './sections';
import {Form} from 'semantic-ui-react';
import {connect} from 'react-redux';
import {signupUser} from '../../redux/actions';

class SignUpTutor extends React.Component {

    constructor(props) {
        super(props);
        this.onChangeSkills = this.onChangeSkills.bind(this);
        this.onFormSubmitted = this.onFormSubmitted.bind(this);
        this.onChangeEducation = this.onChangeEducation.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    state = {
        selectedSkills: [],
        educations:[]
    };

    onChangeSkills = (selectedSkills) => {
        this.setState({selectedSkills})
    };

    onFormSubmitted = (event, {formData}) => {
        event.preventDefault();
        const formSkills = this.state.selectedSkills.map(x => {
            return {id: x.key, name: x.text}
        });
        let edu = {};
        this.state.educations.map((item, key) => {
            Object.assign(edu, {[key]: item})
        });
        const {
            email,
            password,
            password_confirmation,
            first_name,
            last_name,
            gender,
            dob,
            country,
            city,
            mobile,
            rate,
            experience
        } = this.state;
        //Modify form data for actual use:
        let parsedForm = {
            user: {
                education_attributes: edu,
                tutor_experience_attributes: {
                    rate,
                    experience,
                    description: ''
                },
                role: 'tutor',
                email,
                password,
                password_confirmation,
                first_name,
                last_name,
                gender,
                birthday_date: dob,
                country,
                city,
                number: mobile,
                skills: formSkills
            }
        };

        if (this.props.errorObject) {
            const {provider, access_token, secret} = this.props.errorObject;
            parsedForm = {
                user: {
                    ...parsedForm.user,
                    provider: provider || 'email'
                },
                auth: {
                    access_token: access_token || null,
                    secret: secret || null
                }
            }
        }

        this.props.signupUser(parsedForm);
    };

    onChange = (event, {name, value}) => {
        this.setState({[name]: value});
    };

    onChangeEducation(data) {
        this.setState({educations: data})
    }

    render() {
        return (
            <Form encType='application/json' onSubmit={this.onFormSubmitted.bind(this)}>
                <TopSection/>
                <AboutSection onChange={this.onChange}/>
                <ContactSection onChange={this.onChange}/>
                <EducationSection onChange={this.onChange} onChangeEdu={this.onChangeEducation}/>
                <SkillsSection onChangeSkills={this.onChangeSkills} selectedSkills={this.state.selectedSkills}/>
                <HourlyRateSection onChange={this.onChange}/>
                <BottomSection/>
            </Form>
        )
    }
}

const mapStateToProps = ({auth}) => {
    const {email, errorObject, loading} = auth;
    return {email, errorObject, loading}
};

export default connect(mapStateToProps, {signupUser})(SignUpTutor);



