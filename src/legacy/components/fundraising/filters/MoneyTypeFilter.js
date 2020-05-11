// © 2017 VARRO ANALYTICS. ALL RIGHTS RESERVED.
import React, { Component } from 'react';
import classNames from 'classnames'

import './MoneyTypeFilter.css';

export default class MoneyTypeFilter extends Component {

  onChange = value => (event) => {
    this.props.onChange(value);
  };

  render() {
    return (
      <div className="MoneyTypeFilter row">
        <div className="wrapper">
          <div className="description">
            SORT BY TYPE OF MONEY:
          </div>
          <div className="buttonsWrapper">
            <button className={classNames('btn',
              { 'active': this.props.value === 'all' })}
                    onClick={this.onChange('all')}
            >
              Private&nbsp;&&nbsp;Public
            </button>

            <button className={classNames('btn',
              { 'active': this.props.value === 'private' })}
                    onClick={this.onChange('private')}
            >
              Private
            </button>

            <button className={classNames('btn',
              { 'active': this.props.value === 'public' })}
                    onClick={this.onChange('public')}
            >
              Public
            </button>
          </div>
        </div>
      </div>
    )
  }
}
