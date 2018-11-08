import React, {Component} from 'react'
import {history} from '../../../../redux/store';
import {connect} from 'react-redux'
import RequestSession from './RequestSession'
import {
  Grid,
  Button,
  Form} from 'semantic-ui-react';
import './styles.css'

class HeaderSection extends Component {

  startUploading = (event) => {
    // this.setState({isUploadingFile: true});
    // this.props.uploadFile(event.target.files[0], {contentType: 'image/jpeg'});
    // event.target.value = null;
    console.log('Selected file:', event.target.files[0]);
    this.props.updateProfilePicture()
  };

  onFocusChange = (e) => {
    if(e.type==='focus'){
      e.target.type = 'file';
      e.target.click()
    }
  };

  redirectToChats = () => {
    const currentUser = {
      name: this.props.firstName + " " + this.props.lastName,
      role: this.props.role,
      id: this.props.userId
    };
    const otherUser = {
      name: this.props.profile["full-name"],
      role: 'tutor',
      id: this.props.presentProfileId
    };
    this.props.showMessages(currentUser, otherUser, null);
    history.push('/messages');
  };

  render() {
    const {userId, presentProfileId, profile, role} = this.props;
    return (
      <Grid padded relaxed style={{width: '100%', paddingTop: '40px'}}>
        <Grid.Row columns={1} centered>

          <Grid.Column width={6} textAlign='left'>
            <div style={styles.heading}>
              {userId === presentProfileId ?
                'Your Profile' : profile['full-name']}
            </div>
          </Grid.Column>
          <Grid.Column width={6} textAlign='right'>
            {/*<div>*/}
              {/*{userId === presentProfileId ?*/}

                {/*<Form loading={false} className='profile-picture-form' >*/}
                    {/*<Form.Field */}
                      {/*control={'input'} */}
                      {/*type='file' */}
                      {/*onFocus={this.onFocusChange}*/}
                      {/*onBlur={this.onFocusChange}*/}
                      {/*accept={'.jpg, .jpeg'} */}
                      {/*placeholder='Change profile picture'*/}
                      {/*className='image-input'*/}
                      {/*onChange={this.startUploading}/>*/}
                {/*</Form>*/}
                {/*:*/}
                {/*<div style={{display: 'flex', justifyContent: 'flex-end'}}>*/}
                  {/*<RequestSession profile={profile}/>*/}
                  {/*<Button*/}
                    {/*onClick={this.redirectToChats}*/}
                    {/*color='yellow'*/}
                    {/*style={{marginLeft: '15px'}}*/}
                    {/*content='MESSAGE'/>*/}
                {/*</div>*/}
              {/*}*/}
            {/*</div>*/}
          </Grid.Column>
        </Grid.Row>
      </Grid>
    )
  }
}

const styles = {
  text: {
    fontSize: '1.2em'
  },
  roleText: {
    fontWeight: 'bold',
    textTransform: 'capitalize'
  },
  heading: {
    fontSize: '40px',
    fontWeight: '300'
  }
};

// const mapStateToProps = ({auth,profileState}) => {
//     const role = auth.userObject.user.role

//     return  {role}
// }

export default connect(null, {})(HeaderSection)





                
{/* <form className='profile-picture-form'> 
<Form.Field name="myImage"
            type='text'
            onFocus={this.onFocusChange}
            onBlur={this.onFocusChange}
            control={'input'}
           accept={'.jpg, .jpeg'} 
           placeholder="Change Profile Picture"
           className='image-input'
           onChange={this.handleChange}/>
</form>  */}





//  <form className='profile-picture-form'> 
//                   <FileInput name="myImage"
//                              accept=".png,.gif"
//                              placeholder="Change Profile Picture"
//                              className='image-input'
//                              onChange={this.handleChange}/>
//                  </form> 