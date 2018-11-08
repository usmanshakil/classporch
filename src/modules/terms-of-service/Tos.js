import React from 'react';
import {Link} from 'react-router-dom';
import {Grid, Button} from 'semantic-ui-react';

export default class TermsOfService extends React.Component {
  render() {
    return (
      <Grid>
        <Grid.Row centered style={{marginTop: 32, marginBottom: 32, fontSize: 32, fontWeight: 300}}>
          We have seperate terms for students and tutors.
        </Grid.Row>
        <Grid.Row centered style={{height: '40vh'}}>
          <Grid.Column width={2}>
            <Link to={'/terms-of-service/student'}>
              <Button>Students</Button>
            </Link>
          </Grid.Column>
          <Grid.Column width={2}>
            <Link to={'/terms-of-service/tutor'}>
              <Button>Tutors</Button>
            </Link>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
};