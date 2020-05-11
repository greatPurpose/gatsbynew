// © 2017 VARRO ANALYTICS. ALL RIGHTS RESERVED.
import React, { Component } from 'react';
import moment from 'moment';
import currency from '../../helpers/currency';
import ExitTypeFilter from './filters/ExitTypeFilter';
import './ExitsTable.css';

export default class ExitsTable extends Component {
  state = {
    exitTypeFilter: null,
    columns: [ 'Name', 'Exit Type', 'Date of Exit', 'Sector', 'Total Funds Raised', 'Last Valuation', 'Market Cap', 'Stock Symbol', 'Purchase Price', 'Purchaser' ]
  };

  updateExitTypeFilter = (exitType) => {
    this.setState(state => {
      if (state.exitTypeFilter === exitType) {
        exitType = null;
      }

      return { ...state, exitTypeFilter: exitType };
    })
  };

  renderThead() {
    let { columns } = this.state;
    if (this.props.isMobile) {
      columns = columns.slice(0, 3);
    }

    return (
      <thead>
        <tr>
          {
            columns.map(column => {
              return (
                <td key={column}>{ column }</td>
              )
            })
          }
        </tr>
      </thead>
    )
  }

  renderBody(companies) {
    const { isMobile } = this.props;
    return (
      <tbody>
        {
          companies.map(company => {
            return (
              <tr key={company.id}>
                <td>{ company.name }</td>
                <td>{ company.exit.exitType }</td>
                <td>{ company.exit.date }</td>
                { !isMobile && <td>{ company.industry }</td> }
                { !isMobile && <td>{ currency.decimal(company.fundsRaised) }</td> }
                { !isMobile && <td>{ currency.decimal(company.valuation) }</td> }
                { !isMobile && <td>{ currency.decimal(company.marketCapital) }</td> }
                {
                  !isMobile &&
                  <td>
                    {
                      company.exit.stockSymbol &&
                      <a
                        href={`https://www.google.com/finance?q=${company.exit.stockSymbol}`}
                        target="_blank">
                        { company.exit.stockSymbol }
                      </a>
                    }
                  </td>
                }
                { !isMobile && <td>{ company.exit.acquisitionPrice }</td> }
                { !isMobile && <td>{ company.exit.acquisitionNewOwner }</td> }
              </tr>
            )
          })
        }
      </tbody>
    )
  }

  render() {
    const companies = this.props.companies.filter(company => {
      return company.exit &&
        (!this.state.exitTypeFilter || this.state.exitTypeFilter === company.exit.exitType);
    });

    return(
      <div className="ExitsTable">
        <h4>{ companies.length } Exits as of &nbsp;
          {
            this.props.currentDate.value ?
              moment(this.props.currentDate.value).format('MMMM Y') : ''
          }
        </h4>
        <ExitTypeFilter onChange={this.updateExitTypeFilter}
                        activeExitType={this.state.exitTypeFilter}
        />

        <table className="table">
          { this.renderThead() }
          { this.renderBody(companies) }
        </table>
      </div>
    )
  }
}