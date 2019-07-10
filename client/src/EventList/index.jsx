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

  preprocess(events) {
    var processed = events.map((event) => {
      event['month'] = this.getMonth(event.date.$date);
      event['month_day'] = event['month']  + ' ' + new Date(event.date.$date).getDate();
      return event;
    }); 
    return processed;
  }

  getAllEvents() {
    var url = 'http://localhost:5000/allevents';
    var self = this;
    return fetch(url, {
        method: 'GET'
    })
    .then(function(response) {
        return response.json();
    })
    .then(function(events) {
        return self.preprocess(events);
    });
  }

  getEvents(brand) {
    var url = 'http://localhost:5000/events/' + brand;
    var self = this;
    return fetch(url, {
        method: 'GET'
    })
    .then(function(response) {
        return response.json();
    })
    .then(function(events) {
        return self.preprocess(events);
    });
  }

  // returns the long string month of a date
  getMonth(date) {
    const monthNames = ["January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];
    date = new Date(date);
    var month = monthNames[date.getMonth()];

    return month;
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

  // convert raw event into event component
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
            month={event.month}
            month_day={event.month_day}
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

  // Creates the List of Event elements
  getList(events, groupBy = '') {
    // Group list into multiple accordions based on key
    if (groupBy !== '') {
      var accordions = [];
      var groupedEvents = this.groupBy(events, 'month');
      console.log(groupedEvents);
      for (var prop in groupedEvents) {
        const accordion = this.createAccordion(groupedEvents[prop]);
        accordions.push(<h3>{prop}</h3>);
        accordions.push(accordion);
      } 

      return accordions;
    // or just one big accordion
    } else {
      return this.createAccordion(events);
    }
  }

  groupBy(arr, prop) {
    return arr.reduce(function (acc, obj) {
      var key = obj[prop];
      if (!acc[key]) {
        acc[key] = [];
      }
      acc[key].push(obj);
      return acc; 
    }, {});
  }
  
  render() {
    const listLength = this.state.events.length;
    var list;
    if (listLength > 0) {
      list = this.getList(this.state.events, 'brand');
    } else {
      list = <p>There are no events that fit the current criteria</p>;
    }
    return (
      <div className='event-list'>
      <EventFilters
        filterBrandClick={this.filterBrandClick}
        options={this.state.brands}
        selectedBrand={this.state.selectedBrand}
      />
      <div>
        {list}
      </div>
      </div>
    );
  }
}
