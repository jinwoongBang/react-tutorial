import React from 'react';
import { connect } from 'react-redux';
import Header from '../components/Header';
import * as actions from '../actions/ActionCreator';

const mapStateToProps = (state) => {
    return ({
        toggle: state.Header.toggle,
      });
};

const mapDispatchToProps = dispatch => ({
    changeToggle: () => dispatch(actions.changeToggle()),
});

const HeaderContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Header);

export default HeaderContainer;
