import { connect } from 'react-redux';
import * as actions from '../actions/ActionCreator';
import Palette from '../components/Palette';

const mapStateToProps = (state) => ({
  selectedColor: state.color,
});

const mapDispatchToProps = (dispatch) => ({
  onSelect: (color) => dispatch(actions.chageTodoColor(color)),
});

const PaletteContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Palette);

export default PaletteContainer;
