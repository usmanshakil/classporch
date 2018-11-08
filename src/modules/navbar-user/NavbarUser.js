import React, {Component} from 'react';
import logoDark from '../../assets/logo_dark.png';
import {Menu} from 'semantic-ui-react';
import {history} from '../../redux/store';
import MenuChangeStore from '../../menu';
import './styles.css';

export default class NavbarUser extends Component {
  state = {};

  constructor() {
    super();
    this.state = {
      items: MenuChangeStore.getAll()
    };
  }

  handleItemClick = (e, {name}) => {
    this.setState({activeItem: name});
    console.log(name);
    if (name === 'sign-in') {
      history.push('/login');
    } else if (name === 'home') {
      history.push('/');
    }
  };

  render() {
    const {activeItem, items} = this.state;

    MenuChangeStore.on('change', () => {
      this.setState({
        items: MenuChangeStore.getAll()
      });
    });
    const MenuItems = items.map((item, i) => {
      return (
        <Menu.Item
          key={item.key}
          name={item.name}
          active={activeItem === item.name}
          onClick={this.handleItemClick}>
          {item.buttonTitle}
        </Menu.Item>
      );
    });

    return (
      <Menu stackable borderless>
        <Menu.Item>
          <a href='/' className='navBar-logo'>
            <img src={logoDark} className='navBar-logo' role='presentation'/>
          </a>
        </Menu.Item>

        <Menu.Menu position='right'>
          {MenuItems}
        </Menu.Menu>
      </Menu>
    )
  }
}