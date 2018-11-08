import React from 'react';
import {Grid} from 'semantic-ui-react';
import {Testimonial} from './testimonial';
import Carousel from 'nuka-carousel';
import './styles.css';

export default class Section5 extends React.Component{
    render() {
        return (
            <Grid className='section-five'>
                <Grid.Row centered>
                    <Grid.Column width={5}>
                        <p className='section5-title'>TUTOR <span className='section5-title-semibold'>TESTIMONIALS</span>
                        </p>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row centered>
                    <div className='section5-seperator'></div>
                </Grid.Row>
                <Grid.Row centered>
                    <Grid.Column width={10}>
                        <p className='section5-subtitle'>Wolf leggings 3 wolf moon, PBR&amp;B pour-over
                            slow-carb pitchfork. Aliquip thundercats swag, deserunt marfa vegan synth
                            hexagon knausgaard cornhole bushwick slow-carb forage blog. Hammock sriracha do,
                            XOXO officia selfies esse velit tousled kogi offal. Put a bird on it mlkshk
                            subway tile occaecat, adipisicing kitsch shoreditch unicorn. Butcher placeat
                            glossier vaporware yr, assumenda et 3 wolf moon chambray vegan sed. Locavore
                            cardigan enamel pin hoodie, four loko intelligentsia culpa whatever jean shorts
                            aliqua VHS. Lumbersexual DIY man bun you probably haven't heard of them, eu
                            leggings salvia neutra flannel occupy.</p>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    <Carousel>
                        <Testimonial/>
                        <Testimonial/>
                        <Testimonial/>
                        <Testimonial/>
                    </Carousel>
                </Grid.Row>
            </Grid>
        );
    }
}
