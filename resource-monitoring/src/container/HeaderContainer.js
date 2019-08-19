import React from 'react';
import { connect } from 'react-redux';
import Header from '../components/Header';
import * as actions from '../actions/ActionCreator';

const mapStateToProps = (state) => {
    return ({
        toggle: state.Header.toggle,
        currentPage: state.Header.currentPage
      });
};

const mapDispatchToProps = dispatch => ({
    changeToggle: () => dispatch(actions.changeToggle()),
    changePage: (currentPage) => dispatch(actions.changePage(currentPage))
});

const HeaderContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Header);

export default HeaderContainer;
