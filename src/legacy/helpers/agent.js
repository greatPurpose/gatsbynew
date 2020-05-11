// © 2017 VARRO ANALYTICS. ALL RIGHTS RESERVED.
// import superagentPromise from 'superagent-promise';
// import _superagent from 'superagent';
import moment from 'moment';
import axios from 'axios'
import { sliderStartYear } from '../constants';

// const superagent = superagentPromise(_superagent, global.Promise);
const apiHost = 'https://api.varroanalytics.com/api/';
//const apiHost = 'http://localhost:8000/api/';
//const apiHost = 'http://api.alexcazacu.info/api/';

let patents = null;
let patentsById = null;
let token = null;
const tokenPlugin = req => {
  if (token) {
    req.set('authorization', `Token ${token}`);
  }
};

function extractEventsFromCompaniesData(companies) {
  const companiesByDates = {};
  const allCompaniesByDates = {};
  const companiesById = {};

  companies.forEach(company => {
    company = Object.assign({}, company);

    // fundingRounds events
    const events = company.investment_set
      .map(event =>({
          type: 'fundingRound',
          date: event.date,
          fundsRaised: event.amount
        })
      );

    // valuation events
    company.valuation_set
      .forEach(event =>
          events.push({
            type: 'valuation',
            date: event.date,
            valuation: event.amount
          })
      );

    // awards events
    company.award_set
      .forEach(event =>
        events.push({
          type: 'publicFundingRound',
          date: event.date,
          publicFundsRaised: event.amount
        })
      );


    // revenue events
    company.revenue_set
      .forEach(event =>
        events.push({
          type: 'revenue',
          date: event.date,
          revenue: event.amount
        })
      );

    if (company.exit_set && company.exit_set[0]) {
      const exit = company.exit_set[0];
      if (exit.type === 'ipo') {
        events.push({
          type: 'exit',
          date: exit.date,
          exit: {
            group: company.industry,
            name: company.name,
            exitDate: exit.date,
            exitType: 'IPO',
            stockSymbol: exit.stockSymbol
          }
        });

        exit.marketcapital_set
          .forEach(function (event) {
            events.push({
              type: 'marketCapital',
              date: event.date,
              marketCapital: event.amount
            });
          });

      } else if (exit.type === 'acquisition') {
        events.push({
          type: 'exit',
          date: exit.date,
          exit: {
            group: company.industry,
            name: company.name,
            exitDate: exit.date,
            exitType: 'Acquired',
            acquisitionPrice: exit.acquisitionPrice,
            acquisitionNewOwner: exit.acquisitionNewOwner
          }
        })
      }
    }

    events.sort(function (a, b) {
      if(a.date < b.date) { return -1; }
      if(a.date > b.date) { return  1; }
      return 0;
    });

    let data = {
      id: company.id,
      name: company.name,
      fundsRaised: 0,
      revenue: 0,
      publicFundsRaised: 0,
      date: null,
      industry: company.industry,
      valuation: 0
    };

    const companyByDates = {};
    events.forEach(event => {
      let date = event.date;
      const year = parseInt(date.split('-')[0], 10);
      if (year < sliderStartYear) {
        date = sliderStartYear + '-01-01';
      } else {
        let month = parseInt(date.split('-')[1], 10);
        month = (parseInt((month - 1) / 3, 10) * 3 + 1).toString();
        if (month.length < 2) {
          month = "0" + month;
        }

        date = year + '-' + month + '-01'
      }

      const newData = {
        date: date
      };

      if (event.type === 'fundingRound') {
        newData.fundsRaised = data.fundsRaised + event.fundsRaised;
        if (!data.realValuation) {
          newData.valuation = newData.fundsRaised * (Math.random() * 1.2 + 1.1)
        }
      } else if(event.type === 'publicFundingRound') {
        newData.publicFundsRaised = data.publicFundsRaised + event.publicFundsRaised;
      } else if (event.type === 'valuation') {
        newData.valuation = event.valuation;
        newData.realValuation = true;
      } else if (event.type === 'exit') {
        event.exit.fundsRaised = data.fundsRaised || 0;
        event.exit.publicFundsRaised = data.publicFundsRaised || 0;
        event.exit.valuation = data.valuation;
        event.exit.marketCapital = data.marketCapital;
        event.exit.date = event.date;

        newData.exit = event.exit;
      }  else if (event.type === 'marketCapital') {
        newData.marketCapital = event.marketCapital;
      } else if (event.type === 'revenue') {
        newData.revenue = event.revenue;
      }

      data = Object.assign(Object.assign({}, data), newData);

      // keep the last data
      companyByDates[data.date] = data;
    });


    for (let date in companyByDates) {
      companiesByDates[date] = companiesByDates[date] || [];
      companiesByDates[date].push(companyByDates[date])
    }

    companiesById[company.id] = Object.assign({ events }, company);
  });


  const dates = Object.keys(companiesByDates).sort();
  const minDate = dates[0];
  const maxDate = dates[dates.length - 1];

  const allDates = [];

  const diff = moment(maxDate).diff(minDate, 'months', true);
  for (let i = 0; i <= diff; i+=3) {
    const mm = moment(minDate).add(i, 'months');
    let month = (mm.month() + 1).toString();
    if (month.length < 2) {
      month = "0" + month;
    }

    allDates.push(mm.year() + "-" + month + "-01");
  }

  let prev = [];
  let companyIdToPrevIndex = {};
  allDates.forEach(date => {
    (companiesByDates[date] || []).forEach(company => {
      if (!companyIdToPrevIndex[company.id]) {
        prev.push(company);
        companyIdToPrevIndex[company.id] = prev.length - 1;
      } else {
        prev[companyIdToPrevIndex[company.id]] = company;
      }
    });

    prev = [].concat(prev);
    allCompaniesByDates[date] = prev;
  });

  return {
    companiesByDates: allCompaniesByDates,
    allDates,
    companiesById
  };
}

export const getFundraisingData = () => {
  return axios.get(apiHost + 'companies?format=json')
    .then(response => {
      const companies = response.data.companies;

      const { companiesByDates, allDates, companiesById } = extractEventsFromCompaniesData(companies);

      return {
        companiesByDates,
        allDates,
        companiesById
      }
    });
};

export const getPatentsData = () => {
  if (patents) {
    return new Promise((resolve) => resolve(patents));
  }

  return axios.get(apiHost + 'documents?format=json')
    .then(response => {
      return response.data.documents.map(doc => ({
        category: doc.category,
        filingDate: doc.filing_date,
        jurisdiction: doc.jurisdiction,
        docType: doc.document_type,
        count: doc.count
      }));
    })
};

export const getDocumentsByCategory = (category) => {
  return axios.get(apiHost + 'documents/' + category + '?format=json')
    .then(response => {
      //const documentsById = {};
      return response.data.documents.map(doc => {
        return {
          category: doc.category,
          filingDate: doc.filing_date,
          jurisdiction: doc.jurisdiction,
          docType: doc.document_type,
          displayKey: doc.display_key,
          publicationKey: doc.publication_key,
          citedByCount: doc.cited_by_count,
          title: doc.title,
          links: doc.links
        }
      });

      //return documentsById;
    })
};

export const getPatentsCounts = () => {
  if (patentsById) {
    return new Promise((resolve) => resolve(patentsById));
  }

  patentsById = {};
  return axios.get(apiHost + 'companies-documents?format=json')
    .then(response => {
      ((response.data || {}).documents || []).forEach(company => {
        const documents = company.documents_set[0] || {};
        patentsById[company.id] = {
          patentApplications: JSON.parse(documents.patent_applications || '[]'),
          grantedPatents: JSON.parse(documents.granted_patents || '[]')
        }
      });

      return patentsById;
    })
};

export const sendFundsSuggestion = (data) => {
  return axios.post(apiHost + 'companies/funds-suggestions?format=json', data).use(tokenPlugin)
    .then(response => {
      return response;
    })
};

export const login = (username, password) => {
  return axios.post(apiHost + 'users/login',{
    user: {username, password}
  })
    .then(response => {
      return response
    })
};

export const setToken = _token => { token = _token; };
