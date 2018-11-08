import React from 'react'
import { Grid } from 'semantic-ui-react'
import './styles.css';
import DeleteImg from '../../assets/close_red.png';
import { Menu, Dropdown, Image, Input, Button } from 'semantic-ui-react';

class Notification extends React.Component {

    constructor() {
        super();
        this.state = {
            NotificationList: [
                { Date: '1-3-2018', Notification: 'Hello this is first notification' },
                { Date: '2-3-2018', Notification: 'Hello this is second notification' },
                { Date: '2-3-2018', Notification: 'Hello this is third notification' },
                { Date: '3-3-2018', Notification: 'Hello this is forth notification' },
                { Date: '3-3-2018', Notification: 'Hello this is five notification' },
                { Date: '1-3-2018', Notification: 'Hello this is first notification' },
                { Date: '2-3-2018', Notification: 'Hello this is second notification' },
                { Date: '2-3-2018', Notification: 'Hello this is third notification' },
                { Date: '3-3-2018', Notification: 'Hello this is forth notification' },
                { Date: '3-3-2018', Notification: 'Hello this is five notification' },
            ]
        };

    }


    componentDidMount() {
        window.scrollTo(0, 0)
    }

    render() {

        let list = this.state.NotificationList.map(p => {

            return (
                <tr className="grey2">
                    <td>{p.Date}</td>
                    <td>{p.Notification}</td>
                    <td><Image centered src={DeleteImg}  ></Image></td>
                </tr>
            );
        });

        return (
            <Grid className='tutor-notification-section'>
                <Grid.Row centered textAlign='left'>
                    <Grid.Column width={12}>
                        <p className='notifications-header'>Notifications</p>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row centered>
                    {/* <Grid.Column width={12}>
                    
                </Grid.Column> */}

                    <div className="row">

                        <table cellSpacing="3" id="tblNotification"  className="table">
                            <thead>
                                <tr>
                                    <th>Notification Date</th>
                                    <th> Notification Message</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>{list}</tbody>
                        </table>
                    </div>
                </Grid.Row>
                  </Grid>
           
        )
    }

}

export default Notification