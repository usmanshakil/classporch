import React from 'react';
import { Grid, Checkbox, Button } from 'semantic-ui-react';
import './styles.css';
import { Link } from "react-router-dom";

export default class BottomSection extends React.Component {
    state = { isAgreedToTerms: false };
    constructor(props) {
        super(props);
        this.Formvalidation = this.Formvalidation.bind(this);
    }

    agreedToTerms = (e) => {
        const { isAgreedToTerms } = this.state;
        this.setState({
            isAgreedToTerms: !isAgreedToTerms
        });
    };

    Formvalidation() {

        var str=''
        if (document.getElementById("password").value == "") {
            document.getElementById("lblpassword").innerHTML = "required"
           str +='password,'
        }
        else {
            document.getElementById("lblpassword").innerHTML = ""
        }

        if (document.getElementById("CPassword").value == "") {
            document.getElementById("lblCpassword").innerHTML = "required"
            str +='Cpassword,'
        }
        else {
            if(document.getElementById("CPassword").value != document.getElementById("password").value){
                document.getElementById("lblCpassword").innerHTML = "password mismatch"
                str +='Mismatchpassword,'
            }
            else{
                document.getElementById("lblCpassword").innerHTML = ""
            }           
        }


        if (document.getElementById("email").value == "") {
            document.getElementById("lblemail").innerHTML = "required"
           str +='lblemail,'
        }
        else {
            if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(document.getElementById("email").value))
            {
                document.getElementById("lblemail").innerHTML = ""
            }
            else{
                document.getElementById("lblemail").innerHTML = "email id is invalid"
            }
           
        }

        if (document.getElementById("Cemail").value == "") {
            document.getElementById("lblCemail").innerHTML = "required"
            str +='lblemail,'
        }
        else {
            if(document.getElementById("Cemail").value != document.getElementById("email").value){
                document.getElementById("lblCemail").innerHTML = "email mismatch"
                str +='lblCemail,'
            }
            else{
                document.getElementById("lblCemail").innerHTML = ""
            }           
        }

        if(str !='')
        {
            return false;
        }

    }

    render() {
        const { isAgreedToTerms } = this.state;
        return (
            <Grid className='sign-up-bottom-body'>
                <Grid.Row centered>
                    <Grid.Column width={12} textAlign='left'>
                        <Checkbox name='terms_agreed_check' className='terms-agreed-check' checked={isAgreedToTerms} onClick={this.agreedToTerms} required />
                        <span>
                            I have read and agree to the
                            <Link to={'/privacy-policy'} className='sign-up-bottom-span-links'> Privacy Policy </Link>
                            and
                            <Link to={'/terms-of-service/student'} className='sign-up-bottom-span-links'> Terms of Service </Link>
                            documents of ClassPorch.
                        </span>
                    </Grid.Column>
                </Grid.Row>

                <Grid.Row centered>
                    <Grid.Column width={12}>
                        <br />
                        <br />
                        <br />
                        <Button circular size='large' color='yellow' type='submit' onClick={this.Formvalidation}>CONTINUE</Button>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        );
    }
}