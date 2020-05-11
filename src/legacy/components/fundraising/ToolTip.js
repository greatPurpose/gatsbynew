// © 2017 VARRO ANALYTICS. ALL RIGHTS RESERVED.
import React, { Component } from 'react';
import currency from '../../helpers/currency';

import ScrollableDiv from '../ScrollableDiv';
import FundsRasiedValuationSuggestion from './FundsRasiedValuationSuggestion';
import './ToolTip.css';

const toolTipWidth = 0.8;

const jurisdictionFlags = {
  'US': 'US Flag.png',
  'EP': 'EU Flag.png',
  'CN': 'China Flag.png',
  'JP': 'Japan Flag.png'
};

const DocumentsJurisdictionRow = (props) => {

  const patents = props.patents.filter(patent => {
    return patent.jurisdiction === props.jurisdiction
  });

  if (patents.length === 0) {
    return <div className="row" />
  }

  return (
    <div className="row" style={{marginTop: 10}}>
      <div className="col-xs-2">
        <img alt="flag"
             style={{width: 30}}
             src={require('../../assets/' + jurisdictionFlags[props.jurisdiction])} />
      </div>
      <div className="col-xs-10">
        <div className="patents">
          {
            patents.map((patent, index) => {
              // eslint-disable-next-line
              return (
                <a key={index} title={patent.title}
                   target="_blank" href={patent.url}> </a>
              )
            })
          }
        </div>
      </div>
    </div>
  )
};

export default class ToolTip extends Component {
  state = {
    overviewWidth: 0,
    overviewHeight: 0,

    patentsWidth: 0,
    patentsHeight: 0

    //tab: 'acquisitions'
  };

  componentDidMount() {
    this.setState({
      overviewWidth: this.overviewWrapper.offsetWidth,
      overviewHeight: this.overviewWrapper.offsetHeight,

      patentsWidth: (this.patentsWrapper || {}).offsetWidth,
      patentsHeight: (this.patentsWrapper || {}).offsetHeight
    });
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.company !== nextProps.company) {
      this.setState({tab: null});
    }
  }

  onClick = (event) => {
    event.stopPropagation();
    event.nativeEvent.stopImmediatePropagation();
  };

  setTab = (event, tab) => {
    event.stopPropagation();
    event.nativeEvent.stopImmediatePropagation();

    this.setState({ tab });
  };

  showFundsRaisedValuationSuggestion = (event) => {
    event.stopPropagation();
    event.nativeEvent.stopImmediatePropagation();

    this.setState({fundsRasiedValuationSuggestion: true});
  };

  renderOverview = () => {
    const { companyDetails } = this.props;
    //console.log(companyDetails);

    return (
      <ScrollableDiv maxHeight={350}>
        <div className="section overview" onClick={this.onClick}>
          <h4>Overview</h4>
          <div><strong>Founded: </strong><span>{companyDetails.founded}</span></div>
          <div><strong>Headquarters: </strong>{companyDetails.headquarters}</div>
          <div><strong>Employees: </strong><span>{companyDetails.employees}</span></div>
          <div><strong>Website: </strong><span>{companyDetails.website}</span></div>
          <div>
            <strong>Social: </strong>
            <a href={companyDetails.crunchbase_url} target="_blank">
              <img src={require('../../assets/cb-icon-20.png')} alt="cb" />
            </a>

            {
              ['facebook', 'twitter', 'linkedin']
                .filter(social => companyDetails[social + '_url'])
                .map(social => {
                  return (
                    <a href={companyDetails[social + '_url']} target="_blank">
                      <icon className={'fa fa-' + social} />
                    </a>
                  );
              })
            }
          </div>

          <p>
            {companyDetails.description}
          </p>
        </div>
      </ScrollableDiv>
    )
  };

  getValuation = (date, allEvents) => {
    let valuation;
    allEvents.forEach(event => {
      if (event.type === 'valuation' && event.date <= date) {
        valuation = event.valuation;
      }
    });

    return valuation;
  };

  renderFundingEvents = (publicInvestments) => {
    const { companyDetails } = this.props;

    return (
      <ScrollableDiv maxHeight={350}>
        <div className="section fundingEvents" onClick={this.onClick}>
          {
            !publicInvestments &&
            <div>
              <h4>Private Funding Events</h4>
              <span className="addButton"
                    onClick={this.showFundsRaisedValuationSuggestion}>
                <span className="text">Update this </span>
                <img src={require('../../assets/Update SVG.svg')} alt="update"/>
              </span>
            </div>
          }

          {
            publicInvestments &&
            <div>
              <h4>Public Funding Events</h4>
            </div>
          }

          <table className="table">
            <thead>
            {
              !publicInvestments &&
              <tr>
                <th>Date</th>
                <th>Amount</th>
                <th>Valuation</th>
                <th>Lead Funder</th>
              </tr>
            }
            {
              publicInvestments &&
              <tr>
                <th>Date</th>
                <th>Amount</th>
                <th>Agency</th>
              </tr>
            }
            </thead>
            <tbody>
            {
              !publicInvestments &&
              (companyDetails.investment_set || []).map(inv => {
                return (
                  <tr key={inv.date + '-' + inv.amount}>
                    <td>{ inv.date }</td>
                    <td>{ currency.truncated(inv.amount) }</td>
                    <td>
                      { currency.truncated(this.getValuation(inv.date, companyDetails.events)) }
                    </td>
                    <td>{inv.leadFunder}</td>
                  </tr>
                );
              })
            }
            {
              publicInvestments &&
              (companyDetails.award_set || []).map(inv => {
                return (
                  <tr key={inv.date + '-' + inv.amount}>
                    <td><a target="_blank" href={inv.url} title={inv.title}>
                    { inv.date }
                    </a></td>
                    <td><a target="_blank" href={inv.url} title={inv.title}>
                      { currency.truncated(inv.amount) }
                    </a></td>
                    <td><a target="_blank" href={inv.url} title={inv.title}>
                      {inv.agency}
                    </a></td>
                  </tr>
                );
              })
            }
            </tbody>
          </table>
        </div>
      </ScrollableDiv>
    )
  };

  renderAcquisitions = () => {

    const { companyDetails } = this.props;

    //console.log(companyDetails);

    return (
      <ScrollableDiv maxHeight={350}>
        <div className="section fundingEvents" onClick={this.onClick}>
          <div>
            <h4>Acquisitions</h4>
          </div>
          <table className="table">
            <thead>
            <tr>
              <th>Date</th>
              <th>Company</th>
              <th>Purchase Price</th>
            </tr>
            </thead>
            <tbody>
            {
              companyDetails.acquisition_set.map(item => {
                return (
                    <tr>
                      <td>{item.str_date}</td>
                      <td>{item.company_name}</td>
                      <td>{item.str_amount}</td>
                    </tr>
                )
              })
            }
            </tbody>
          </table>
        </div>
      </ScrollableDiv>
    )
  };

  render() {
    const { company, companyDetails } = this.props;
    //
    //console.log(company);
    //console.log(companyDetails);

    const name = company.name;
    const fundsRaised = currency.getAmountAndUnit(company.fundsRaised, true);
    const valuation = currency.getAmountAndUnit(company.valuation, true);
    const multiplier = company.revenue ?
      ((company.valuation || 0) / company.revenue).toFixed(2) + 'x' : '-';
    const revenue = company.revenue ? currency.getAmountAndUnit(company.revenue, true) : null;

    const { top, left, isMobile } = this.props;

    const overviewTop  = !isMobile ? top - this.state.overviewHeight - 20 :
      top - this.state.overviewHeight;
    let overviewLeft = !isMobile ? left - this.state.overviewWidth / 2 :
      window.innerWidth / 2 - this.state.overviewWidth / 2;

    if (overviewLeft < 0) {
      overviewLeft = 0;
    }

    if (overviewLeft > window.innerWidth * (1 - toolTipWidth)) {
      overviewLeft = window.innerWidth * (1 - toolTipWidth);
    }

    const patentsTop  = top + 35;
    let patentsLeft = left - this.state.patentsWidth / 2;

    if (patentsLeft < 15) {
      patentsLeft = 15;
    }

    if (patentsLeft > window.innerWidth * (1 - toolTipWidth) - 15) {
      patentsLeft = window.innerWidth * (1 - toolTipWidth) - 15;
    }

    const documents = this.props.patents || {};
    const patents = documents.grantedPatents || [];
    const applications = documents.patentApplications || [];

    return (
      <div>

        {
          this.state.fundsRasiedValuationSuggestion &&
          <FundsRasiedValuationSuggestion company={company} />
        }

        <div className="ToolTip"
             style={{top: overviewTop, left: overviewLeft, zIndex: 100, width: toolTipWidth * 100 + '%'}}
             ref={element => this.overviewWrapper = element}
        >
          <div className="row">
            <div className="col-md-4 col-sm-7 col-xs-7">
              <div className="section stats">
                <div className="avatarNameSection">
                  <img className="avatar"
                       src={(companyDetails || {}).profile_picture_url}
                       alt="avatar"
                  />
                  <div className="name">{ name }</div>
                </div>
                <ul>
                  <li>
                    <span className="category">Funds Raised: </span>
                    <span className="amount">${fundsRaised[0]}</span>
                    <span className="unit"> {fundsRaised[1]}</span>
                  </li>
                  <li>
                    <span className="category">Valuation: </span>
                    <span className="amount">${valuation[0]}</span>
                    <span className="unit"> {valuation[1]}</span>
                  </li>
                  <li>
                    <span className="category">Revenue: </span>
                    {
                      revenue &&
                      <span>
                        <span className="amount">${revenue[0]}</span>
                        <span className="unit"> {revenue[1]}</span>
                      </span>
                    }
                    { !revenue && '?' }
                  </li>

                  <li>
                    <span className="category"> Valuation Multiple: </span>
                    <span className="amount">{multiplier}</span>
                  </li>

                  {
                    this.props.isMobile &&
                    <li>
                      <span className="category">Granted Patents: </span>
                      <span className="amount">{patents.length}</span>
                    </li>
                  }

                  {
                    this.props.isMobile &&
                    <li>
                      <span className="category">Patent Applications: </span>
                      <span className="amount">{applications.length}</span>
                    </li>
                  }
                </ul>
              </div>
            </div>

            <div className="col-md-3 col-sm-5 col-xs-5">
              <div className="section menu">
                <ul>
                  <li onClick={event => this.setTab(event, 'overview')}>Overview</li>
                  <li onClick={event => this.setTab(event, 'fundingEvents')}>Private Funding Events ({companyDetails.investment_set.length})</li>
                  <li onClick={event => this.setTab(event, 'publicFundingEvents')}>Public Funding Events ({companyDetails.award_set.length})</li>
                  <li onClick={event => this.setTab(event, 'acquisitions')}>Acquisitions ({companyDetails.acquisition_set.length})</li>
                  {
                    //<li onClick={event => this.setTab(event, '')}>News Stories</li>
                    //<li onClick={event => this.setTab(event, '')}>Website Screenshots</li>
                    //<li onClick={event => this.setTab(event, '')}>Map and Contact</li>
                  }
                </ul>
              </div>
            </div>

            {
              this.state.tab &&
              <div className="col-md-5 col-sm-12 col-xs-12">
                {
                  this.state.tab === 'overview' &&
                  this.renderOverview()
                }
                {
                  this.state.tab === 'fundingEvents' &&
                  this.renderFundingEvents()
                }
                {
                  this.state.tab === 'publicFundingEvents' &&
                  this.renderFundingEvents(true)
                }
                {
                  this.state.tab === 'acquisitions' &&
                  this.renderAcquisitions()
                }
              </div>
            }

          </div>


        </div>


        {
          !this.props.isMobile &&
          <div className="ToolTip"
               style={{top: patentsTop, left: patentsLeft, zIndex: 99, width: toolTipWidth * 100 + '%'}}
               ref={element => this.patentsWrapper = element}
               onClick={this.onClick}
          >
            <div className="row section patentsRow">
              <div className="col-sm-6">
                { patents.length } Granted Patents
                <DocumentsJurisdictionRow jurisdiction="US" patents={patents} />
                <DocumentsJurisdictionRow jurisdiction="EP" patents={patents} />
                <DocumentsJurisdictionRow jurisdiction="CN" patents={patents} />
                <DocumentsJurisdictionRow jurisdiction="JP" patents={patents} />
              </div>
              <div className="col-sm-6">
                { applications.length } Patent Applications
                <div className="patents">
                  <DocumentsJurisdictionRow jurisdiction="US" patents={applications} />
                  <DocumentsJurisdictionRow jurisdiction="EP" patents={patents} />
                  <DocumentsJurisdictionRow jurisdiction="CN" patents={patents} />
                  <DocumentsJurisdictionRow jurisdiction="JP" patents={patents} />

                </div>
              </div>
            </div>
          </div>
        }
      </div>
    )
  }
}
