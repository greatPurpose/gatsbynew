// © 2017 VARRO ANALYTICS. ALL RIGHTS RESERVED.
import React, { Component } from 'react';


export default class ScrollableDiv extends Component {
  state = {
    maxHeight: null,
    overflow: 'auto'
  };

  componentDidMount() {
    if (this.element.offsetHeight > this.props.maxHeight) {
      this.setState({
        maxHeight: this.props.maxHeight,
        overflow: 'scroll'
      });
    }
  }

  render() {
    const style = {
      maxHeight: this.state.maxHeight,
      overflow: this.state.overflow
    };

    return (
      <div style={style} ref={element => this.element = element}>
        {this.props.children}
      </div>
    )
  }
}