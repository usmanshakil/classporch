import React, {Component} from 'react'
import {Grid, Icon} from 'semantic-ui-react'
import {connect} from 'react-redux'
import moment from 'moment'
import '../../../styles.css'


class EducationSegment extends Component {

    onClickEdit = () => {
        this.props.toggleProfileMode('edit')
    };

    onChangeField = (index, action, field, e, {value}) => {
        this.props.onChangeEducation(index, action, this.props.educationalAttributes, field, value)
    };

    onClickDelete = (index, action) => {
        this.props.onChangeEducation(index, action, this.props.educationalAttributes)
    };

    onAddEducation = (index, action) => {
        this.props.onChangeEducation(index, action, this.props.educationalAttributes)
    };

    onFocusChange = (event, data) => {
        if (event.type === 'focus') {
            event.target.type = 'date';
            event.target.click()
        } else {
            event.target.type = 'text'
        }
    };

    getEducationBlocks = (educationalAttributes) => {
        const {mode, presentProfileId, userId} = this.props;

        return educationalAttributes.map((education, i) => {
            let startYear = moment(education['start_education']).format('YYYY');
            let finishYear = moment(education['finish_education']).format('YYYY');
            return (
                <Grid.Row stretched columns={3} centered key={i}>
                    <Grid.Column width={1}>
                        <Icon name='university' size='large' color='grey'/>
                    </Grid.Column>
                    <Grid.Column width={6} textAlign='left'>
                        <div className='profile-text'> {education['university_name']} </div>
                        <br/>
                        <div className='profile-text'> {startYear} - {finishYear} </div>
                    </Grid.Column>
                    <Grid.Column width={5} textAlign='left'/>
                </Grid.Row>
            )
        })
    };

    render() {
        const educationBlocks = this.getEducationBlocks(this.props.educationalAttributes);
        const {mode, presentProfileId, userId} = this.props;

        return (
            <Grid padded relaxed style={{width: '100%', paddingTop: 30}}>
                <Grid.Row stretched columns={2} centered>
                    <Grid.Column width={4} textAlign='left'>
                        <div style={{fontSize: '1.1em', fontWeight: 600}}> EDUCATION</div>
                    </Grid.Column>
                    <Grid.Column width={8} textAlign='left'/>
                </Grid.Row>
                {educationBlocks}
            </Grid>
        )
    }
}

const styles = {
    heading: {
        fontSize: '1.1em',
        fontWeight: 600,
        marginTop: '40px'
    },
    text: {
        fontSize: 15
    }
};

// const mapStateToProps = ({ profileState }) => {
//     const {profile} = profileState
//     return { profile }
// }

export default connect(null, {})(EducationSegment)