import React, { Component } from 'react';

export default class PhoneForm extends Component {
    state = {
        name: '',
        phone: ''
    }

    handleChange = (e) => {
        e.preventDefault();
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.onCreate(this.state);
        this.setState({
            name: '',
            phone: '',
        })
    }
    
    render() {
        console.log("render() - PhoneForm.js");
        return (
            <form onSubmit={this.handleSubmit}>
                <input placeholder="이름" name="name" value={this.state.name} onChange={this.handleChange} />
                <input placeholder="번호" name="phone" value={this.state.phone} onChange={this.handleChange} />
                <button>등록</button>
            </form>
        )
    }
}