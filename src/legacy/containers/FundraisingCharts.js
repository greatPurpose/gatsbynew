// © 2017 VARRO ANALYTICS. ALL RIGHTS RESERVED.
import React, { Component } from 'react';

import { getFundraisingData, getPatentsCounts } from '../helpers/agent';
import { defaultFilters, fundraisingZoom, MOBILE_MAX_WIDTH,
  MEDIUM_SCREEN_SIZE, LEFT_SIDEBAR_PERCENT } from '../constants';
import IndustryFilters from '../components/fundraising/filters/IndustryFilters';
import FundraisingTierFilter from '../components/fundraising/filters/FundraisingTierFilter';
import MoneyTypeFilter from '../components/fundraising/filters/MoneyTypeFilter';
import DateFilter from '../components/fundraising/filters/DateFilter'
import FundraisingPieChart from '../components/fundraising/FundraisingPieChart';
import ExitsTable from '../components/fundraising/ExitsTable';
import FundraisingZoom from '../components/fundraising/FundraisingZoom';
import LeftSideBar from '../components/LeftSideBar';
import SearchBook from '../components/SearchBox';

import './FundraisingCharts.css';

const fundraisingTierLimits = {
  'under5': { from: 0, to: 1000000},
  '5to25': { from: 5000000, to: 25000000},
  'over25': { from: 25000000, to: 3000000000 }
};

export default class FundsraisingCharts extends Component {
  state = {
    filters: defaultFilters,
    isMobile: false,
    allDates: [],
    companiesByDates: {},
    companyOptions: [],
    searchedCompany: null,
    loading: true,
    companiesById: {},
    filteredCompanies: [],
    patentsById: {},
    currentFundsRaised: {},

    showZoomIn: false,
    showZoomOut: false,
    zoomMaxVal: fundraisingZoom.out.maxVal,
    circleAxis: fundraisingZoom.out.circleAxis,

    sideBarLeft: 0,//-window.innerWidth * LEFT_SIDEBAR_PERCENT,

    projectedValuations: false
  };

  componentWillMount() {
    // getTest()

    getFundraisingData()
      .then(response => {
        this.setState(state => {
          state.filters.date = {
            index: response.allDates.length - 1,
            value: response.allDates[response.allDates.length - 1]
          };

          state.allDates = response.allDates;
          state.companyOptions = Object.keys(response.companiesById).map(id =>  {
            return { value: id, label: response.companiesById[id].name }
          });
          state.companiesById = response.companiesById;
          state.loading = false;
          state.companiesByDates = response.companiesByDates;

          state.currentFundsRaised = {};
          state.companiesByDates[state.filters.date.value].forEach(company => {
            state.currentFundsRaised[company.id] = company.fundsRaised + company.publicFundsRaised;
          });

          state.companiesById = response.companiesById;
          state.filteredCompanies = this.getFilteredCompanies(state.filters, state.filters.date, state.companiesByDates, null, state.currentFundsRaised);
          return state;
        })
      });

    getPatentsCounts()
      .then(patentsById => {
        this.setState({ patentsById });
      });
  }

  componentDidMount() {
    window.addEventListener("resize", this.resizeHandler);
    window.addEventListener("orientationchange", this.resizeHandler);
    document.addEventListener('click', this.hideLeftSideBarIfOpened);
    this.resizeHandler();
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.resizeHandler);
    window.removeEventListener("orientationchange", this.resizeHandler);
    document.removeEventListener('click', this.hideLeftSideBarIfOpened);
  }

  resizeHandler = () => {
    let sideBarLeft = this.state.sideBarLeft;
    if (sideBarLeft < 0) {
      sideBarLeft = -window.innerWidth * LEFT_SIDEBAR_PERCENT;
    }

    this.setState({
      isMobile: window.innerWidth <= MOBILE_MAX_WIDTH,
      sideBarLeft
    })
  };

  onFiltersButtonClick = event => {
    event.stopPropagation();
    event.nativeEvent.stopImmediatePropagation();

    this.setState(state => {
      if (state.sideBarLeft === 0) {
        state.sideBarLeft = -window.innerWidth * LEFT_SIDEBAR_PERCENT;
      } else {
        state.sideBarLeft = 0
      }

      return state;
    })
  };

  hideLeftSideBarIfOpened = () => {
    this.setState(state => {
      if (state.sideBarLeft === 0) {
        state.sideBarLeft = -window.innerWidth * LEFT_SIDEBAR_PERCENT;
      }
      return state;
    })
  };

  getFilteredCompanies = (filters, date, companiesByDates, oldData, currentFundsRaised) => {
    if (!date) {
      date = filters.date;
    }

    if (!companiesByDates) {
      companiesByDates = this.state.companiesByDates;
    }

    if (!currentFundsRaised) {
      currentFundsRaised = this.state.currentFundsRaised;
    }

    if (oldData) {
      return oldData.map(company => {
        company.hide = 0;

        if (filters.industry &&
          filters.industry !== company.industry) {
            company.hide = 1;
        }

        if (filters.fundraisingTier) {
          const limits = fundraisingTierLimits[filters.fundraisingTier];
          if (!(limits.from <= currentFundsRaised[company.id] && currentFundsRaised[company.id] < limits.to)) {
            company.hide = 1;
          }
        }

        return company;
      })
    }

    const filtered = companiesByDates[date.value].filter(company => {
      company.hide = 0;

      if (!company.fundsRaised) {
        return false;
      }

      if (filters.industry &&
          filters.industry !== company.industry) {
        return false;
      }

      if (filters.fundraisingTier) {
        const limits = fundraisingTierLimits[filters.fundraisingTier];
        if (!(limits.from <= currentFundsRaised[company.id] && currentFundsRaised[company.id] < limits.to)) {
          return false
        }
      }

      return true;
    });

    while (filtered.length < 60) {
      filtered.push({fundsRaised: 0, valuation: 0, hide: true})
    }

    return filtered;
  };

  setFilter = type => value => {
    this.setState(state => {
      if (state.loading) {
        return state;
      }

      const newFilters = { ...state.filters };

      newFilters[type] = value;
      if (type === 'industry' && state.filters[type] === value) {
        newFilters[type] = null;
      }

      return {
        ...state,
        filters: newFilters,
        filteredCompanies: this.getFilteredCompanies(newFilters, null, null, type === 'industry' && newFilters[type] ? state.filteredCompanies : null)
      };
    });
  };

  setIndustryFilter = this.setFilter('industry');

  setDateFilter = this.setFilter('date');

  setFundraisingTier = (value) => {
    const zoomMaxVal = fundraisingZoom.out.maxVal;
    const circleAxis = fundraisingZoom.out.circleAxis;
    let showZoomIn  = false;
    let showZoomOut = false;
    if (this.state.filters.moneyType === 'public' || value === 'under5' || value === '5to25') {
        showZoomIn = true;
        showZoomOut = false;
    }

    this.setState({ zoomMaxVal, circleAxis, showZoomIn, showZoomOut });

    this.setFilter('fundraisingTier')(value);
  };

  setMoneyType = (value) => {

    const zoomMaxVal = fundraisingZoom.out.maxVal;
    const circleAxis = fundraisingZoom.out.circleAxis;
    let showZoomIn  = false;
    let showZoomOut = false;
    if (value === 'public' || this.state.filters.fundraisingTier === 'under5' ||
      this.state.filters.fundraisingTier === '5to25') {
      showZoomIn = true;
      showZoomOut = false;
    }

    this.setState({ zoomMaxVal, circleAxis, showZoomIn, showZoomOut });


    this.setFilter('moneyType')(value);
  };

  clearFilters = () => {
    this.setState(state => {
      return {
        ...state,
        filters: defaultFilters,
        filteredCompanies: this.getFilteredCompanies(defaultFilters)
      };
    });

    this.setFundraisingTier(defaultFilters.fundraisingTier);
  };

  changeProjectedValuations = () => {
    this.setState(state => {
      state.projectedValuations = !state.projectedValuations;
      return state;
    })
  };

  getTier = (value) => {
    return Object.keys(fundraisingTierLimits).filter(tierName => {
      return fundraisingTierLimits[tierName].from <= value &&
        value < fundraisingTierLimits[tierName].to;
    })[0]
  };

  onCompanySearch = (value) => {
    if ((value || {}).value) {
      const fundsRaised = this.state.currentFundsRaised[(value || {}).value];

      const companyTier = this.getTier(fundsRaised);
      if (companyTier !== this.state.filters.fundraisingTier) {
        this.setFundraisingTier(companyTier);
      }
    }

    this.setState({searchedCompany: (value || {}).value});
  };

  zoom = () => {
    this.setState(state => {
      if (state.zoomMaxVal === fundraisingZoom.in.maxVal ||
          state.zoomMaxVal === fundraisingZoom.under5In.maxVal) {
        state.zoomMaxVal = fundraisingZoom.out.maxVal;
        state.circleAxis = fundraisingZoom.out.circleAxis;

        state.showZoomIn = true;
        state.showZoomOut = false;
      } else {
        if (this.state.filters.fundraisingTier === 'under5') {
          state.zoomMaxVal = fundraisingZoom.under5In.maxVal;
          state.circleAxis = fundraisingZoom.under5In.circleAxis;
        } else {
          state.zoomMaxVal = fundraisingZoom.in.maxVal;
          state.circleAxis = fundraisingZoom.in.circleAxis;
        }
        state.showZoomIn = false;
        state.showZoomOut = true;
      }
      return state;
    });
  };

  render() {
    return (
      <div className={'fund'}>


        <div className="container FundsRaisingCharts">
          <div className="row">
            <div className="col-lg-12 header-description">
              <h1>Charting the Rise of the Bioeconomy</h1>
              <p>Varro Analytics is tracking innovative private companies in the biology space. Use the slider below to see how funding and valuations have changed over time and which companies have exited. Click each company in the chart to learn more about it.</p>
            </div>
          </div>

          {/*{*/}
          {/*  window.innerWidth >= MEDIUM_SCREEN_SIZE &&*/}
            <div className="row">
                <div className="industry-description">
                  SORT BY SECTOR:
                </div>
                <IndustryFilters
                  activeIndustry={this.state.filters.industry}
                  onChange={this.setIndustryFilter}
                  clearFilters={this.clearFilters}
                  filters={this.state.filters}
                />
            </div>
          {/*}*/}

          {/*{*/}
          {/*  !(window.innerWidth >= MEDIUM_SCREEN_SIZE) &&*/}
          {/*  <LeftSideBar activeIndustry={this.state.filters.industry}*/}
          {/*               onChange={this.setIndustryFilter}*/}
          {/*               left={this.state.sideBarLeft}*/}
          {/*  />*/}
          {/*}*/}

          <div className="Filters">
              <FundraisingTierFilter value={this.state.filters.fundraisingTier}
                                     projectedValuations={this.state.projectedValuations}
                                     changeProjectedValuations={this.changeProjectedValuations}
                                     onChange={this.setFundraisingTier}
              />

              <DateFilter allDates={this.state.allDates}
                          currentDate={this.state.filters.date}
                          onChange={this.setDateFilter}
                          isMobile={this.state.isMobile}
                          sticky={this.state.filters.date.playing}
              />

              <MoneyTypeFilter value={this.state.filters.moneyType}
                               projectedValuations={this.state.projectedValuations}
                               onChange={this.setMoneyType}
              />
          </div>


          <div className="row SearchBookRow">
            <div className="col-lg-12">
              <SearchBook options={this.state.companyOptions}
                          value={this.state.searchedCompany}
                          onChange={this.onCompanySearch}
              />
            </div>
          </div>

          <div className="row">
            <div className="col-lg-12">
              {
                !this.state.loading &&
                <FundraisingPieChart companies={this.state.filteredCompanies}
                                     searchedCompany={this.state.searchedCompany}
                                     companiesById={this.state.companiesById}
                                     patentsById={this.state.patentsById}
                                     maxVal={this.state.zoomMaxVal}
                                     circleAxis={this.state.circleAxis}
                                     isMobile={this.state.isMobile}
                                     loading={this.state.loading}
                                     moneyType={this.state.filters.moneyType}
                                     projectedValuations={this.state.projectedValuations}
                 />
               }
              {
                this.state.loading &&
                <div style={{height: 350, textAlign: 'center'}} >
                    <img src={require('../assets/loading.gif')} style={{margin: 'auto'}} alt="loading" />
                </div>
              }
            </div>
            <div className="zoom col-lg-12">
              <FundraisingZoom zoomIn={this.state.showZoomIn}
                               zoomOut={this.state.showZoomOut}
                               onClick={this.zoom}
              />
            </div>
          </div>

          <div className="row">
            <div className="col-lg-12">
              <ExitsTable companies={this.state.filteredCompanies}
                          currentDate={this.state.filters.date}
                          isMobile={this.state.isMobile}
              />
            </div>
          </div>

        </div>
      </div>
    )
  }
}
