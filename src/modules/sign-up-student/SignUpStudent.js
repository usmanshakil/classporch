import React from 'react';
import {
  AboutSection,
  BottomSection,
  ContactSection,
  EducationSection,
  SkillsSection,
  TopSection
} from './sections';
import {Form,Grid, Checkbox, Button} from 'semantic-ui-react';
import {connect} from 'react-redux';
import {signupUser} from '../../redux/actions';


class SignUpStudent extends React.Component {

  constructor(props) {
    super(props);

    
    this.onChangeSkills = this.onChangeSkills.bind(this);
    this.onFormSubmitted = this.onFormSubmitted.bind(this);
  }
  
 

  state = {
    selectedSkills: []
  };

  onChangeSkills = (selectedSkills) => {
    this.setState({selectedSkills})
  };

  onFormSubmitted = (event, {formData}) => {
    event.preventDefault();

    const formSkills = this.state.selectedSkills.map(x => {
      return {id: x.key, name: x.text}
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
      grade,
      start_education,
      finish_education,
      college_name,
    } = this.state;

    //Modify form data for actual use:
    let parsedForm = {
      user: {
        educations_attributes: {
          '0': {
            start_education,
            finish_education,
            university_name: college_name,
            grade
          }
        },
        role: 'student',
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
      const { provider, access_token, secret } = this.props.errorObject;
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

  render() {
    return (
      <Form encType='application/json' onSubmit={this.onFormSubmitted}>
        <TopSection/>
        <AboutSection onChange={this.onChange}/>
          <ContactSection onChange={this.onChange}/>
        <EducationSection onChange={this.onChange}/>
        <SkillsSection onChangeSkills={this.onChangeSkills} selectedSkills={this.state.selectedSkills}/>
        <BottomSection/>
        {/* <Grid.Column width={12}>
                        <br/>
                        <br/>
                        <br/>
                        <Button circular size='large' color='yellow' type='submit' onClick={this.Formvalidation}>CONTINUE</Button>
                    </Grid.Column> */}
      </Form>
    )
  }
}

const mapStateToProps = ({auth}) => {
  const {email, errorObject, loading} = auth;
  return {email, errorObject, loading}
};



export default connect(mapStateToProps, {signupUser})(SignUpStudent);



