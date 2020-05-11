// © 2017 VARRO ANALYTICS. ALL RIGHTS RESERVED.
import React, { Component } from 'react';

import './GraphToolTip.css';

export default class GraphToolTip extends Component {
  state = {
    width: 0,
    height: 0
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
    let { top, left, patent } = this.props;
    top  = top - this.state.height - 20;
    left = left - this.state.width / 2;

    return (
      <div className="GraphToolTip"
           style={{top, left}}
           ref={element => this.wrapper = element}
           onClick={this.onClick}>

        <ul>
          <li>
            <span className="key">Title: </span>
            <span className="value">{patent.title}</span>
          </li>

          <li>
            <span className="key">Number of times cited: </span>
            <span className="value">{patent.citedByCount}</span>
          </li>

          <li>
            <span className="key">Patent Number: </span>
            <span className="value">{patent.number}</span>
          </li>

          <li>
            <span className="key">Cambia Link: </span>
            <span className="value">
              <a target='_blank' href={`http://lens.org/lens/patent/${patent.publicationKey}`}>
                {`http://lens.org/lens/patent/${patent.publicationKey}`}
              </a>
            </span>
          </li>
        </ul>

      </div>
    )
  }
}