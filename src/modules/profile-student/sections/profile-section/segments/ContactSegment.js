
import React, {Component} from 'react'
import { Grid,Icon, Input } from 'semantic-ui-react'
import {connect} from 'react-redux'
import '../../../styles.css'

class ContactSegment extends Component {

    onChangeField = (field,e,{value}) => {
        this.props.onChangeUserInfo(field,value)
    };

    onClickEdit = () => {
        this.props.toggleProfileMode('edit')
    };

    render(){
        const {profile} = this.props;
        const phone = profile['phone'];
        const email = profile['email'];
        const {toggleProfileMode,mode, onChangeUserInfo, presentProfileId, userId} = this.props;
        return(
            <Grid padded relaxed style={{width:'100%',paddingTop:30}} >
                <Grid.Row stretched columns={1} centered >
                    <Grid.Column width={12} textAlign='left' >
                        <div className='sub-heading' > CONTACT DETAILS </div>
                    </Grid.Column>
                </Grid.Row> 
                <Grid.Row stretched columns={2} centered >
                    <Grid.Column width={1} >
                        <Icon name='mail' size='large' color='grey' />
                    </Grid.Column>
                    <Grid.Column width={3} textAlign='left'>
                    {
                        mode==='edit'?
                        <Input className='profile-text' value={profile['email']} onChange={this.onChangeField.bind(this,'email')} /> 
                        :
                        <div className='profile-text' > {email} </div>
                    }
                    </Grid.Column>
                    <Grid.Column width={8} textAlign='left' >
                        {   presentProfileId === userId &&
                            <Icon name='edit' size='large' color='grey' className='edit-icon' onClick={this.onClickEdit} />
                        }
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row stretched columns={2} centered >
                    <Grid.Column width={1} >
                        <Icon name='phone' size='large' color='grey' />
                    </Grid.Column>
                    <Grid.Column width={3} textAlign='left' >
                    {
                        mode==='edit' ?
                        <Input className='profile-text' value={profile['phone']} onChange={this.onChangeField.bind(this,'phone')} /> 
                        :
                        <div className='profile-text' > {phone} </div>
                    }
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
    text:{
        fontSize:15
    }
};


// const mapStateToProps = ({ profileState }) => {
//     const {profile} = profileState
//     return { profile }
// }

export default connect(null,{ })(ContactSegment)