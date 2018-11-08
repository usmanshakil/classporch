import React, {Component} from 'react';
import {Grid, Button, Icon} from 'semantic-ui-react';
import MenuChangeStore from '../../menu';
import './styles.css';
import {history} from '../../redux/store';
import {connect} from "react-redux";
import FacebookLogin from "react-facebook-login";
import {loginUser} from "../../redux/actions";
import {Link} from "react-router-dom";

class SignUpMethods extends Component {

    componentWillMount() {
        if (history.location.state) {
            this.setState({isStudent: history.location.state.from === "student"})
        }
        console.log(history)
        this.items = [
            {
                key: 'home',
                name: 'home',
                buttonTitle: 'HOME'
            }, {
                key: 'contact-us',
                name: 'contact-us',
                buttonTitle: 'CONTACT US'
            }
        ];
        MenuChangeStore.changeMenu(this.items);
    }

    openTutorSignUp(e) {
        history.push('/sign-up/tutor');
    }

    openStudentSignUp(e) {
        history.push('/sign-up/student');
    }


  render() {
    return (
      <Grid className='sign-up-methods-body' id={'sign-up'}>
        <Grid.Row centered className='text-center'>
          <p className='sign-up-methods-header'>How would you like to Sign Up?</p>
         
        </Grid.Row>
              
        <Grid.Row centered>
         
        <Button size='massive' color='olive' circular center-btn onClick={this.openStudentSignUp.bind(this)}>Student</Button>
          
        {/* <p className={'create-account'}>Would you like to sign up as a <Link to={'/sign-up/tutor'}>Tutor?</Link></p> */}

        </Grid.Row>
        <Grid.Row centered>
         
        {/* <Button size='massive' color='olive' circular center-btn onClick={this.openStudentSignUp.bind(this)}>Student</Button> */}
          
        <p className={'create-account'}>Would you like to sign up as a <Link to={'/sign-up/tutor'}>Tutor?</Link></p>
            
        </Grid.Row>
      </Grid>
    );
  }
}

const mapStateToProps = (state) => {
    return state
};


export default connect(mapStateToProps,{loginUser})(SignUpMethods);

