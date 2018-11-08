import React from 'react';
import {Grid, Input} from 'semantic-ui-react';
import './styles.css';

export default class HourlyRateSection extends React.Component {
    constructor(){
        super();
        this.state = {
            perMin: 4.58,
            perHour: 25
        }
        this.calcPerMin = this.calcPerMin.bind(this);
        this.onChange = this.onChange.bind(this);
    }
    calcPerMin() {
        return (this.state.perHour / 60)
    }
    onChange(e,{name,value}) {
        if(value> 60 || value < 25) return
        this.setState({perHour: value});
        this.props.onChange(e,{name,value})
    }
    render() {
        return (
            <Grid className='sign-up-hourly-body'>
                <Grid.Row centered>
                    <Grid.Column width={12} textAlign='left'>
                        <p className='sign-up-label'>HOURLY RATE</p>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row centered>
                    <Grid.Column width={12} textAlign='left'>
                        <Input
                            name='rate'
                            placeholder='0.00'
                            transparent
                            type='number'
                            required
                            value={this.state.perHour}
                            className='input-hourly-rate'
                            onChange={this.onChange}/>
                        <span className='input-hourly-rate'>
                            $ per hour
                        </span>
                        <span style={{marginLeft: '20px'}} className='input-hourly-rate'>
                           / {this.calcPerMin().toFixed(2)} $ per min
                        </span>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        );
    }
}