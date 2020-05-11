// © 2017 VARRO ANALYTICS. ALL RIGHTS RESERVED.
import React, { Component } from 'react';

import { LEFT_SIDEBAR_PERCENT } from '../constants';
import IndustryFilters from '../components/fundraising/filters/IndustryFilters';

import './LeftSideBar.css';


export default class LeftSideBar extends Component {
  render() {
    return(
      <div className="LeftSideBar" style={{left: this.props.left, width: (LEFT_SIDEBAR_PERCENT * 100) + '%'}}>
        <div className="row">
          <div className="col-lg-12">
            <IndustryFilters
              activeIndustry={this.props.activeIndustry}
              onChange={this.props.onChange}
              isLeftSize
            />
          </div>
        </div>
      </div>
    )
  }
}