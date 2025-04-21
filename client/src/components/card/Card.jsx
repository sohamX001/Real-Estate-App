import React from "react";
import "./card.scss";
import { Link } from "react-router-dom";
import {
  Bath,
  BedSingle,
  Bookmark,
  MapPin,
  MessageSquareText,
} from "lucide-react";

function Card({ item }) {
  return (
    <div className="card">
      {/* img-container */}
      <Link to={`/${item.id}`} className="imgContainer">
        <img src={item.images[0]} alt="Real Estate image" />
      </Link>

      {/* text-container */}
      <div className="textContainer">
        <Link to={`/${item.id}`}>
          <h2 className="cardTitle">{item.title}</h2>
        </Link>
        <p className="cardAddress">
          <MapPin className="cardAddrIcon" /> {item.address}
        </p>
        <p className="cardPrice">${item.price}</p>

        <div className="cardBottom">
          <div className="feature">
            <BedSingle />
            <p> {item.bedroom} <span>bedroom</span></p>
          </div>
          <div className="feature">
            <Bath />
            <p> {item.bathroom} <span>bathroom</span></p>
          </div>
          <div className="feature">
            <Bookmark className="cardIcon" />
          </div>
          <div className="feature">
            <MessageSquareText className="cardIcon" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card;
