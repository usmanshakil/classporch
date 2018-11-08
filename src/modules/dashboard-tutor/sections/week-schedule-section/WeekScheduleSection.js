
import React from 'react';
import {Grid,Icon} from 'semantic-ui-react';
import './styles.css';
import { connect } from 'react-redux';
import { MorningSchedule, AfternoonSchedule, EveningSchedule } from './charts'
import moment from 'moment'


class WeekScheduleSection extends React.Component {

  state = {
    schedules:[],
    displayedScheduleSequence:0
  };

  componentDidMount(){
    const weekSchedule = this.props.weekSchedule.data;
    if (weekSchedule) { 
      const organizedData = this.sortSchedule(weekSchedule);
      const schedules = [
        { key: 'morning',sequence:-1, value : <MorningSchedule data={organizedData} /> },
        { key: 'afternoon',sequence:0,value: <AfternoonSchedule data={organizedData} /> },
        { key:'evening',sequence:1,value: <EveningSchedule data={organizedData} /> },
      ];
      this.setState({ schedules })
    }
  }

  onFetchPreviousWeek = () => {

  };

  onFetchNextWeek = () => {

  };

  getDayStartDayTime = (anyTime) => {
    // let anyTime = Date.now()
    let hrs = moment(anyTime).format('HH');
    let mins = moment(anyTime).format('mm');
    let secs = moment(anyTime).format('ss');

    let subHrs = parseInt(hrs);
    let subMins = parseInt(mins);
    let subSecs = parseInt(secs);

    let startDayTimeStamp = moment(anyTime)
      .add(-subHrs,'hours')
      .add(-subMins,'minutes')
      .add(-secs,'seconds')
      .valueOf();
    return startDayTimeStamp
  };


  getParticularDayData = (dayFullSchedule,day) => {
    if(!dayFullSchedule.length || !dayFullSchedule){
      return { morningData:[], afternoonData:[], eveningData:[]  }
    }
	  const startTime = this.getDayStartDayTime(dayFullSchedule[0]['start-time']);
    if(!dayFullSchedule[0]['start-time']){
      return { morningData:[], afternoonData:[], eveningData:[]  }
    }
    const timestamp8AM = moment(startTime).add(8,'hours').valueOf();
    const timestamp4PM = moment(timestamp8AM).add(8,'hours').valueOf();
    const timestamp12AM = moment(timestamp4PM).add(8,'hours').valueOf();

    const morningData = dayFullSchedule.filter(time => time['end-time'] > startTime && time['end-time'] <= timestamp8AM );
    const afternoonData = dayFullSchedule.filter(time => time['end-time'] > timestamp8AM && time['end-time'] <= timestamp4PM );
    const eveningData = dayFullSchedule.filter(time => time['end-time'] > timestamp4PM && time['end-time'] <= timestamp12AM );

    return { morningData,afternoonData,eveningData }
  };

  sortSchedule = (weekSchedule) => {
    const sunData = this.getParticularDayData(weekSchedule.sun,'sun');
    const monData = this.getParticularDayData(weekSchedule.mon,'mon');
    const tueData = this.getParticularDayData(weekSchedule.tue,'tue');
    const wedData = this.getParticularDayData(weekSchedule.wed,'wed');
    const thursData = this.getParticularDayData(weekSchedule.thu,'thu');
    const friData = this.getParticularDayData(weekSchedule.fri,'fri');
    const satData = this.getParticularDayData(weekSchedule.sat,'sat');

    return { sunData,monData,tueData,wedData,thursData,friData,satData }
  };

  onIncreseSequence = () => {
    if(this.state.displayedScheduleSequence === 1){
      return
    }
    this.setState({ displayedScheduleSequence: this.state.displayedScheduleSequence + 1 })
  };

  onDecreaseSequence = () => {
    if(this.state.displayedScheduleSequence === -1){
      return
    }
    this.setState({ displayedScheduleSequence: this.state.displayedScheduleSequence - 1 })
  };

  render() {
    const activeSchedule = this.state.schedules.filter(x => x.sequence === this.state.displayedScheduleSequence )[0];
    console.log(activeSchedule);

    return (
      <Grid>
        <Grid.Row centered textAlign='left'>
          <Grid.Column width={12}>
            <p className='heading' >Week Schedule</p>
          </Grid.Column>
        </Grid.Row>

        <Grid.Row centered>
          <Grid.Column width={1} style={{ marginTop:'20%' }} >
            <Icon name='caret left' size={'huge'} color={'yellow'} onClick={this.OnFetchPreviousWeek} />
          </Grid.Column>

          <Grid.Column width={10} className = 'bar-chart' >
            <Icon name='caret up' size={'huge'} color={'yellow'} onClick={this.onDecreaseSequence} />
            { activeSchedule? activeSchedule.value : null }
            <Icon name='caret down' size={'huge'} color={'yellow'} onClick={this.onIncreseSequence} />

          </Grid.Column>

          <Grid.Column width={1} style={{ marginTop:'20%' }} >
            <Icon name='caret right' size={'huge'} color={'yellow'} onClick={this.onFetchNextWeek} />
          </Grid.Column>

        </Grid.Row>


      </Grid>
    )
  }
}

const mapStateToProps = ( {dashboard} ) => {
  let { weekSchedule } = dashboard;
  return { weekSchedule }
};

export default connect(mapStateToProps, {  })(WeekScheduleSection);