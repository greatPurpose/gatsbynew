// © 2017 VARRO ANALYTICS. ALL RIGHTS RESERVED.
import React, { Component } from 'react';
import classNames from 'classnames';

import './ExitTypeFilter.css'
import { exitTypes } from '../../../constants';

export default class ExitTypeFilter extends Component {

  onClick = (event, exitType) => {
    return this.props.onChange(exitType);
  };

  render() {
    return (
      <div className="ExitTypeFilter">
        <div className="description">
          SORT BY EXIT TYPE:
        </div>

        <>
          {
            exitTypes.map(exitType => {
              return (
                <div className={classNames('filterItem', {'active': this.props.activeExitType === exitType.id})}
                     key={exitType.id}
                     onClick={(event) => this.onClick(event, exitType.id)}
                >
                  { exitType.name }
                </div>
              )
            })
          }
        </>
      </div>
    )
  }
}
