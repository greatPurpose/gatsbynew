// © 2017 VARRO ANALYTICS. ALL RIGHTS RESERVED.
import React, { Component } from 'react';

const wrapperStyle = {
  float: 'right',
  zIndex: 10,
  marginTop: -200,
  cursor: 'pointer'
};

const imageStyle = {
  maxHeight: 150
};

export default class FundraisingZoom extends Component {
  render() {
    return (
      <div style={wrapperStyle}>
        {
          this.props.zoomIn &&
          <img src={require('../../assets/Zoom In 200 px tall.svg')}
               style={imageStyle}
               alt="zoom in"
               onClick={this.props.onClick}
          />
        }
        {
          this.props.zoomOut &&
          <img src={require('../../assets/Zoom Out 200 px tall.svg')}
               style={imageStyle}
               alt="zoom out"
               onClick={this.props.onClick}
          />
        }
      </div>
    );
  }
}