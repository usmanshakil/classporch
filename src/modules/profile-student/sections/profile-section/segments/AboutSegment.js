
import React, {Component} from 'react'
import { Grid, Icon, Input, Dropdown } from 'semantic-ui-react'
import '../../../styles.css'


class AboutSegment extends Component {

    onChangeField = (field,e,{value}) => {
        this.props.onChangeUserInfo(field,value)
    };

    onClickEdit = () => {
        this.props.toggleProfileMode('edit')
    };


    onFocusChange = (event, data) => {
        if(event.type==='focus'){
            event.target.type = 'date';
            event.target.click()
        }else{
            event.target.type = 'text'
        }
    };

    render(){
        const {profile,toggleProfileMode,mode, onChangeUserInfo,presentProfileId,userId} = this.props;
        
        const fullName = profile['full-name'];
        const birthdayDate = profile['birthday date'];
        const gender = profile['gender'] || 'N/A';
        return(
            <Grid padded relaxed style={{width:'100%',paddingTop:30}} >
                <Grid.Row stretched columns={1} centered >
                    <Grid.Column width={12} textAlign='left' >
                        <div className='sub-heading' > ABOUT </div>
                    </Grid.Column>
                </Grid.Row> 
                <Grid.Row stretched columns={2} centered >
                    <Grid.Column width={1} >
                        <Icon name='student' size='large' color='grey' />
                    </Grid.Column>
                    <Grid.Column width={3} textAlign='left'>
                    {
                        mode==='edit'?
                        <Input className='profile-text' disabled value={profile['full-name']} onChange={this.onChangeField.bind(this,'full-name')} /> 
                        :
                        <div className='profile-text' > {fullName} </div>
                    }
                    </Grid.Column>
                    <Grid.Column width={8} textAlign='left' >
                    {/*   presentProfileId === userId &&
                        <Icon name='edit' size='large' color='grey' className='edit-icon' onClick={this.onClickEdit} />
                    */}                    
                    </Grid.Column>
                </Grid.Row>
                {/*<Grid.Row stretched columns={2} centered >
                    <Grid.Column width={1} >
                        <Icon name='calendar' size='large' color='grey' />
                    </Grid.Column>
                    <Grid.Column width={3} textAlign='left' >
                    {
                        mode==='edit'?
                        <Input type='text' disabled onFocus={this.onFocusChange} onBlur={this.onFocusChange} 
                                onChange={this.onChangeField.bind(this,'birthday date')} 
                                className='profile-text' value={profile['birthday date']} required/>

                        :
                        <div className='profile-text' > {birthdayDate} </div>
                    }
                    </Grid.Column>
                    <Grid.Column width={8} textAlign='left' >
                    {   presentProfileId === userId &&
                        <Icon name='edit' size='large' color='grey' className='edit-icon' onClick={this.onClickEdit} />
                    }                    
                    </Grid.Column>
                </Grid.Row> */} 
                <Grid.Row stretched columns={1} centered >
                    <Grid.Column width={1} textAlign='left' >
                        <div style={{fontWeight:'bold'}} > Gender </div>
                    </Grid.Column>
                    <Grid.Column width={3} textAlign='left' >
                    {
                        mode==='edit'?
                        // <Dropdown placeholder='Select Gender' disabled fluid search selection className='profile-text' 
                        //             style={{height:'50px',borderRadius:0, fontSize:'1.2em'}}
                        //             onChange={this.onChangeField.bind(this,'gender')} value={profile['gender']}
                        //             options={[{key:'male',value:'male',text:'Male'},{key:'female',value:'female',text:'Female'},
                        //                         {key:'other',value:'other',text:'Other'}]} />
                        <Input type='text' disabled className='profile-text' style={{textTransform:"capitalize, height:'50px',borderRadius:0, fontSize:'1.2em"}} > {gender}</Input>
                        :
                        <div className='profile-text' style={{textTransform:"capitalize"}} > {gender} </div>
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

export default AboutSegment


{/* <Input className='profile-text' value={profile['birthday date']} onChange={this.onChangeField.bind(this,'birthday date')} />  */}

                        {/* <Input className='profile-text' value={profile['gender']} onChange={this.onChangeField.bind(this,'gender')} /> */}
