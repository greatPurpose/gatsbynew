// © 2017 VARRO ANALYTICS. ALL RIGHTS RESERVED.
import React, { Component } from 'react';
import classNames from 'classnames';
import './IndustryFilters.css';
import ClearButton from './ClearButton';

import { industries } from '../../../constants';

export default class IndustryFilters extends Component {

  onClick = (event, industry) => {
    return this.props.onChange(industry);
  };

  render() {
    return (
      <div className="IndustryFilters">
        {
          industries.map(industry => {
            return (
              <div className={classNames('filterItem', { 'active': this.props.activeIndustry === industry.id })}
                   key={industry.id}
                   onClick={(event) => this.onClick(event, industry.id)}
              >
                <div className={'industryImg'}>
                  <img src={require('../../../assets/industries/' + industry.icon)}
                       className="icon"
                       title={industry.name}
                       alt={industry.name}/>
                </div>

                <div className={'industryName'} key={industry.id}>
                  {industry.name}
                </div>

              </div>
            );
          })
        }

        {
          !this.props.isLeftSize &&
          <div className="filterItem clearButton">
            <ClearButton filters={this.props.filters}
                         onClick={this.props.clearFilters}/>
          </div>
        }

      </div>
    );
  }
}
