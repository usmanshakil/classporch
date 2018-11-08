import { EventEmitter } from 'events';

class MenuChangeStore extends EventEmitter {
    constructor() {
        super();
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
                key: 'about-us',
                name: 'about-us',
                buttonTitle: 'ABOUT US'
            }, {
                key: 'contact-us',
                name: 'contact-us',
                buttonTitle: 'CONTACT US'
            }
        ];
    }

    getAll(){
        return this.items;
    }

    changeMenu(newItems) {
        this.items = newItems;

        this.emit("change");
    }
}

const menuChangeStore = new MenuChangeStore();

export default menuChangeStore;