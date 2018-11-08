import React from 'react'
import {connect} from 'react-redux'
import {Grid, Image, Button} from 'semantic-ui-react';
import faker from 'faker'
import {history} from '../../../redux/store';
import {setPresentProfile} from '../../../redux/actions';


class SearchSection extends React.Component {

  onClick = (e) => {
    const userId = this.props.result.id;
    this.props.setPresentProfile({userId});
    history.push('/profile/tutor')
  };

  render() {
    const {result} = this.props;
    return (
      <Grid.Row textAlign='center' key={result.id} style={{height: '140px'}}>
        <Grid.Column width={2}>
          <Image src={faker.internet.avatar()} shape='circular' size='tiny'/>
        </Grid.Column>
        <Grid.Column width={4}>
          <div style={{textTransform: 'capitalize', fontSize: 16}}> {result.full_name} </div>
        </Grid.Column>
        <Grid.Column width={10}>
          <Button
            color='yellow'
            onClick={this.onClick}
            content='VISIT PROFILE'/>
        </Grid.Column>
      </Grid.Row>
    )
  }
}


export default connect(null, {setPresentProfile})(SearchSection)

