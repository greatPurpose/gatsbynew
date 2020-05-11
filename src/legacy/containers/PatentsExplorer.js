// © 2017 VARRO ANALYTICS. ALL RIGHTS RESERVED.
import React, { Component } from 'react';
import moment from 'moment';

import { getPatentsData, getDocumentsByCategory } from '../helpers/agent';
import { categories as CATEGORIES, jurisdictions as JURISDICTIONS,
  documentTypes as DOCUMENT_TYPES  } from '../constants';
import SunburstChart from '../components/patents/SunburstChart';
import SunburstFilters from '../components/patents/SunburstFilters';
import PatentsGraph from '../components/patents/PatentsGraph';

export default class PatentsExplorer extends Component {
  state = {
    patentsCount: null,
    matchedPatents: null,
    categories: null,
    graph: null,

    allDates: [],
    filters: {
      currentDate: { index: 0, value: '' },
      jurisdictions: {},
      documentTypes: {}
    }
  };

  callback = () => ''

  componentWillMount() {
    getPatentsData()
      .then(response => {
        let minDate = response[0].filingDate;
        let maxDate = response[0].filingDate;
        response.forEach(patent => {
          if (minDate > patent.filingDate) {
            minDate = patent.filingDate;
          }
          if (maxDate < patent.filingDate) {
            maxDate = patent.filingDate;
          }
        });

        minDate = moment(minDate);
        maxDate = moment(maxDate);
        const allDates = [minDate.format("YYYY-MM-DD")];
        while (minDate < maxDate) {
          minDate = minDate.add(3, 'month');
          allDates.push(minDate.format("YYYY-MM-DD"));
        }

        const categories = this.getCategories(response);
        this.setState(state => {
          state.patentsCount = response;
          state.categories = categories.categories;
          state.matchedPatents = categories.matchedPatents;
          state.allDates = allDates;
          state.filters.currentDate = {
            index: allDates.length - 1,
            value: allDates[allDates.length - 1]
          };

          return state;
        })
      });

    // set up filters
    const allDates = [];

    // TODO: take the max date from the patents
    let startDate = moment('2017-08-01');
    for (var i = 0; i <= 20 * 12 * 3; i+=3) {
      allDates.unshift(startDate.format("YYYY-MM-DD"));
      startDate = startDate.subtract(1, 'month');
    }

    const jurisdictions = {};
    const documentTypes = {};

    JURISDICTIONS.forEach(item => {
      jurisdictions[item.name] = Object.assign({ checked: true }, item);
    });

    DOCUMENT_TYPES.forEach(item => {
      documentTypes[item.name] = Object.assign({ checked: true }, item);
    });

    this.setState({
      allDates,
      filters: {
        currentDate: {
          index: allDates.length - 1,
          value: allDates[allDates.length - 1]
        },
        jurisdictions,
        documentTypes
      }
    });
  }

  loadChartHandler = function(_callback) {
    console.log()
    this.callback = _callback
  }

  getCategories = function (patentsCount, filters) {
    if (!patentsCount) {
      patentsCount = this.state.patentsCount;
    }

    const categories = Object.assign({}, CATEGORIES);

    const matchedPatents = patentsCount.filter(patent => {
      const { filters } = this.state;
      return this.matchFilter(filters, patent);
    });

    const counts = {};
    matchedPatents.forEach(function (patent) {
      counts[patent.category] = (counts[patent.category] || 0) + patent.count;
    });

    categories.children.forEach(function (category) {
      category.children.forEach(function (child) {
        var key = category.name + '-' + child.name;
        child.count = counts[key];
      });
    });


    return {categories,  matchedPatents};
  };

  setDateFilter = (currentDate) => {
    this.setState(state => {
      state.filters.currentDate = currentDate;
      const categories = this.getCategories(null, state.filters);
      state.categories = categories.categories;
      state.matchedPatents = categories.matchedPatents;
      return state;
    });
  };

  updateJurisdiction = name => event => {
    this.setState(state => {
      state.filters.jurisdictions[name].checked = !state.filters.jurisdictions[name].checked;
      const categories = this.getCategories(null, state.filters);
      state.categories = categories.categories;
      state.matchedPatents = categories.matchedPatents;
      return state;
    })
  };

  updateDocumentType = name => event => {
    this.setState(state => {
      state.filters.documentTypes[name].checked = !state.filters.documentTypes[name].checked;
      const categories = this.getCategories(null, state.filters);
      state.categories = categories.categories;
      state.matchedPatents = categories.matchedPatents;
      return state;
    })
  };

  matchFilter = (filters, patent) => {
    if (!patent.jurisdiction) {
      return false;
    }

    if (patent.filingDate > filters.currentDate.value) {
      return false;
    }

    var jurisdiction = patent.jurisdiction;
    if (jurisdiction === 'EP') {
      jurisdiction = 'EPO';
    } else if (jurisdiction === 'JP') {
      jurisdiction = 'Japan';
    } else if (jurisdiction === 'CN') {
      jurisdiction = 'China';
    }

    if (!filters.jurisdictions[jurisdiction].checked) {
      return false;
    }

    if (!filters.documentTypes[patent.docType].checked) {
      return false;
    }

    return true;
  };

  showPatentsGraph = (sequence, activeCategory) => {
    var category = sequence[1] + '-' + sequence[0];

    console.log(category);
    // fetch full patents for this category

    getDocumentsByCategory(category)
      .then(documents => {

        let color = null;
        if (activeCategory.parent) {
          color = activeCategory.parent.data.childrenColor;
        }

        const graph = {nodes: [], links: [], category};
        const degree = {};
        const nodeExists = {};

        var patents = documents.filter(patent => {
          return category === patent.category && this.matchFilter(this.state.filters, patent);
        });

        var maxCitation = 0;
        patents.forEach(function(patent) {
          nodeExists[patent.displayKey] = true;
        });

        patents.forEach(patent => {
          if (patent.links) {
            patent.links.split('|').forEach(function (edge) {
              var ids = edge.split('->');
              if (!nodeExists[ids[0]] || !nodeExists[ids[1]]) {
                return;
              }

              graph.links.push({source: ids[0], target: ids[1]});
              degree[ids[0]] = (degree[ids[0]] || 0) + 1;
              degree[ids[1]] = (degree[ids[1]] || 0) + 1;
            })
          }
        });

        patents.forEach(patent => {
          if (degree[patent.displayKey]) {
            maxCitation = Math.max(maxCitation, patent.citedByCount);
            graph.nodes.push({
              id: patent.displayKey,
              title: patent.title,
              name: patent.displayKey,
              number: patent.displayKey,
              citedByCount: patent.citedByCount,
              publicationKey: patent.publicationKey,
              color: "#af5200",
              size: (patent.citedByCount || 0) / maxCitation * 4 + 4
            })
          }
        });

        console.log(graph);

        this.setState({graph, graphColor: color});
      });
  };

  hideGraph = () => {
    this.setState({graph: null});
  };

  render() {
    return (
      <>
        <div className="PatentsExplorer">
          <SunburstFilters allDates={this.state.allDates}
                           filters={this.state.filters}
                           setDateFilter={this.setDateFilter}
                           updateJurisdiction={this.updateJurisdiction}
                           updateDocumentType={this.updateDocumentType}
          />

          {
            this.state.categories &&
            <SunburstChart categories={this.state.categories}
                           onClick={this.showPatentsGraph}
                           hideGraph={this.hideGraph}
                           onLoad={this.loadChartHandler}
            />
          }
          {
            !this.state.categories &&
            <div style={{height: 350, textAlign: 'center'}} >
              <img src={require('../assets/loading.gif')} style={{margin: 'auto'}} alt="loading" />
            </div>
          }
          <div className="col-md-6">
            {
              this.state.graph &&
                [1].map(i => {
                  console.log(this.state.graph.category);
                  return <PatentsGraph key={this.state.graph.category}
                                       color={this.state.graphColor}
                                       graph={ this.state.graph } />
                })
            }
          </div>
        </div>
      </>
    );
  }
}
