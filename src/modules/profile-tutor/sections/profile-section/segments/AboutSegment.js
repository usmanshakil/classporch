import React, {Component} from 'react'
import {Grid, Icon} from 'semantic-ui-react'
import '../../../styles.css'


class AboutSegment extends Component {

    onChangeField = (field, e, {value}) => {
        this.props.onChangeUserInfo(field, value)
    };

    onClickEdit = () => {
        this.props.toggleProfileMode('edit')
    };


    onFocusChange = (event) => {
        if (event.type === 'focus') {
            event.target.type = 'date';
            event.target.click()
        } else {
            event.target.type = 'text'
        }
    };

    render() {
        const {profile} = this.props;

        const fullName = profile['full-name'];
        const birthdayDate = profile['birthday date'];
        const gender = profile['gender'];
        return (
            <Grid padded relaxed style={{width: '100%', paddingTop: 30}}>
                <Grid.Row stretched columns={1} centered>
                    <Grid.Column width={12} textAlign='left'>
                        <div className='sub-heading'> ABOUT</div>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row stretched columns={2} centered>
                    <Grid.Column width={1}>
                        <Icon name='student' size='large' color='grey'/>
                    </Grid.Column>
                    <Grid.Column width={3} textAlign='left'>
                        <div className='profile-text'> {fullName} </div>
                    </Grid.Column>
                    <Grid.Column width={8} textAlign='left'/>
                </Grid.Row>
                <Grid.Row stretched columns={2} centered>
                    <Grid.Column width={1}>
                        <Icon name='calendar' size='large' color='grey'/>
                    </Grid.Column>
                    <Grid.Column width={3} textAlign='left'>
                        <div className='profile-text'> {birthdayDate} </div>
                    </Grid.Column>
                    <Grid.Column width={8} textAlign='left'/>
                </Grid.Row>
                <Grid.Row stretched columns={1} centered>
                    <Grid.Column width={1} textAlign='left'>
                        <div style={{fontWeight: 'bold'}}> Gender</div>
                    </Grid.Column>
                    <Grid.Column width={3} textAlign='left'>
                        <div className='profile-text' style={{textTransform: "capitalize"}}> {gender} </div>
                    </Grid.Column>
                    <Grid.Column width={8} textAlign='left'/>
                </Grid.Row>
            </Grid>
        )
    }
}

export default AboutSegment;