import React, { Component } from 'react';
import Select from 'react-select';


export default class SearchBox extends Component {
  render() {
    return (
      <div style={{width: 300, margin: 'auto'}}>
        <Select
          name="Company Name"
          value={this.props.value}
          placeholder="Company Name"
          options={this.props.options || []}
          onChange={this.props.onChange}
        />
      </div>
    );
  }
}