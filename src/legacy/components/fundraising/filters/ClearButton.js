// © 2017 VARRO ANALYTICS. ALL RIGHTS RESERVED.
import React, { Component } from 'react';
import { defaultFilters } from '../../../constants';

const buttonStyle = {
  padding: '8px 60px',
  color: '#171717',
  fontSize: 13
};

export default class ClearButton extends Component {

  isDisabled = () => {
    const { filters } = this.props;

    let disabled = true;
    Object.keys(defaultFilters).forEach(key => {
      if (key === 'date') {
        if (defaultFilters.date.value !== filters.date.value) {
          disabled = false;
        }
      } else if (defaultFilters[key] !== filters[key]) {
        disabled = false;
      }
    });

    return disabled;
  };

  render() {
    return (
      <button className="ClearButton btn btn-default"
              disabled={this.isDisabled()}
              onClick={this.props.onClick}>
        CLEAR
      </button>
    )
  }
}
