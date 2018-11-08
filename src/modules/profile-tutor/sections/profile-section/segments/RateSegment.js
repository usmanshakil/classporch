
import React, {Component} from 'react'
import { Grid, Icon, Input } from 'semantic-ui-react'
import {connect} from 'react-redux'
import '../../../styles.css'

class RateSegment extends Component {

    onChangeRate = (e,{value}) => {
        this.props.onChangeUserInfo('hourly-rate',value )
    };

    onClickEdit = () => {
        this.props.toggleProfileMode('edit')
    };

    render(){
        const {profile,presentProfileId,userId, toggleProfileMode,mode, onChangeUserInfo} = this.props;
        const name = profile['full-name'] ? profile['full-name'].split(' ')[0].toUpperCase() : null;
        
        return(
            <Grid padded centered style={{paddingTop:30}} >
                <Grid.Row >
                    <Grid.Column width={12} textAlign='left' >
                        <div className='sub-heading' > 
                        { userId === presentProfileId ? 
                            "YOUR HOURLY RATE" : name + "'S HOURLY RATE" }
                        </div>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row style={{marginTop:'15px'}} >
                    <Grid.Column width={1} textAlign='left' style={{marginLeft:'10px'}} >
                        { 
                            mode === 'edit' ? 
                            <Input className='profile-rate' value={profile['hourly-rate']} onChange={this.onChangeRate} type='number' /> : 
                            <div className='profile-rate'> {profile['hourly-rate']} </div> 
                        }
                    </Grid.Column>
                    <Grid.Column width={2} textAlign='left'>
                        <div style={styles.rateDesc}> $ per hour </div>
                    </Grid.Column>
                    <Grid.Column width={8} textAlign='left' >
                    {   presentProfileId === userId &&
                        <Icon name='edit' size='large' color='grey' className='edit-icon' onClick={this.onClickEdit} />
                    }                    
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        )
    }
}


const styles = {
    heading:{
        fontSize:'1.1em',
        fontWeight:600,
        marginTop:'40px'
    },
    rate:{
        fontSize:'2em'
    },
    rateDesc:{
        fontSize:'2em',
        color:'#ccc'
    }
};


// const mapStateToProps = ({ profileState }) => {
//     const {profile} = profileState
//     return { profile }
// }
export default connect(null,{ })(RateSegment)