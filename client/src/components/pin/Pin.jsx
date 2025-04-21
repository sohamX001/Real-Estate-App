import React from "react";
import "./pin.scss";
import { Marker, Popup } from "react-leaflet";
import { Link } from "react-router-dom";

function Pin({ item }) {
  return (
    <Marker position={[item.latitude, item.longitude]}>
      <Popup className="popup">
        <div className="popupContainer">
          <img src={item.img} alt="Home Image" />
          <div className="textContainer">
            <Link to={`/${item.id}`}>{item.title}</Link>
            <div className="textBottom">
              <span className="bed">{item.bedroom} bed</span>
              <b>${item.price}</b>
            </div>
          </div>
        </div>
      </Popup>
    </Marker>
  );
}

export default Pin;
