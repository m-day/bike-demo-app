import React, { Component } from 'react';
import './Event.css';
import Card from 'react-bootstrap/Card'
import Badge from 'react-bootstrap/Badge'

export default class Event extends Component {
  render() {
    const monthNames = ["January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];
    var date = new Date(this.props.date);
    var datestring = monthNames[date.getMonth()] + ' ' + date.getDate()
    return (
        <Card className="text-left">
          <Card.Header>{datestring}<span className="pull-right">{this.props.state}</span></Card.Header>
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
        </Card>
    );
  }
}
