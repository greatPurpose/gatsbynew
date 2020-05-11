// © 2017 VARRO ANALYTICS. ALL RIGHTS RESERVED.
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import ReactTransitionGroup from 'react-addons-transition-group';
import * as d3 from 'd3';
import currency from '../../helpers/currency';

import { industriesById, MOBILE_MAX_WIDTH, industries } from '../../constants';
import ToolTip from './ToolTip';
import AxisCircles from './AxisCircles';
//import CompanyModal from './CompanyModal';
import './FundraisingPieChart.css'

class CompanyFundsRasiedBar extends Component {
  state = {
    d: null,
    fillOpacity: 1e-6
  };

  transition = d3.transition()
    .duration(750)
    .ease(d3.easeCubicInOut);


  componentWillEnter = (callback) => {
    let node = d3.select(ReactDOM.findDOMNode(this));
    let opacity = 1;
    if (this.props.gradient) {
      opacity = 0.7;
    }
    node.interrupt().transition(this.transition)
      .duration(500)
      .style('fill-opacity', !this.props.hide ? opacity : 0)
      .attr("d", this.props.d)
      .on('end', () => {
        this.setState(state => {
          state.fillOpacity = !this.props.hide ? opacity : 0;
          callback();
          return state;
        });
      })
      .on('interrupt', () => {
        this.setState(state => {
          state.fillOpacity = !this.props.hide ? opacity : 0;
          callback();
          return state;
        });
      });

  };

  componentWillReceiveProps = (nextProps, nextState) => {
    let node = d3.select(ReactDOM.findDOMNode(this));

    if (this.props.d !== nextProps.d || this.props.hide !== nextProps.hide) {
      let opacity = 1;
      if (this.props.gradient) {
        opacity = 0.7;
      }

      node.interrupt().transition(this.transition)
        .duration(500)
        .style('fill-opacity', !nextProps.hide ? opacity : 0)
        .attr("d", nextProps.d)
        .on('end', () => {
          this.setState(state => {
            state.fillOpacity = !nextProps.hide ? opacity : 0;
            return state;
          });
        })
    }
  };

  componentWillLeave = (callback) => {
    return callback();
    //let node = d3.select(ReactDOM.findDOMNode(this));
    //
    //this.setState({className: 'exit'});
    //
    //node.transition(this.transition)
    //  .style('fill-opacity', 1e-6)
    //  .on('end', () => {
    //    callback()
    //  });
  };

  onMouseEnter = event => {
    this.props.updateHoverCompany(this.props.item.data);
  };

  onMouseLeave = event => {
    this.props.updateHoverCompany(null);
  };

  onMouseMove = event => {
    this.props.updateToolTipPosition(this.props.item.data, event);
  };

  onClick = event => {
    event.stopPropagation();
    event.nativeEvent.stopImmediatePropagation();

    this.props.updateActiveCompany(this.props.item.data, event);
  };

  render() {
    const { color, path } = this.props;

    return (
      <path className="arc"
            style={{fillOpacity: this.props.color.opacity || this.state.fillOpacity}}
            fill={color.color}
            //fill={'url(#gradient-' + this.props.industry  + ')'}
            onMouseEnter={this.onMouseEnter}
            onMouseLeave={this.onMouseLeave}
            onMouseMove={this.onMouseMove}
            onClick={this.onClick}
      />

    )
  }
}


export default class FundrasingPieChart extends Component {

  state = {
    hoverCompany: null,
    activeCompany: null,

    toolTip: false,
    toolTipTop: 0,
    toolTipLeft: 0,

    height: 400,
    width: 0,
    radius: 0,
    innerRadius: 0,
  };

  componentWillMount() {
    this.fundsRaisedPie = d3.pie()
      .sort((a, b) => {
        if (a.hide === b.hide) {
          return this.getFundsRaised(a) - this.getFundsRaised(b)
        } else {
          return b.hide - a.hide;
        }
      })
      .value(function(d) { return 1; })
      .startAngle(-89 * (Math.PI / 180))
      .endAngle(87 * (Math.PI / 180));

    this.valuationPie = d3.pie()
      .sort((a, b) => {
        let aValuation = a.valuation;
        let bValuation = b.valuation;

        if (!a.realValuation && !this.props.projectedValuations) {
          aValuation = 0;
        }
        if (!b.realValuation && !this.props.projectedValuations) {
          bValuation = 0;
        }

        if (a.hide === b.hide) {
          return bValuation - aValuation
        }
        return a.hide - b.hide;

      })
      .value(function(d) { return 1; })
      .startAngle(93 * (Math.PI / 180))
      .endAngle(269 * (Math.PI / 180));

    this.fundsRaisedArc = d3.arc()
      .outerRadius(d => {
        return (this.state.radius - this.state.innerRadius) * (this.getFundsRaised(d.data) / this.props.maxVal) + this.state.innerRadius;
      })
      .innerRadius(this.state.innerRadius);

    this.valuationArc = d3.arc()
      .outerRadius(d => {
        let valuation = d.data.valuation;
        if (!d.data.realValuation && !this.props.projectedValuations) {
          valuation = 0;
        }

        return (this.state.radius - this.state.innerRadius) * (valuation / this.props.maxVal) + this.state.innerRadius;
      })
      .innerRadius(this.state.innerRadius);

    document.addEventListener('click', this.handleClickOutside);
    window.addEventListener("resize", this.resizeHandler);
    window.addEventListener("orientationchange", this.resizeHandler);

  }

  componentWillUnmount() {
    document.removeEventListener('click', this.handleClickOutside);
    window.removeEventListener("resize", this.resizeHandler);
    window.removeEventListener("orientationchange", this.resizeHandler);
  }

  componentDidMount() {
    this.updateWidth(this.wrapper.offsetWidth);
  }

  getFundsRaised = (data) => {
    if (this.props.moneyType === 'all') {
      return data.fundsRaised + data.publicFundsRaised;
    } else if (this.props.moneyType === 'private') {
      return data.fundsRaised;
    } else if (this.props.moneyType === 'public') {
      return data.publicFundsRaised;
    }
  };

  resizeHandler = () => {
    this.updateWidth(this.wrapper.offsetWidth);
  };

  updateWidth(width) {
    const radius = width * 0.9;
    const innerRadius = width * 0.1;
    const height = width > 768 ? 400 : 200;
    this.setState({ width, radius, height, innerRadius})
  }

  handleClickOutside = () => {
    this.hideActiveCompany();
  };

  hideActiveCompany = () => {
    this.setState(state => {
      if (state.activeCompany) {
        return { ...state, activeCompany: null, toolTip: false };
      }
      return state;
    })
  };

  getColor = (d, gradient) => {
    let color = (industriesById[d.industry] || {}).color || 'black', opacity = null;
    if (gradient && d.industry) {
      color = 'url(#gradient-' + d.industry.split(' ')[0]  + ')';
      opacity = 0.7;
    }

    if (this.state.hoverCompany) {
      if (d.id === this.state.hoverCompany.id) {
        color = 'white';
      }
    } else if (this.state.activeCompany) {
      if (d.id === this.state.activeCompany.id) {
        color = 'white';
      } else {
        opacity = 0.3;
      }
    } else if (this.props.searchedCompany && d && d.id) {
      if (d.id.toString() === (this.props.searchedCompany || '').toString()) {
        color = 'white'
      } else {
        opacity = 0.3
      }
    }

    if (d.hide) {
      opacity = 0;
    }

    return { color, opacity };
  };

  updateHoverCompany = (hoverCompany) => {
    if (this.state.activeCompany) {
      return;
    }

    let toolTip = hoverCompany ? true : false;

    this.setState({ hoverCompany: hoverCompany, toolTip });
  };

  updateToolTipPosition = (data, event) => {
    if (this.state.activeCompany) {
      return;
    }

    this.setState({
      toolTipTop: event.pageY - (this.wrapper.getBoundingClientRect().top + window.pageYOffset),
      toolTipLeft: event.pageX
    });
  };

  updateActiveCompany = (activeCompany, event) => {
    event.stopPropagation();
    event.nativeEvent.stopImmediatePropagation();

    this.setState({
      activeCompany: activeCompany,
      hoverCompany: null,
      toolTipTop: event.pageY - (this.wrapper.getBoundingClientRect().top + window.pageYOffset),
      toolTipLeft: event.pageX,
      toolTip: true
    });
  };

  hideLandscapeSuggestion = () => {
    this.setState({hideLandscapeSuggestion: true});
  };

  shouldShowLandscapeSuggestion = () => {
    return !this.state.hideLandscapeSuggestion &&
      window.innerHeight >= MOBILE_MAX_WIDTH &&
        this.props.isMobile;
  };

  renderBars(companies) {
    return (
      <g transform={`translate(${this.state.innerRadius},${this.state.height / 2})`}>
        <ReactTransitionGroup component="g" >

          {
            this.fundsRaisedPie(companies).map((item, i) => {
              return (
                <CompanyFundsRasiedBar key={'fundsraised-' + item.data.id}
                                       item={item}
                                       color={this.getColor(item.data)}
                                       d={this.fundsRaisedArc(item)}
                                       hide={item.data.hide}
                                       updateHoverCompany={this.updateHoverCompany}
                                       updateActiveCompany={this.updateActiveCompany}
                                       updateToolTipPosition={this.updateToolTipPosition}
                />

              );
            })
          }

          </ReactTransitionGroup>
        }

        {
          <ReactTransitionGroup component="g" >

            {
              this.valuationPie(companies).map((item, i) => {
                return (
                  <CompanyFundsRasiedBar key={'valuation-' + item.data.id}
                                         item={item}
                                         color={this.getColor(item.data, !item.data.realValuation)}
                                         gradient={!item.data.realValuation}
                                         d={this.valuationArc(item)}
                                         hide={item.data.hide}
                                         updateHoverCompany={this.updateHoverCompany}
                                         updateActiveCompany={this.updateActiveCompany}
                                         updateToolTipPosition={this.updateToolTipPosition}
                  />

                );
              })
            }

          </ReactTransitionGroup>
        }
      </g>
    );
  }

  renderGradientDefs() {
    return (
      <g>
        {
          industries.map(industry => {
            return (
              <defs key={industry.id}>
                <linearGradient id={'gradient-' + industry.id.split(' ')[0]}>
                  <stop style={{stopColor: 'white'}} offset="0" />
                  <stop style={{stopColor: industry.color || 'white'}} offset="1" />
                </linearGradient>
              </defs>
            );
          })
        }
      </g>
    )
  }

  renderMobileVersion(companies) {

    // TODO: don't do this at every rendering
    companies = companies.filter(company => !company.hide);

    companies.sort((a, b) => this.getFundsRaised(b) - this.getFundsRaised(a));
    const company = this.state.activeCompany || this.state.hoverCompany;

    return (
      <div className="FundrasingPieChart" ref={elem => this.wrapper = elem}>
        {
          this.shouldShowLandscapeSuggestion() &&
          <div className="landscapeSuggestion">
            <img src={require('../../assets/phone-GIF.gif')} alt="turn to landscape"/>
            <p>
              To view the desktop version of the chart, turn your phone to landscape.
              <a onClick={this.hideLandscapeSuggestion}>(dismiss)</a>
            </p>
          </div>
        }

        {
          this.state.toolTip &&
          <ToolTip top={this.state.toolTipTop}
            left={this.state.toolTipLeft}
            isMobile={this.props.isMobile}
            company={company}
            companyDetails={this.props.companiesById[this.state.activeCompany.id]}
            patents={(this.props.patentsById || {})[(company || {}).id] || []}
          />
        }

        <div className="mobileTable">
          <table className="table">
            <thead>
              <tr>
                <th>Funds Raised</th>
                <th>Company</th>
                <th>Valuation</th>
              </tr>
            </thead>
            <tbody>
              {
                companies.map(company => {
                  const fundsRaisedStyle = {
                    width: (this.getFundsRaised(company) || 0) / this.props.maxVal * 100 + '%',
                    backgroundColor: (industriesById[company.industry] || {}).color
                  };

                  const valuationStyle = {
                    width: (company.valuation || 0) / this.props.maxVal * 100 + '%',
                    backgroundColor: (industriesById[company.industry] || {}).color
                  };

                  return (
                    <tr key={company.id} onClick={event => {
                      this.updateActiveCompany(company, event);
                    }}>
                      <td className="fundsRaised">
                        <div className="barVal">
                          <div className="bar" style={fundsRaisedStyle}></div>
                          <span className="val">{ currency.truncated(this.getFundsRaised(company)) }</span>
                        </div>
                      </td>
                      <td className="name">{company.name}</td>
                      <td className="valuation">
                        <div className="barVal">
                          <div className="bar" style={valuationStyle}></div>
                          <span className="val">{ currency.truncated(company.valuation) }</span>
                        </div>
                      </td>
                    </tr>
                  );
                })
              }
            </tbody>
          </table>
        </div>
      </div>
    )
  }

  render() {
    const center = { x: this.state.innerRadius, y: this.state.height / 2 };
    const companies = this.props.companies.filter(company => !company.exit);

    this.fundsRaisedArc.innerRadius(this.state.innerRadius);
    this.valuationArc.innerRadius(this.state.innerRadius);

    if (this.props.isMobile) {
      return this.renderMobileVersion(companies);
    }

    const company = this.state.activeCompany || this.state.hoverCompany;
    return (
      <div className="FundrasingPieChart" ref={elem => this.wrapper = elem}>
        {
          this.state.hoverCompany &&
          <ToolTip top={this.state.toolTipTop}
                   left={this.state.toolTipLeft}
                   isMobile={this.props.isMobile}
                   company={company}
                   companyDetails={this.props.companiesById[this.state.hoverCompany.id]}
                   patents={(this.props.patentsById || {})[(company || {}).id] || []}
          />
        }

        {
          this.state.activeCompany &&
          //<CompanyModal company={this.props.companiesById[this.state.activeCompany.id]}
          //              onClose={this.hideActiveCompany}/>

          <ToolTip top={this.state.toolTipTop}
            left={this.state.toolTipLeft}
            isMobile={this.props.isMobile}
            company={company}
            companyDetails={this.props.companiesById[this.state.activeCompany.id]}
            patents={(this.props.patentsById || {})[(company || {}).id] || []}
          />
        }

        <svg width={this.state.width} height={this.state.height}>
          <g transform={`translate(0,${this.state.height / 2})`}>
            <line x1="-150" y1="0" x2={this.state.width} y2="0" strokeWidth="1" stroke="#4c4c4c" />
          </g>

          <g transform={`translate(20, 0)`}>
            { this.renderGradientDefs() }
            { this.renderBars(companies) }

            <AxisCircles values={this.props.circleAxis}
                         maxVal={this.props.maxVal}
                         radius={this.state.radius}
                         innerRadius={this.state.innerRadius}
                         cy={center.y}
                         cx={center.x} />

            <g transform={`translate(${center.x}, ${center.y})`} className="centerText">
              <text y={-this.state.innerRadius / 2 + 5}>FUNDS RAISED</text>
              <text y={7} className="count"><tspan className="companiesCount">{companies.filter(c => !c.hide).length}</tspan> COMPANIES</text>
              <text y={this.state.innerRadius / 2}>VALUATION</text>
            </g>
          </g>

        </svg>
      </div>
    )
  }
}
