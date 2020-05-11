// © 2017 VARRO ANALYTICS. ALL RIGHTS RESERVED.
import React, { Component } from 'react';

import './SunburstToolTip.css';

export default class SunburstToolTip extends Component {
  state = {
    width: 0,
    height: 0,
  };

  componentDidMount() {
    this.setState({
      width: this.wrapper.offsetWidth,
      height: this.wrapper.offsetHeight
    });
  }

  onClick = (event) => {
    event.stopPropagation();
    event.nativeEvent.stopImmediatePropagation();
  };

  render() {
    let { top, left } = this.props;
    top  = top - this.state.height - 20;
    left = left - this.state.width / 2;

    return (
      <div className="SunburstToolTip"
           style={{top, left}}
           ref={element => this.wrapper = element}
           onClick={this.onClick}>

        {
          this.props.path[1] &&
          <span>
            <span className="item">{this.props.path[1]}</span>&nbsp;>&nbsp;
          </span>
        }

        {
          this.props.path[0] &&
          <span className="item">{this.props.path[0]}</span>
        }

      </div>
    )
  }
}