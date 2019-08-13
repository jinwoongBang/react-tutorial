import React from 'react';
import { connect } from 'react-redux';
import Menu from '../components/Menu';
import * as actions from '../actions/ActionCreator';

const mapStateToProps = (state) => {
    console.log(state);
    return ({
        toggle: state.Menu.toggle
      });
};

const mapDispatchToProps = dispatch => ({
    changeToggle: () => dispatch(actions.changeToggle())
});

const MenuContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Menu);

export default MenuContainer;
