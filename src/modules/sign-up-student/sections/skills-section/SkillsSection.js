import React from 'react'
import {Grid, Dropdown, Input, Button} from 'semantic-ui-react';
import {TutorList} from "../../../../helpers/utils";

class SkillsSection extends React.Component {


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
            }),
            searchQuery:''
            
        };
        this.onCustomSkillsChange = this.onCustomSkillsChange.bind(this);
        this.onSkillSubmit = this.onSkillSubmit.bind(this);
        this.searchInputHandle=this.searchInputHandle.bind(this);
    }

    componentDidMount() {
    }

    onCustomSkillsChange(e, {name, value}) {
        this.setState({customSkill: value})
    }

    onSkillSubmit(e) {
		e.preventDefault();
        const newSkills = {
            key: this.state.skills.length,
            value: this.state.skills.length,
            text: this.state.customSkill
        };
        this.setState({
            customSkill: "",
            skills: [newSkills, ...this.state.skills],
        });
        console.log(this.state)
    }
    searchInputHandle(e)
    {
		this.setState({searchQuery:e.target.value})
	}

    handleAddition = (e, {value}) => {
       
        if (value.length <= 20) {
            this.setState({
                skills: [{text: value, value}, ...this.state.skills],
            })
        }

    };

    handleChange = (e, {value}) => {    

     
        const skillsNormalized = value.map(x => this.state.skills.filter(y => y.key === x)[0]);
        this.props.onChangeSkills(skillsNormalized)
        var select = document.querySelector('.selectpicker');
        var inner = select.querySelectorAll('.search');
        this.setState({placeholder:""});

        var ta = document.getElementsByClassName("search")[1];
        var r=ta.value
        ta.value=''

        var res1= document.querySelector( ".sizer" );
        var resm1= document.querySelector( ".sizer" ).innerHTML;
        document.querySelector( ".sizer" ).innerHTML=''
        var resm11= document.querySelector( ".sizer" ).innerHTML;
        this.setState({searchQuery:""})
     
        };

    renderLabel = label => ({
        color: 'yellow',
        content: `${label.text}`,
    });

    render() {
        const {skills} = this.state;
        const {selectedSkills} = this.props;
        const displayableSkills = selectedSkills.map(x => x.key);
        return (
            <Grid stackable className='sign-up-about-education-body'>
                <Grid.Row centered>
                    <Grid.Column width={12} textAlign='left'>
                        <p className='sign-up-label'>SUBJECTS/SKILLS YOU WANT TO LEARN</p>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row centered>
                    <Grid.Column width={12} textAlign='left'>
                        {/* <Input name='skills' fluid placeholder='Start typing to search for a skill.' onKeyPress={this.addNewSkill}/> */}
                        <Dropdown
                            options={skills}
                            placeholder="Start typing to search for a skill."
                            search
                            selection
                            fluid
                            multiple
                            className="selectpicker"
                            value={displayableSkills}
                            onAddItem={this.handleAddition}
                            onChange={this.handleChange}
                            renderLabel={this.renderLabel}
                            searchQuery={this.state.searchQuery}
                            onSearchChange={this.searchInputHandle}
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


export default SkillsSection

function capitalize(str = '') {
    if (!str) return;
    return str.trim().split('')
        .map((char, i) => i === 0 ? char.toUpperCase() : char)
        .reduce((final, char) => final += char, '')
}
