import React, { useReducer, useEffect } from "react";
import "./Dashboard.css";
import Header from "./Header";
import Event from "./Event";
import Search from "./Search";
import { apiKey } from "./apiKey/apiKey";

const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
const targetUrl = `http://api.eventful.com/json/events/search?app_key=${apiKey}&keywords=family&location=48103&date=Future`;

const initialState = {
  loading: true,
  events: [],
  eventType: "family",
  errorMessage: null
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SEARCH_EVENTS_REQUEST":
      return {
        ...state,
        loading: true,
        errorMessage: null
      };
    case "SEARCH_EVENTS_SUCCESS":
      return {
        ...state,
        loading: false,
        events: action.payload,
        eventType: action.eventType
      };
    case "SEARCH_EVENTS_FAILURE":
      return {
        ...state,
        loading: false,
        errorMessage: action.error
      };
    default:
      return state;
  }
};

const Dashboard = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  useEffect(() => {
    fetch(proxyUrl + targetUrl)
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        dispatch({
          type: "SEARCH_EVENTS_FAILURE",
          error: response.error
        });
      }
    }) 
    .then(json => {
      dispatch({
        type: "SEARCH_EVENTS_SUCCESS",
        payload: json.events.event,
        eventType: "family"
    	});
    });
  }, []);

  const search = searchValue => {
    dispatch({
      type: "SEARCH_EVENTS_REQUEST"
  	});
    fetch(proxyUrl + `http://api.eventful.com/json/events/search?app_key=${apiKey}&keywords=${searchValue}&location=48103&date=Future`)
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        dispatch({
          type: "SEARCH_EVENTS_FAILURE",
          error: response.error
        });
      }
    }) 
    .then(json => {
      dispatch({
        type: "SEARCH_EVENTS_SUCCESS",
        payload: json.events.event,
        eventType: searchValue
    	});
    });
	};

    const { events, eventType, errorMessage, loading } = state;
    console.log(events);

    return (
    <div className="dashboard">
      <Header text={`Ann Arbor ${eventType} Events`} />
      <Search search={search} />
      <div className="events">
        {loading && !errorMessage ? (
          <span>loading... </span>
        ) : errorMessage ? (
          <div className="errorMessage">{errorMessage}</div>
        ) : (
          <div className="thumbnails">
            {events.map((event, index) => (
              <Event key={`${index}-${event.title}`} event={event} index={index} />
            ))}
          </div>           
        )}
      </div>
    </div>
  );
};

export default Dashboard;
