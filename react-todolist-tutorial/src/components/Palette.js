import React, { Component } from 'react';
import styled from 'styled-components';
import classnames from 'classnames';

const PaletteContainer = styled.div`
  display: flex;
  justify-content: center;

  .color {
    width: 2rem;
    height: 2rem;
    opacity: 0.5;
    transition: all 0.2s;
    cursor: pointer;
  }

  .color:hover {
    opacity: 0.75;
  }

  .color.active,
  .color:active {
    opacity: 1;
  }

  .color + .color {
    margin-left: 1rem;
  }
`;

const Color = ({ color, onSelect, selectedColor }) => {
  return (
    <div
      className={classnames({
          active: color === selectedColor ? true : false,
          color: true
      })}
      style={{ background: color }}
      onClick={(e) => {
        e.preventDefault();
        onSelect(color);
      }}
    />
  );
};

export default class Palette extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  static defaultProps = {
    colors: ['black'],
  };

  render() {
    const { colors, selectedColor, onSelect } = this.props;

    return (
      <PaletteContainer>
        {colors.map((item) => (
          <Color color={item} key={item} onSelect={onSelect} selectedColor={selectedColor} />
        ))}
      </PaletteContainer>
    );
  }
}
