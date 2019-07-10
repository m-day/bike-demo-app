import React, { Component } from 'react';
import './Event.css';
import Card from 'react-bootstrap/Card'
import Badge from 'react-bootstrap/Badge'
import Accordion from 'react-bootstrap/Accordion'

export default function Event(props) {
    return (
        <Card className="text-left">
          <Accordion.Toggle as={Card.Header} eventKey={props.id} className="title">
            <div>{props.month_day}</div> <div className="">{props.name}</div> <div className="">{props.state}</div>
          </Accordion.Toggle>
          <Accordion.Collapse eventKey={props.id}>
            <Card.Body>
              <Card.Title>
                <Badge variant="info">
                  {props.brand}
                </Badge>
                <p>{props.name}</p>
                
              </Card.Title>
              <Card.Text>
                {props.time}<br />
                {props.location}<br />
                {props.shop}<br />
                {props.phone}<br />
              </Card.Text>
            </Card.Body>
          </Accordion.Collapse>
        </Card>
    );
  }

