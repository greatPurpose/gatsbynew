// © 2017 VARRO ANALYTICS. ALL RIGHTS RESERVED.
import React, { Component } from 'react';
import Modal from 'react-modal';

import currency from '../../helpers/currency';
import { industriesById } from '../../constants';
import './CompanyModal.css';

const modalStyle = {
  content: {
    maxWidth: 970,
    margin: 'auto',
    zIndex: 10,
    top: 50,
    padding: 0
  },
  overlay: {
    zIndex: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.5)'
  }
};

export default class CompanyModal extends Component {

  onClick = event => {
    event.stopPropagation();
    event.nativeEvent.stopImmediatePropagation();
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

  render() {
    const { company } = this.props;

    let fundsRaised = 0;
    let lastDate;
    company.investment_set.forEach(inv => {
      fundsRaised += inv.amount;
      lastDate = inv.date;
    });

    const valuation = this.getValuation(lastDate, company.events);
    const factor = valuation ?
      ((fundsRaised || 0) / valuation).toFixed(2) : 0;

    return (
      <Modal
        isOpen={!!this.props.company}
        onAfterOpen={() => {}}
        onRequestClose={() => {}}
        closeTimeoutMS={100}
        style={modalStyle}
        contentLabel="Modal"
      >
        <div className="CompanyModal" onClick={this.onClick}>
          <div className="modalClose" onClick={this.props.onClose}>
            <icon className="fa fa-close" />
          </div>

          <div className="row">
            <div className="col-lg-12">
              <img className="avatar"
                   src="https://crunchbase-production-res.cloudinary.com/image/upload/c_pad,h_140,w_140/v1488271840/rbfqic7hnawz3rronufr.png"
                   alt="avatar"
              />
              <div className="companyNameSection">
                <h3>{company.name}</h3>
                <div className="industry" style={{color: industriesById[company.industry].color}}>
                  { industriesById[company.industry].name }
                </div>

                <div className="links">
                  <a href={company.crunchbase_url} target="_blank">
                    <img src={require('../../assets/cb-icon-20.png')} alt="cb" />
                  </a>
                  <a className="website" href={company.website} target="_blank">
                    <icon className="fa fa-link" /> <span className="missing">http://biopitchbook.com</span>
                  </a>

                </div>
              </div>

            </div>
          </div>

          <div className="row">
            <div className="col-md-6">
              <table className="table">
                <tbody>
                <tr>
                  <td>Funds Raised</td>
                  <td>{ currency.decimal(fundsRaised) }</td>
                </tr>
                <tr>
                  <td>Valuation</td>
                  <td>{ currency.decimal(valuation) }</td>
                </tr>
                <tr>
                  <td>Revenue</td>
                  <td>?</td>
                </tr>
                <tr>
                  <td>Valuation Multiple</td>
                  <td>{ factor }x</td>
                </tr>
                </tbody>
              </table>
            </div>
            <div className="col-md-6">
              <table className="table">
                <tbody>
                <tr>
                  <td>Founded</td>
                  <td className="missing">2016</td>
                </tr>
                <tr>
                  <td>Headquarters</td>
                  <td>{company.headquarters}</td>
                </tr>
                <tr>
                  <td>Employees</td>
                  <td className="missing">> 100</td>
                </tr>

                </tbody>
              </table>
            </div>
          </div>

          <div className="row">
            <div className="col-lg-12">
              <div className="title">Funding Events</div>
              <table className="table">
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Amount</th>
                    <th>Valuation</th>
                    <th>Lead Funder</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    company.investment_set.map(inv => {
                      return (
                        <tr key={inv.date + '-' + inv.amount}>
                          <td>{ inv.date }</td>
                          <td>{ currency.decimal(inv.amount) }</td>
                          <td>
                            { currency.decimal(this.getValuation(inv.date, company.events)) }
                          </td>
                          <td className="missing">Accel Partners</td>
                        </tr>
                      );
                    })
                  }
                </tbody>
              </table>
            </div>
          </div>

        </div>
      </Modal>

    );
  }
}