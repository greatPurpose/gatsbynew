// © 2017 VARRO ANALYTICS. ALL RIGHTS RESERVED.
import React, { Component } from 'react';
import currency from '../../helpers/currency';

export default class AxisCircles extends Component {
  render() {
    return (
      <g>
        {
          this.props.values.map(value => {
            const r = value / this.props.maxVal * this.props.radius + this.props.innerRadius;
            return (
              <g className="axisCircle" key={value}>
                <circle
                  cx={this.props.cx}
                  cy={this.props.cy}
                  r={r} />
                <text y={this.props.cy + 3} x={r + this.props.cx + 5}>
                  { currency.noDecimal(value) }
                </text>
              </g>
            )
          })
        }
      </g>
    )
  }
}