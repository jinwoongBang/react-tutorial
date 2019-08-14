import React from 'react';
import { connect } from 'react-redux';
import CardList from '../components/CardList';
import * as actions from '../actions/ActionCreator';

const mapStateToProps = state => {
  return {
    // deviceList: state.deviceList
  };
};

const mapDispatchToProps = dispatch => ({
  searchDevice: (/* 검색 조건 */) => dispatch(actions.searchDevice(/* 검색 조건 */))
});

const CardListContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(CardList);

export default CardListContainer;
