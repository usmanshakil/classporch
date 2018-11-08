import React from 'react';
import {Grid, Image} from 'semantic-ui-react';
import './styles.css';

const Testimonial = () => (
    <Grid className='testimonial-body'>
        <Grid.Row centered>
            <Grid.Column width={8}>
                <div className='testimonial-comment-box'>
                    <p className='testimonial-comment'>
                        Umami assumenda schlitz pop-up ramps, ullamco blog enamel pin. Asymmetrical
                        commodo eiusmod VHS pariatur. Etsy listicle chia, id iPhone kinfolk microdosing
                        single-origin coffee gentrify normcore deserunt kogi edison bulb odio. Meggings
                        woke cronut cupidatat glossier, proident in VHS synth. Pitchfork tattooed shabby
                        chic live-edge sriracha asymmetrical, letterpress cray nesciunt meh quinoa
                        chambray unicorn poke. Consequat narwhal small batch, occaecat hoodie hammock
                        portland fap. Ugh pop-up tattooed, pitchfork ea kitsch vaporware offal tacos
                        velit jianbing austin migas raclette.
                    </p>
                    <p>Anton Jankovoy</p>
                </div>
            </Grid.Column>
        </Grid.Row>
        <Grid.Row centered>
            <Grid.Column width={1}>
                <Image src='https://unsplash.it/200' className='testimonial-profile-picture' shape='circular'/>
            </Grid.Column>
        </Grid.Row>

    </Grid>
);

export default Testimonial;