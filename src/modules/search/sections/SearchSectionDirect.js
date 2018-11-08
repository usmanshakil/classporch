import React, { Component } from 'react';
import { Grid, Image, Button, Modal, Dropdown, Input } from 'semantic-ui-react';
// import './styles.css';
import faker from 'faker'
import moment from 'moment'
import { SingleDatePicker} from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';
import TimeKeeper from 'react-timekeeper';

import { connect } from 'react-redux';
import { sessionRequested } from '../../../redux/actions';


class SearchSectionDirect extends Component {

	state = {
		modalVisible:false,
		dimmer:'blurring',
		selectedSkillId:null,
		date:null,
		focusedDate:false,
		startTime:'10:00 am',
		displayClock:false,
		duration:'1'
	};

	bookSession(tutorId,skill,authToken,sessionStartTime,sessionEndTime){
		this.props.sessionRequested({tutorId,skill,authToken,sessionStartTime,sessionEndTime});
		this.setState({ selectedSkillId:null, date:null })
	}
	
	proceed = (e) => {
		const { authToken, result } = this.props;
		let { selectedSkillId,date,startTime,duration } = this.state;
		if(selectedSkillId===null || date===null ){
			return
		}
		this.close();
		const tutorId = result.id;
		const skill = { "id":selectedSkillId, "name":"RoR" };
		const {sessionStartTime, sessionEndTime} = this.getSessionStartTime(date,startTime,duration);
		this.bookSession(tutorId,skill,authToken,sessionStartTime,sessionEndTime)
	};

	getSessionStartTime = (date,startTime,duration) => {
		duration = parseInt(duration);
		let dateNormalized = moment(date).add(-12,'hours');

		let hrs = parseInt(startTime.split(':')[0]);
		let mins = parseInt(startTime.split(':')[1].split(' ')[0]);
		let ampm = startTime.split(':')[1].split(' ')[1];
		let ampmHrs = ampm === 'am' ? 0 : 12;
		let addHrs = hrs + ampmHrs;

		let sessionStartTime = moment(dateNormalized)
							.add(addHrs,'hours')
							.add(mins,'minutes')
							.valueOf();

		let sessionEndTime = moment(sessionStartTime)
							.add(duration,'hours')
							.valueOf();

		console.log(moment(sessionStartTime).format('MMMM DD YYYY HH mm ss A'));
		console.log(moment(sessionEndTime).format('MMMM DD YYYY HH mm ss A'));

		return { sessionStartTime, sessionEndTime }
		
	};

	onSelectSkill = (e,{value}) => this.setState({ selectedSkillId:value });
	onChangeDuration = (e,{value}) => this.setState({ duration:value });

	getDurations = (maxDuration) => {
		let arrayDuration = [];
		for(let i=0;i<maxDuration;i++){
			let inHrs = (i+1).toString();
			arrayDuration.push({ key: inHrs, value: inHrs, text: inHrs })
		}
		return arrayDuration
	};
	
	showModal = () => this.setState({ modalVisible:true });
	close = () => this.setState({ modalVisible:false });

	render(){
		let { result, dashboard, authToken } = this.props;
		let { dimmer,modalVisible } = this.state;
		// let skills = result["skills-ids"].map(skillId => {
		// 	return { key: skillId, value: skillId.toString(), text:skillId.toString() }
        // })
        let skills = [ { key: 1, value: "1", text:"1" } ];
		let durations = this.getDurations(5);

		return(

            <Grid.Row textAlign='center' key={result.id} style={{height:'140px'}} > 
                <Grid.Column width={2}>
                    <Image src={faker.internet.avatar()} shape='circular' size='tiny' />
                </Grid.Column>
                <Grid.Column width={4}>
                    <div style={{textTransform:'capitalize',fontSize:16}}> {result.full_name} </div>
                </Grid.Column>
                <Grid.Column width={10}>
                    <Button 
                        onClick={ this.showModal }  
                        color='yellow'
                        content='BOOK A SESSION' />
                </Grid.Column>
                
				<Modal size={'small'} dimmer={dimmer} open={modalVisible} onClose={this.close} >
					<Modal.Header> Request {result.full_name} for a session ? </Modal.Header>
						<Modal.Content className='modal-layout' >
							<Image wrapped size='medium' src={ result['picture']?result['picture']: faker.internet.avatar()}
									shape='circular' />
							<div className='request-form'>
								<div className='request-section'>
									<div className='field'>Skill</div>
									<Dropdown placeholder='Select a skill' fluid selection options={skills}
										onChange={this.onSelectSkill} className='value' required />
								</div>
								<div className='request-section'>
									<div className='field'>Start Date</div>
										<SingleDatePicker
											date={this.state.date} // momentPropTypes.momentObj or null
											onDateChange={date => this.setState({ date })} // PropTypes.func.isRequired
											focused={this.state.focusedDate} // PropTypes.bool
											onFocusChange={({ focused }) => this.setState({ focusedDate:focused })}
											required={true}
											numberOfMonths={1}
											className='value' // PropTypes.func.isRequired
										/>
								</div>
								<div className='request-section'>
									<div className='field'>Start Time</div>
									{ this.state.displayClock? 
										<TimeKeeper time={this.state.startTime} onChange={(time)=> this.setState({ startTime:time.formatted })}
											onDoneClick={()=> this.setState({ displayClock:false }) } switchToMinuteOnHourSelect={true}  /> :
										<div onClick={()=> this.setState({ displayClock:true })} className='value' >
											 <Input defaultValue={this.state.startTime} className='time-input' />
										</div>
									}
								</div>
								<div className='request-section'>
									<div className='field'>Session Duration</div>
									<Dropdown placeholder='duration in hrs' fluid selection options={durations} required
										onChange={this.onChangeDuration} className='value' />
								</div>
							</div>

						</Modal.Content>
						<Modal.Actions>
							<Button color='black' onClick={this.close}>
								Cancel
							</Button>
							<Button positive onClick={this.proceed}>
								 Proceed 
							</Button>
						</Modal.Actions>
					</Modal>
            </Grid.Row>
        )
	}

} 

const mapStateToProps = ({dashboard,auth}) => {
	const authToken = auth.userObject.session.auth_token;
	return { dashboard, authToken }
};

export default connect( mapStateToProps, { sessionRequested  } )(SearchSectionDirect)
