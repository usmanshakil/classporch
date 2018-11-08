import React, {Component} from 'react';
import {Grid, Image, Button, Modal, Dropdown, Input} from 'semantic-ui-react';
import './styles.css';
import faker from 'faker'
import moment from 'moment'
import {history} from '../../../../redux/store';
import {SingleDatePicker} from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';
import TimeKeeper from 'react-timekeeper';

import {connect} from 'react-redux';
import {sessionRequested} from '../../../../redux/actions';


class RequestSession extends Component {

    state = {
        modalVisible: false,
        dimmer: 'blurring',
        selectedSkillId: null,
        date: null,
        focusedDate: false,
        startTime: '10:00 am',
        displayClock: false,
        duration: '1',
        billedAmount: '0',
        message: '',
        showMessage: false,
        isAmountLess: false
    };

    componentWillUnmount() {
        this.initializeState()
    }

    initializeState = () => {
        this.setState({
            selectedSkillId: null,
            date: null,
            focusedDate: false,
            startTime: '10:00 am',
            displayClock: false,
            duration: '1',
            billedAmount: '0',
            message: '',
            showMessage: false,
            isAmountLess: false
        })
    };

    bookSession(tutorId, skill, authToken, sessionStartTime, sessionEndTime, amountPaid, userId) {
        this.props.sessionRequested({tutorId, skill, authToken, sessionStartTime, sessionEndTime, amountPaid, userId});
        this.setState({selectedSkillId: null, date: null})
    }

    proceed = (e) => {
        const {profile, authToken, userId} = this.props;

        let {selectedSkillId, date, startTime, duration, billedAmount: amountPaid} = this.state;
        if (selectedSkillId === null || date === null) {
            this.setState({message: 'Please enter the required fields.', showMessage: true});
            return
        }
        if (parseFloat(this.props.dashboard.profile.credits) < this.state.billedAmount) {
            this.setState({message: 'Not enough credits in your wallet.', showMessage: true, isAmountLess: true});
            return
        }
        this.close();
        const tutorId = profile.id;
        const skill = {"id": selectedSkillId, "name": "RoR"};
        const {sessionStartTime, sessionEndTime} = this.getSessionStartTime(date, startTime, duration);
        this.bookSession(tutorId, skill, authToken, sessionStartTime, sessionEndTime, amountPaid, userId)
    };

    addMoney = () => {
        history.push('/add-credits')
    };


    getSessionStartTime = (date, startTime, duration) => {
        duration = parseInt(duration);
        // eslint-disable-next-line
        let dateNormalized = moment(date).add(-12, 'hours');
        // eslint-disable-next-line
        let hrs = parseInt(startTime.split(':')[0]);
        let mins = parseInt(startTime.split(':')[1].split(' ')[0]);
        let ampm = startTime.split(':')[1].split(' ')[1];
        let ampmHrs = ampm === 'am' ? 0 : 12;
        let addHrs = hrs + ampmHrs;

        let sessionStartTime = moment(dateNormalized)
            .add(addHrs, 'hours')
            .add(mins, 'minutes')
            .valueOf();

        let sessionEndTime = moment(sessionStartTime)
            .add(duration, 'hours')
            .valueOf();

        console.log(moment(sessionStartTime).format('MMMM DD YYYY HH mm ss A'));
        console.log(moment(sessionEndTime).format('MMMM DD YYYY HH mm ss A'));

        return {sessionStartTime, sessionEndTime}

    };

    onSelectSkill = (e, {value}) => this.setState({selectedSkillId: value});
    onChangeDuration = (e, {value}) => {
        const amount = parseFloat(value) * parseFloat(this.props.profile["hourly-rate"]);
        this.setState({
            duration: value,
            billedAmount: amount.toFixed(2)
        })
    };

    getDurations = (maxDuration) => {
        let arrayDuration = [];
        for (let i = 0; i < maxDuration; i++) {
            let inHrs = (i + 1).toString();
            arrayDuration.push({key: inHrs, value: inHrs, text: inHrs})
        }
        return arrayDuration
    };

    showModal = () => this.setState({modalVisible: true});
    close = () => this.setState({modalVisible: false});

    render() {
        let {profile} = this.props;
        let {dimmer, modalVisible} = this.state;
        let skills = [{key: 1, value: "1", text: "1"}];
        let durations = this.getDurations(5);

        return (

            <Grid.Row textAlign='center'>

                <Button
                    onClick={this.showModal}
                    color='yellow'
                    content='BOOK A SESSION'/>

                <Modal size={'small'} dimmer={dimmer} open={modalVisible} onClose={this.close}>
                    <Modal.Header> Request {profile['full-name']} for a session ? </Modal.Header>
                    <Modal.Content className='modal-layout'>
                        <Image wrapped size='medium'
                               src={profile['profile-picture'] ? profile['profile-picture'] : faker.internet.avatar()}
                               shape='circular'/>
                        <div className='request-form'>
                            <div className='request-section'>
                                <div className='field'>Skill</div>
                                <Dropdown placeholder='Select a skill' fluid selection options={skills}
                                          onChange={this.onSelectSkill} className='value' required/>
                            </div>
                            <div className='request-section'>
                                <div className='field'>Start Date</div>
                                <SingleDatePicker
                                    date={this.state.date} // momentPropTypes.momentObj or null
                                    onDateChange={date => this.setState({date})} // PropTypes.func.isRequired
                                    focused={this.state.focusedDate} // PropTypes.bool
                                    onFocusChange={({focused}) => this.setState({focusedDate: focused})}
                                    required={true}
                                    numberOfMonths={1}
                                    className='value' // PropTypes.func.isRequired
                                />
                            </div>
                            <div className='request-section'>
                                <div className='field'>Start Time</div>
                                {this.state.displayClock ?
                                    <TimeKeeper time={this.state.startTime}
                                                onChange={(time) => this.setState({startTime: time.formatted})}
                                                onDoneClick={() => this.setState({displayClock: false})}
                                                switchToMinuteOnHourSelect={true}/> :
                                    <div onClick={() => this.setState({displayClock: true})} className='value'>
                                        <Input defaultValue={this.state.startTime} className='time-input'/>
                                    </div>
                                }
                            </div>
                            <div className='request-section'>
                                <div className='field'>Session Duration</div>
                                <Dropdown placeholder='duration in hrs' fluid selection options={durations} required
                                          onChange={this.onChangeDuration} className='value'/>
                            </div>
                        </div>

                    </Modal.Content>
                    <Modal.Actions>
                        <button className='message-box'>
                            {this.state.showMessage ? this.state.message : null}
                        </button>
                        <Button color='black' onClick={this.close}>
                            Cancel
                        </Button>
                        {
                            this.state.isAmountLess ?
                                <Button positive onClick={this.addMoney}>
                                    Add <span className='money-text'>${this.state.billedAmount} </span> to wallet
                                </Button>
                                :
                                <Button positive onClick={this.proceed}>
                                    Proceed & Pay <span className='money-text'>${this.state.billedAmount} </span>
                                </Button>
                        }
                    </Modal.Actions>
                </Modal>
            </Grid.Row>
        )
    }

}

const mapStateToProps = ({dashboard, auth}) => {
    const {authToken, id: userId} = auth;
    return {dashboard, authToken, userId}
};


export default connect(mapStateToProps, {sessionRequested})(RequestSession)
