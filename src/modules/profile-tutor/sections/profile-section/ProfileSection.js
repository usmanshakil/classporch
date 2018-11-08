
import React, {Component} from 'react'
import { AboutSegment, EducationSegment, ContactSegment, SkillSegment, RateSegment } from './segments'

class ProfileSection extends Component {

    render(){
        const { profile,educationalAttributes,userId, role, authToken, firstName, presentProfileId, mode,
                onChangeEducation, onChangeSkill, toggleProfileMode } = this.props;
        return(
            <div style={{width:'100%',paddingBottom:'5em'}} >

                <AboutSegment profile={profile} 
                    mode={this.props.mode} presentProfileId={presentProfileId} userId={userId}
                    toggleProfileMode={this.props.toggleProfileMode} onChangeUserInfo={this.props.onChangeUserInfo} />

                <EducationSegment educationalAttributes={educationalAttributes} presentProfileId={presentProfileId}
                    onChangeEducation={onChangeEducation} toggleProfileMode={toggleProfileMode} mode={mode}
                    userId={userId} />
                
                <ContactSegment profile={profile}
                    mode={this.props.mode} userId={userId} presentProfileId={presentProfileId}
                    toggleProfileMode={this.props.toggleProfileMode} onChangeUserInfo={this.props.onChangeUserInfo} />

                <SkillSegment profile={profile} userId={userId} authToken={authToken} firstName={firstName} role={role}
                                presentProfileId = {presentProfileId} onChangeSkill={onChangeSkill} mode={mode}
                                toggleProfileMode={this.props.toggleProfileMode}  />

                <RateSegment profile={profile} userId={userId} presentProfileId={presentProfileId} 
                    mode={this.props.mode}
                    toggleProfileMode={this.props.toggleProfileMode} onChangeUserInfo={this.props.onChangeUserInfo} />

            </div>
        )
    }

}

export default ProfileSection

// const mapStateToProps = ({auth,profileState}) => {
//     const {profile, educationalAttributes} = profileState
//     // console.log(educationalAttributes)

//     return  {profile, educationalAttributes}
// }

// export default connect(mapStateToProps,{})(ProfileSection)

