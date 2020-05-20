import React from "react";
import { images } from "./imageLinks";

const Event = ({ event, index }) => {
  const image =
    event.image === null ? images[index] : event.image;
  return (
    <div className="event">
      <h2 className="title">{event.title}</h2>
      <div>
        <img className="image"
          alt={event.title}
          src={image}
        />
      </div>
      <button className="button">
        <a className="link"
          href={event.url}
          target="_blank"
          rel="noopener noreferrer">
          link
        </a>
      </button>
    </div>
  );
};


export default Event;