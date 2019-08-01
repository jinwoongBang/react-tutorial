import React, { Component } from 'react';
import PhoneForm from './components/PhoneForm';

export default class App extends Component {
  handleCreate = (data) => {
    console.log(data);
  }

  render() {
      return (
          <div>
              <PhoneForm onCreate={this.handleCreate}/>
          </div>
      );
  }
}
