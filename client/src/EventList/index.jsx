import React, { Component } from 'react';
import Event from '../Event';
import EventFilters from "../EventFilters";
import CardGroup from 'react-bootstrap/CardGroup'
import Accordion from 'react-bootstrap/Accordion'
import './EventList.css';

export default class EventList extends Component {
  constructor(props) {
    super(props);

    this.state = {
        events: [],
        brands: [],
        selectedBrand: 0
    };

    this.filterBrandClick = this.filterBrandClick.bind(this);
   
  }

  componentDidMount() {
    var self = this;
    this.getAllEvents()
    .then(function(events) {
      self.setState({events: events});
      var brands = events.map((event) => {
        return event.brand;
      });
      self.setState({brands: [...new Set(brands)]});
    });
  }

  getAllEvents() {
    var url = 'http://localhost:5000/allevents';
    return fetch(url, {
        method: 'GET'
    })
    .then(function(response) {
        return response.json();
    });
  }

  getEvents(brand) {
    var url = 'http://localhost:5000/events/' + brand;
    return fetch(url, {
        method: 'GET'
    })
    .then(function(response) {
        return response.json();
    });
  }

  groupEvents(events, cols=1) {
    var groupedEvents = [];
    var group = [];
    var group_key = 0;
    if (events.length > 0) {
      for (var i = 0; i < events.length; i++){
        var event = this.formatEvent(events[i], i);
        group.push(event);
        // groups of three or whatever is left
        if ((i+1) % cols === 0 || i === events.length - 1) {
          groupedEvents.push(
            <CardGroup key={group_key}>
              {group}
            </CardGroup>
          );
          group_key++
          group = [];
        }
      }
    }
    return groupedEvents;
  }

  createAccordion(events) {
    var eventcards = [];
    var accordion;
    for (var i = 0; i < events.length; i++){
      var event = this.formatEvent(events[i], i);
      eventcards.push(event);
    }
    accordion = <Accordion className="event-container">{eventcards}</Accordion>
    return accordion;
  }

  formatEvent(event, key) {
    var formattedEvent = <Event 
            key={key}
            id={key}
            date={event.date.$date} 
            state={event.state}
            name={event.name}
            time={event.time}
            location={event.location}
            shop={event.shop}
            phone={event.phone}
            brand={event.brand}
            />;
    return formattedEvent;
  }

  filterBrandClick(brand) {
    var self = this;
    this.setState({'selectedBrand': this.state.brands.indexOf(brand)});
    this.getEvents(brand)
    .then(function(events) {
      self.setState({events: events});
    });
  }
  
  render() {
    var accordion = this.createAccordion(this.state.events);
    return (
      <>
      <EventFilters
        filterBrandClick={this.filterBrandClick}
        options={this.state.brands}
        selectedBrand={this.state.selectedBrand}
      />
      <div>
        {accordion}
      </div>
      </>
    );
  }
}
