import React, { Component } from 'react';
import AppTemplate from './AppTemplate';
import Header from './components/common/Header'
import Footer from './components/common/Footer'
import SideNav from './components/common/SideNav';
import Contents from './components/Contents';

class App extends Component {
    render() {
        return (
            <AppTemplate header={<Header />} footer={<Footer/>} sideNav={<SideNav/>} >{<Contents/>}</AppTemplate>
        )
    }
}

export default App;