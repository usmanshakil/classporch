import React, {Component} from "react";
import {Button, Grid, List} from "semantic-ui-react";
import {history} from '../../../redux/store';
import './_intro.scss';
import $ from "jquery";

export default class Intro extends Component {
    constructor() {
        super();
        this.state = {
            introLinks: [
                {key: 'about-us', value: 'About Us'},
                {key: 'contact', value: 'Contact Us'}, 
                {key: 'pricing', value: 'Pricing'}, 
            ],
            tutorLinks: [
                {key: '/', value: 'French Tutors'},
                {key: '/', value: 'English Tutors'}, 
                {key: '/', value: 'Math Tutors'}, 
                {key: '/', value: 'Biology Tutors'},
                {key: '/', value: 'Physics Tutors'},
                {key: '/', value: 'Science Tutors'},
                {key: '/', value: 'Adult Education'},
                {key: '/', value: 'ESL Tutors'}
            ]
        };
        this.renderLinks = this.renderLinks.bind(this)
    }

    componentDidMount() {
        const token = localStorage.getItem('store');
        if (token && JSON.parse(token) && JSON.parse(token).auth.authToken) {
            // user is authenticated here, change tutorLink keys towards search
        }
    }

    goTo(link) {
        $("html, body").animate({scrollTop: 0}, 1000);
        history.replace(link);
    }

    renderLinks(param) {
        return this.state[param].map((item,key) => <List.Item key={key}><a onClick={this.goTo.bind(this, item.key)}>{item.value}</a></List.Item>);
    }

    render() {
        return (
            <div className='footer-background footer-intro-list' id={'intro'}>
                <Grid padded={'horizontally'}>
                    <Grid.Row columns={3}>
                        <Grid.Column>
                            <List link size={'big'} className={'intro-items'}>
                                {this.renderLinks('introLinks')}
                            </List>
                        </Grid.Column>
                        <Grid.Column>
                            <List link size={'big'} className={'intro-items'}>
                                {this.renderLinks('tutorLinks')}
                            </List>
                        </Grid.Column>
                        <Grid.Column textAlign={'center'}>

                                <Grid.Row>
                                    <div className="contact-us-button">
                                        <Button size={'large'} onClick={this.goTo.bind(this,'contact')}>Contact Us</Button>
                                    </div>
                                </Grid.Row>
                                {/*<Button size={'large'}>Contact Us</Button>*/}
                                <Button style={{marginLeft: 10, marginRight: 10,color: '#494E50'}} as={'a'} size='large'
                                        circular icon='facebook f'
                                        href={'https://www.facebook.com/ClassPorch-1715528735411313'}/>
                                <Button style={{marginLeft: 10, marginRight: 10,color: '#494E50'}} as={'a'} size='large'
                                        circular icon='twitter' href={'https://twitter.com/classporch'}/>
                                <Button style={{marginLeft: 10, marginRight: 10,color: '#494E50'}} as={'a'} size='large'
                                        circular icon='instagram' href={'https://www.instagram.com/classporch/'}/>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row/>
                </Grid>
            </div>
        )
    }
}