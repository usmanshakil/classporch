import React from 'react'
import {Grid, Header,List} from 'semantic-ui-react'
import {connect} from 'react-redux'
import moment from 'moment';
import './styles.css'
import {getDashboard} from '../../redux/actions';

class PreviousExpenses extends React.Component {

  state = {
    invoices: []
  };

  constructor(props) {
    super(props);
    this.getInvoices = this.getInvoices.bind(this);
  }

  componentDidMount = async () => {
    try {
      const resRaw = await fetch(`users/${this.props.userId}/invoices`, {
        headers: {
          'auth_token': this.props.authToken,
          'Content-Type': 'application/json'
        },
      });
      if (resRaw.status !== 200) {
        throw 'error'
      }
      const res = await resRaw.json();
      console.log(JSON.stringify(res.invoices, null, 4));
      this.setState({
        invoices: res.invoices
      })
    } catch (e) {
      console.log(e)
    }
  };

  getInvoices = () => {
    const {invoices} = this.state;
    return invoices.map((invoice, i) => {
      const name = capitalize(invoice.reciever.first_name) + ' ' + capitalize(invoice.reciever.last_name);
      return (
        <List.Item key={i}>
          <Grid verticalAlign='middle'>
            <Grid.Row centered>
              <Grid.Column textAlign={'center'} width={3} style={{fontSize: 24}}>{invoice.amount ? invoice.amount : 0} CAD</Grid.Column>
              <Grid.Column textAlign={'left'} width={9}>
                <p style={{fontSize: 16}}>{name}</p>
                <p style={{color: '#AAA'}}>Paid on {moment(invoice.created_at * 1000).format('DD MMMM Y')}</p>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </List.Item>
      )
    });
  };


  render() {
    return (
      <Grid padded centered style={{paddingBottom: '100px'}}>
        <Grid.Row>
          <Grid.Column width={10} textAlign='left'>
            <Header size='huge'> Previous Expenses </Header>
            <List divided relaxed={'very'}>{this.getInvoices()}</List>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    )
  }
}

const mapStateToProps = ({auth, dashboard}) => {
  const {authToken, id: userId, role, firstName, lastName, loggedIn} = auth;
  const {profile} = dashboard;

  return {authToken, userId, role, firstName, lastName, loggedIn, profile}
};


export default connect(mapStateToProps, {
  getDashboard
})(PreviousExpenses);


function capitalize(str = '') {
  return str.trim().split('')
    .map((char, i) => i === 0 ? char.toUpperCase() : char)
    .reduce((final, char) => final += char, '')
}




    