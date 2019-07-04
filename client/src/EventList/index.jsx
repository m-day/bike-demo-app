import React, { Component } from 'react';
import Event from '../Event';
import EventFilters from "../EventFilters";
import CardGroup from 'react-bootstrap/CardGroup'
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

  groupEvents(events, cols=3) {
    var groupedEvents = [];
    var group = [];
    var group_key = 0;
    if (events.length > 0) {
      for (var i = 0; i < events.length; i++){
        var event = <Event 
                      key={i}
                      date={events[i].date.$date} 
                      state={events[i].state}
                      name={events[i].name}
                      time={events[i].time}
                      location={events[i].location}
                      shop={events[i].shop}
                      phone={events[i].phone}
                      brand={events[i].brand}
                      />;
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

  filterBrandClick(brand) {
    var self = this;
    this.setState({'selectedBrand': this.state.brands.indexOf(brand)});
    this.getEvents(brand)
    .then(function(events) {
      self.setState({events: events});
    });
  }
  
  render() {
    var events = this.groupEvents(this.state.events);
    return (
      <>
      <EventFilters
        filterBrandClick={this.filterBrandClick}
        options={this.state.brands}
        selectedBrand={this.state.selectedBrand}
      />
      <div>
        {events}
      </div>
      </>
    );
  }
}
