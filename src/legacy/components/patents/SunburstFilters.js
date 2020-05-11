// © 2017 VARRO ANALYTICS. ALL RIGHTS RESERVED.
import React, { Component } from 'react';

import DateFilter from '../fundraising/filters/DateFilter';
import './SunburstFilters.css';

export default class SunburstFilters extends Component {

  render() {
    const { allDates, filters } = this.props;

    return (
      <div className="SunburstFilters">
            <DateFilter allDates={allDates}
                        currentDate={filters.currentDate}
                        onChange={this.props.setDateFilter}
                        sunburst={true}
                        sticky={false}
                        maxWidth={620}
            />

            <div className="Jurisdictions-wrapper">
              <div className="filterName">Jurisdictions</div>
              <div className="row jurisdictionRow">
                {
                  Object.keys(filters.jurisdictions).map(key => {
                    const jurisdiction = filters.jurisdictions[key];
                    return (
                      <div className="wrapper" key={key}>
                        <input type="checkbox"
                               checked={jurisdiction.checked}
                               onChange={this.props.updateJurisdiction(jurisdiction.name)}
                        />
                        <img src={require('../../assets/' + jurisdiction.flagUrl)} alt={jurisdiction.name} />
                        <p>{ jurisdiction.name }</p>
                      </div>
                    )
                  })
                }
              </div>
            </div>

            <div className="Document-type-wrapper">
              <div className="filterName">Document Type</div>
              <div className="row docTypesRow">
                {
                  Object.keys(filters.documentTypes).map(key => {
                    const docType = filters.documentTypes[key];
                    return (
                      <div className="wrapper" key={key}>
                        <input type="checkbox"
                         checked={docType.checked}
                         onChange={this.props.updateDocumentType(docType.name)}
                        />
                        <p>{ docType.name }</p>
                      </div>
                    )
                  })
                }
              </div>
            </div>
      </div>
    )
  }
}
