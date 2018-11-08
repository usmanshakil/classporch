import React, { Component } from "react"
import { Grid, Icon, Input, Dropdown } from "semantic-ui-react"
import { connect } from "react-redux"
import moment from "moment"
import "../../../styles.css"

class EducationSegment extends Component {
  gradesList = [
    { key: "Grade 1", value: "Grade 1", text: "Grade 1" },
    { key: "Grade 2", value: "Grade 2", text: "Grade 2" },
    { key: "Grade 3", value: "Grade 3", text: "Grade 3" },
    { key: "Grade 4", value: "Grade 4", text: "Grade 4" },
    { key: "Grade 5", value: "Grade 5", text: "Grade 5" },
    { key: "Grade 6", value: "Grade 6", text: "Grade 6" },
    { key: "Grade 7", value: "Grade 7", text: "Grade 7" },
    { key: "Grade 8", value: "Grade 8", text: "Grade 8" },
    { key: "Grade 9", value: "Grade 9", text: "Grade 9" },
    { key: "Grade 10", value: "Grade 10", text: "Grade 10" },
    { key: "Grade 11", value: "Grade 11", text: "Grade 11" },
    { key: "Grade 12", value: "Grade 12", text: "Grade 12" },
    { key: "Year 1", value: "Year 1", text: "Year 1" },
    { key: "Year 2", value: "Year 2", text: "Year 2" },
    { key: "Year 3", value: "Year 3", text: "Year 3" },
    { key: "Year 4", value: "Year 4", text: "Year 4" },
  ]

  onClickEdit = () => {
    this.props.toggleProfileMode("edit")
  }

  onClickEdit = () => {
    this.props.toggleProfileMode("edit")
  }

  onChangeField = (index, action, field, e, { value }) => {
    this.props.onChangeEducation(index, action, this.props.educationalAttributes, field, value)
  }

  onClickDelete = (index, action) => {
    this.props.onChangeEducation(index, action, this.props.educationalAttributes)
  }

  onAddEducation = (index, action) => {
    this.props.onChangeEducation(index, action, this.props.educationalAttributes)
  }

  onFocusChange = (event, data) => {
    if (event.type === "focus") {
      event.target.type = "date"
      event.target.click()
    } else {
      event.target.type = "text"
    }
  }

  getEducationBlocks = educationalAttributes => {
    const { profile, toggleProfileMode, mode, onChangeUserInfo, presentProfileId, userId } = this.props

    return educationalAttributes.map((education, i) => {
      let startYear = moment(education["start_education"]).format("YYYY")
      let finishYear = moment(education["finish_education"]).format("YYYY")

    

      return (
        <Grid padded relaxed style={{ width: "100%" }}>
          <Grid.Row stretched columns={3} centered key={i}>
            <Grid.Column width={1}>
              <Icon name="university" size="large" color="grey" />
            </Grid.Column>
            <Grid.Column width={3} textAlign="left">
              {mode === "edit" ? (
                <Input
                  className="profile-text"
                  defaultValue={education["university_name"]}
                  placeholder="college/university name"
                  onChange={this.onChangeField.bind(this, i, "edit", "university_name")}
                />
              ) : (
                <div className="profile-text"> {education["university_name"] ? education["university_name"] : education["university-name"]} </div>
              )}
              <br />
              {mode === "edit" ? (
                <Dropdown
                  placeholder="Select Grade"
                  fluid
                  search
                  selection
                  className="profile-text"
                  style={{ height: "50px", borderRadius: 0, fontSize: "1.2em" }}
                  onChange={this.onChangeField.bind(this, i, "edit", "grade")}
                  value={education["grade"]}
                  options={this.gradesList}
                />
              ) : (
                <div className="profile-text" style={{ textTransform: "capitalize" }}>
                  {education["grade"]}
                </div>
              )}
            </Grid.Column>
            <Grid.Column width={8} textAlign="left">
              {mode === "edit" && (
                <Icon
                  name="delete"
                  size="large"
                  color="red"
                  className="edit-icon"
                  onClick={this.onClickDelete.bind(this, i, "delete")}
                />
              )}
            </Grid.Column>
          </Grid.Row>
          {mode === "edit" && [
            <Grid.Row stretched columns={3} centered key={i}>
              <Grid.Column centered width={1} textAlign="left" />
              <Grid.Column centered width={3} textAlign="left">
                <Input
                  fluid
                  name={"start_education"}
                  type="text"
                  placeholder="Start Date * (dd/mm/yyyy)"
                  defaultValue={education["start_education"]}
                  onFocus={this.onFocusChange}
                  min="1970-01-01"
                  max={moment().format("Y-mm-D")}
                  onBlur={this.onFocusChange}
                  required
                  onChange={this.onChangeField.bind(this, i, "edit", "start_education")}
                />
              </Grid.Column>
              <Grid.Column centered width={8} textAlign="left" />,
            </Grid.Row>,
            <Grid.Row stretched columns={3} centered key={i}>
              <Grid.Column centered width={1} textAlign="left" />
              <Grid.Column centered width={3} textAlign="left">
                <Input
                  fluid
                  name={"finish_education"}
                  type="text"
                  placeholder="Finish Date * (dd/mm/yyyy)"
                  defaultValue={education["finish_education"]}
                  onFocus={this.onFocusChange}
                  min="1970-01-01"
                  max={moment().format("Y-mm-D")}
                  onBlur={this.onFocusChange}
                  required
                  onChange={this.onChangeField.bind(this, i, "edit", "finish_education")}
                />
              </Grid.Column>
              <Grid.Column centered width={8} textAlign="left" />,
            </Grid.Row>,
          ]}
        </Grid>
      )
    })
  }

  render() {
    const educationBlocks = this.getEducationBlocks(this.props.educationalAttributes)
    const { profile, toggleProfileMode, mode, onChangeUserInfo, presentProfileId, userId } = this.props
    return (
      <Grid padded relaxed style={{ width: "100%", paddingTop: 30 }}>
        <Grid.Row stretched columns={2} centered>
          <Grid.Column width={4} textAlign="left">
            <div className="sub-heading" style={{ marginTop: "0px" }}>
              EDUCATION
            </div>
          </Grid.Column>
          <Grid.Column width={8} textAlign="left">
            {presentProfileId === userId && (
              <Icon name="edit" size="large" color="grey" className="edit-icon" onClick={this.onClickEdit} />
            )}
          </Grid.Column>
        </Grid.Row>
        {educationBlocks}
        <Grid.Row stretched centered>
          <Grid.Column width={1} textAlign="left" />
          <Grid.Column width={3} textAlign="left" />
          <Grid.Column width={8} textAlign="left">
            {mode === "edit" && (
              <Icon
                name="add"
                size="large"
                color="green"
                className="edit-icon"
                onClick={this.onAddEducation.bind(this, this.props.educationalAttributes.length + 1, "add")}
              />
            )}
          </Grid.Column>
        </Grid.Row>
      </Grid>
    )
  }
}

const styles = {
  heading: {
    fontSize: "1.1em",
    fontWeight: 600,
    marginTop: "40px",
  },
  text: {
    fontSize: 15,
  },
}

// const mapStateToProps = ({ profileState }) => {
//     const {profile} = profileState
//     return { profile }
// }

export default connect(null, {})(EducationSegment)
