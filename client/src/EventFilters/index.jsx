import React, { Component } from 'react';
import InputGroup from 'react-bootstrap/InputGroup'
import Dropdown from 'react-bootstrap/Dropdown'
import DropdownButton from 'react-bootstrap/DropdownButton'

export default class Filters extends Component {
  mapOption(options) {
    var self = this;
    return options.map(function(option, key){
        return <Dropdown.Item key={key} onClick={self.props.filterBrandClick.bind(self, option)}>{option}</Dropdown.Item>;
    });
  }
  
  render() {
    var options = this.mapOption(this.props.options);
    var title = this.props.options[this.props.selectedBrand];
    return (
    <InputGroup>
        <DropdownButton id="dropdown-basic-button" title={title}>
            {options}
        </DropdownButton>
    </InputGroup>
    );
  }
}
