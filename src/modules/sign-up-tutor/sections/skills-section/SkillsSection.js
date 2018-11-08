
import React from 'react'
import {Grid, Dropdown, Input} from 'semantic-ui-react';
import {TutorList} from "../../../../helpers/utils";

class SkillsSection extends React.Component{

    constructor() {
        super();
        this.state = {
            customSkill: "",
            skills: TutorList.map((item, key) => {
                return {
                    key: key,
                    text: item,
                    value: key
                }
            })
        };
        this.onCustomSkillsChange = this.onCustomSkillsChange.bind(this);
        this.onSkillSubmit = this.onSkillSubmit.bind(this);
    }

    onCustomSkillsChange(e, {name, value}) {
        this.setState({customSkill: value})
    }

    onSkillSubmit() {
        const newSkills = {
            key: this.state.skills.length,
            value: this.state.skills.length,
            text: this.state.customSkill
        };
        this.setState({
            customSkill: "",
            skills: [newSkills, ...this.state.skills],
        });
    }


    handleAddition = (e, { value }) => {
        this.setState({
          skills: [{ text: value, value }, ...this.state.skills],
        })
    };

    handleChange = (e, { value }) => {
        const skillsNormalized = value.map(x => this.state.skills.filter(y => y.key === x)[0]);
        this.props.onChangeSkills(skillsNormalized)
    };
    
    renderLabel = label => ({
        color: 'yellow',
        content: `${label.text}`,
    });
      
    render(){
        const { skills } = this.state;
        const { selectedSkills } = this.props;
        const displayableSkills = selectedSkills.map(x => x.key );

        return (
            <Grid stackable className='sign-up-about-education-body'>
                <Grid.Row centered>
                    <Grid.Column width={12} textAlign='left'>
                        <p className='sign-up-label'>SKILLS YOU WANT TO TEACH</p>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row centered>
                    <Grid.Column width={12} textAlign='left'>
                        <Dropdown
                            options={skills}
                            placeholder='Start typing to search for a skill.'
                            search
                            selection
                            fluid
                            multiple
                            value={displayableSkills}
                            onAddItem={this.handleAddition}
                            onChange={this.handleChange}
                            renderLabel={this.renderLabel}
                        />
                    </Grid.Column>
                    <Grid.Column width={12} textAlign='left' style={{paddingTop: '30px'}}>
                        <Input name='last_name' placeholder='Custom Skills'
                               action={{content: "Add Skill", onClick: this.onSkillSubmit}} label="Custom Skills"
                               value={this.state.customSkill}
                               onChange={this.onCustomSkillsChange}/>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        );
    }

}


export default SkillsSection;