// © 2017 VARRO ANALYTICS. ALL RIGHTS RESERVED.
import React, { Component } from 'react';
import classNames from 'classnames';

import './FundrasingTierFilter.css';

export default class FundsraisingTierFilter extends Component {

  onChange = value => (event) => {
    this.props.onChange(value);
  };

  render() {
    return (
      <div className="FundsRaisingTierFilter">
        <div className="row">
          <div className="description">
            SORT BY FUNDRAISING TIER:
          </div>

          <div className="buttonsWrapper">
            <button className={classNames('btn',
              { 'active': this.props.value === 'under5' })}
                    onClick={this.onChange('under5')}
            >
              Under <br/> $5&nbsp;million
            </button>

            <button className={classNames('btn',
              { 'active': this.props.value === '5to25' })}
                    onClick={this.onChange('5to25')}
            >
              $5 to <br/>$25&nbsp;million
            </button>

            <button className={classNames('btn',
              { 'active': this.props.value === 'over25' })}
                    onClick={this.onChange('over25')}
            >
              Over <br/> $25&nbsp;million
            </button>
          </div>

          <label>
            <input type="checkbox"
                   checked={this.props.projectedValuations}
                   onChange={this.props.changeProjectedValuations}/>
            Display projected valuations
          </label>

        </div>

      </div>
    );
  }
}
