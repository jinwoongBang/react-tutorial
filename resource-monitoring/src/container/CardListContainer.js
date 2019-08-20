import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import CardList from '../components/CardList';
import * as actions from '../actions/ActionCreator';

const mapStateToProps = state => {
  console.log("card list container - state : " , state);
  // console.log("card list container - state.Device : " , state.Device);
  // console.log("card list container - state.Device.result : " , state.Device.result);
  return {
    deviceList: state.Device.result,
    pending: state.Device.pending,
    error: state.Device.error,
  };
};

const mapDispatchToProps = dispatch => ({
  DeviceActions: bindActionCreators(actions, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CardList);


// export default connect(
//   (state) => ({
//       number: state.counter
//   }),
//   (dispatch) => ({
//       CounterActions: bindActionCreators(counterActions, dispatch)
//   })
// )(App);