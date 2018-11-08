import React, {Component} from 'react'
import { VictoryChart,VictoryAxis, VictoryLabel, VictoryCandlestick } from 'victory'
import moment from 'moment'

class AfternoonSchedule extends Component {

    getData = (data) => {

		const allAfternoons = Object.entries(data).reduce((allNoonsData,day)=>{
			allNoonsData[day[0]] ? allNoonsData[day[0]] = day[1].afternoonData : allNoonsData[day[0]] = day[1].afternoonData;
			return allNoonsData
		},{});

		const candleStickData = Object.entries(allAfternoons).reduce((finalDataArray,day)=>{
			let x = 0,
				open = 0,
				close = 0,
				high = 0,
				low = 0 ;
			
				
			switch(day[0]){
				case 'sunData':
					 x = 1;
					 break;
				case 'monData':
					 x = 2;
					 break;
				case 'tueData':
					 x = 3;
					 break;
				case 'wedData':
					 x = 4;
					 break;
				case 'thursData':
					 x = 5;
					 break;
				case'friData':
					 x = 6;
					 break;
				case 'satData':
					 x = 7;
					 break;
				default:
					 x =1
			}

			let dataForADay = day[1].map(time => {
				const startTimeHour = moment(time['start-time']).format('HH');
				const startTimeMinute = moment(time['start-time']).format('mm');
				const startTotal = parseFloat(startTimeHour) + parseFloat(startTimeMinute/60);
				const startTime = startTotal.toFixed(2) - 8.00;
				// console.log(startTime)
	
				const endTimeHour = moment(time['end-time']).format('HH');
				const endTimeMinute = moment(time['end-time']).format('mm');
				const endTotal = parseFloat(endTimeHour) + parseFloat(endTimeMinute/60);
				const endTime = endTotal.toFixed(2) - 8.00;
				// console.log(endTime)

				return { x, open: startTime, close:endTime, high, low }
	
			});

			dataForADay = dataForADay.length ? dataForADay : [{ x,open:0,close:0,high,low }];			

			return [ ...finalDataArray, ...dataForADay ]

		},[]);
		console.log(candleStickData);
		return candleStickData

    };

    render(){
		const chartData = this.getData(this.props.data);

        return(
			<div style={{ height:'80%' }}>
			<VictoryChart 
				domainPadding={{ x:[50,50] }}
				
			>
				<VictoryAxis
					axisLabelComponent={<VictoryLabel dy={10} />} 
					tickValues={[1,2,3,4,5,6,7]}
					tickFormat={['Sun','Mon','Tue','Wed','Thurs','Fri','Sat']}
					style = {{ 
						tickLabels: { fill:'#666', fontSize:'10px', fontWeight:100 },
						axis: {stroke: "#fff"},
					}}
				/>
				<VictoryAxis dependentAxis
					axisLabelComponent={<VictoryLabel dy={-20} />}
					tickValues={[-1,0,1,2,3,4,5,6,7,8]}
					tickFormat={
						[
	 					'7am','8am','9am','10am','11am','12pm','1pm','2pm','3pm','4pm'
	 					]
					}
					style = {{
						tickLabels: { fill:'#666',fontSize:'10px' },
						axis: {stroke: "#fff"},
					}}
					label = ""
				/>
				<VictoryCandlestick
				style={{ data: { stroke:'#F5A623', borderWidth:1, borderRadius:'5px' } }}
				candleColors={{ positive: "#F5A623", negative: "#F5A623" }}
				data={chartData}
				/>
			</VictoryChart>
			</div>
		)
    }
}

export default AfternoonSchedule

