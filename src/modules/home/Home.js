import React from 'react';
import {
    Section1,
    Section3,
    Section4,
    Section6,
    Tutoring,
    Pricing,
} from './sections';
import MenuChangeStore from '../../menu';
import {history} from '../../redux/store';

export default class Home extends React.Component {
    componentWillMount() {
        const token = localStorage.getItem('store');
        if (token && JSON.parse(token) && JSON.parse(token).auth.authToken) {
                    history.push('/dashboard/' + JSON.parse(token).auth.role)

        } else {
            this.items = [
                {
                    key: 'sign-in',
                    name: 'sign-in',
                    buttonTitle: 'SIGN IN'
                }, {
                    key: 'pricing',
                    name: 'pricing',
                    buttonTitle: 'PRICING'
                }, {
                    key: 'contact-us',
                    name: 'contact-us',
                    buttonTitle: 'CONTACT US'
                }
            ];
            MenuChangeStore.changeMenu(this.items);
        }
            // if (localStorage.getItem('store')) {
        //     const store = JSON.parse(localStorage.getItem('store'));
        //     if (store.auth.role === "tutor") {
        //         history.push('/profile/tutor')
        //     } else {
        //         history.push('/profile/student')
        //     }
        // } else {

        // }
    }

    render() {
        return (
            <div>
                <Section1/>
                <Tutoring/>
                <Section3/>
                <Section4/>
                <Pricing/>
                <Section6/>
            </div>
        );
    }
}