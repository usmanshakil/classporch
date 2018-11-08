import React from 'react';
import {Grid, Form, TextArea, Button} from 'semantic-ui-react';
import logoDark from '../../assets/logo_dark.png';

import './index.scss';
export default class ContactUs extends React.Component {
  
  render() {
    return (
      <Grid container centered stretched columns={2} className='contact-section' id={'contact-us'}>
        <Grid.Row centered>
          <Grid.Column textAlign='left' width={12}
                       style={{fontSize: 64, marginTop: 24, marginBottom: 32, fontWeight: 300}}>
            Contact Us
          </Grid.Column>
        </Grid.Row>
        <Grid.Row centered stretched>
          <Grid.Column textAlign='left' width={6} style={{marginTop: 16, marginBottom: 16}}>
            <Grid>
              <Grid.Row>
                <Form style={{width: '100%'}}>
                  <Form.Input name={'name'} label='Your name' placeholder='John Doe'/>
                  <Form.Input name={'email'} label='Email' placeholder='johndoe@classporch.com'/>
                  <Form.Input name={'mobile'} label='Mobile Number' placeholder='Please enter with your country code'/>
                  <Form.Field name={'message'} label='Your message' control={TextArea} rows='6'/>
                  <Button type='submit' style={{float: 'right', marginRight: '20px'}}>Submit</Button>
                </Form>
              </Grid.Row>
            </Grid>
          </Grid.Column>
          <Grid.Column textAlign='left' width={6} style={{fontSize: 14, marginTop: 16, marginBottom: 16}}>
            <Grid>
              <Grid.Row>
                <div style={{marginLeft: 32, marginTop: 23}}>
                    <img src={logoDark} className='navBar-logo' role='presentation'/>
                  {/*<Image href={}></Image>*/}
                </div>
              </Grid.Row>
            </Grid>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}