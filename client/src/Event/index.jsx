import React, { Component } from 'react';
import './Event.css';
import Card from 'react-bootstrap/Card'
import Badge from 'react-bootstrap/Badge'
import Accordion from 'react-bootstrap/Accordion'

export default class Event extends Component {
  render() {
    const monthNames = ["January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];
    var date = new Date(this.props.date);
    var datestring = monthNames[date.getMonth()] + ' ' + date.getDate()
    return (
        <Card className="text-left">
          <Accordion.Toggle as={Card.Header} eventKey={this.props.id}>
            {datestring} {this.props.name} <span className="pull-right">{this.props.state}</span>
          </Accordion.Toggle>
          <Accordion.Collapse eventKey={this.props.id}>
            <Card.Body>
              <Card.Title>
                <Badge variant="info">
                  {this.props.brand}
                </Badge>
                <p>{this.props.name}</p>
                
              </Card.Title>
              <Card.Text>
                {this.props.time}<br />
                {this.props.location}<br />
                {this.props.shop}<br />
                {this.props.phone}<br />
              </Card.Text>
            </Card.Body>
          </Accordion.Collapse>
        </Card>
    );
  }
}
