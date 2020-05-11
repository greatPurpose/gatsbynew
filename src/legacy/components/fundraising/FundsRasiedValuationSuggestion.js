// © 2017 VARRO ANALYTICS. ALL RIGHTS RESERVED.
import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import Modal from 'react-modal';
import 'react-datepicker/dist/react-datepicker.css';
import { sendFundsSuggestion } from '../../helpers/agent';

import './FundsRasiedValuationSuggestion.css';

const modalStyle = {
  content: {
    maxWidth: 500,
    margin: 'auto',
    zIndex: 10,
    top: 50,
    //bottom: 'auto',
    color: 'black',
    padding: 20,
    fontSize: 13
  },
  overlay: {
    zIndex: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.5)'
  }
};

export default class FundsRasiedValuationSuggestion extends Component {
  state = {
    date: null,
    showForm: true
  };

  onClick = (event) => {
    event.stopPropagation();
    event.nativeEvent.stopImmediatePropagation();
  };

  handleDateChange = (date) => {
    this.setState({ date });
  };

  submit = (event) => {
    event.preventDefault();
    event.stopPropagation();

    const data = {
      id: this.props.company.id,
      date: this.state.date ? this.state.date.format('YYYY-MM-DD') : '',
      multiple: this.multiple.value,
      amount: this.amount.value,
      valuation: this.valuation.value,
      leadFunder: this.leadFunder.value,
      sourceUrl: this.sourceUrl.value,
      notes: this.notes.value
    };

    sendFundsSuggestion(data)
      .then(response => {
        this.setState({
          showForm: false,
          successMessage: 'Thank you for getting in touch. We will review your information shortly.',
          errorMessage: null
        });
      })
      .catch(error => {
        console.log(error);
        this.setState({
          showForm: true,
          errorMessage: error.response ? (error.response.body.error || {}).message : error.message
        });
      });
  };

  render() {
    return (
        <Modal
          isOpen={true}
          onAfterOpen={() => {}}
          onRequestClose={() => {}}
          closeTimeoutMS={100}
          style={modalStyle}
          contentLabel="Modal"
        >
          <div className="FundsRasiedValuationSuggestion" onClick={this.onClick}>

            {
              this.state.errorMessage &&
              <div className="alert alert-danger">
                { this.state.errorMessage }
              </div>
            }

            {
              this.state.showForm &&
              <form onSubmit={this.submit}>
                <p style={{marginBottom: 20}}>
                  We would love to hear from you. Please provide the following info.
                  The more information provided, the greater the odds of acceptance.
                </p>

                <div className="form-group">
                  <DatePicker
                    selected={this.state.date}
                    placeholderText="Date of funding event*"
                    onChange={this.handleDateChange}
                    dateFormat="YYYY-MM-DD"
                    className="form-control"
                  />
                </div>

                <div>
                  <div className="form-group">
                    <input type="number" className="form-control" placeholder="Funding Amount($)*"
                           ref={e => this.amount = e}/>
                  </div>
                </div>

                <div>
                  <div className="form-group">
                    <input type="number" className="form-control" placeholder="Post money valuation($)*"
                           ref={e => this.valuation = e}/>
                  </div>
                </div>


                <div>
                  <div className="form-group">
                    <input type="number" className="form-control" placeholder="Valuation Multiple"
                           ref={e => this.multiple = e}/>
                  </div>
                </div>


                <div>
                  <div className="form-group">
                    <input type="text" className="form-control" placeholder="Lead Funder"
                           ref={e => this.leadFunder = e}/>
                  </div>
                </div>


                <div>
                  <div className="form-group">
                    <input className="form-control" placeholder="Relevant Article URL"
                           ref={e => this.sourceUrl = e}/>
                  </div>
                </div>


                <div>
                  <div className="form-group">
                    <textarea className="form-control" placeholder="Additional context / notes"
                           ref={e => this.notes = e}/>
                  </div>
                </div>

                <button type="submit" className="btn btn-primary">
                  Submit Suggestion
                </button>
              </form>
            }

            {
              this.state.successMessage &&
              <div className="alert alert-success">
                { this.state.successMessage }
              </div>
            }

          </div>
        </Modal>
    )
  }
}