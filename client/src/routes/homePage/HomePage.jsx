import React, { useContext } from "react";
import "./homePage.scss";
import SearchBar from "../../components/searchBar/SearchBar";
import { AuthContext } from "../../context/AuthContext";

function HomePage() {
  const {currentUser} = useContext(AuthContext);
  // console.log(currentUser );
  

  return (
    <div className="homePage">
      <div className="textContainer">
        <div className="wrapper">
          <h1 className="title">Find Real Estate & Get Your Dream Place</h1>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rem,
            praesentium natus? Pariatur molestiae quaerat porro, vero,
            reprehenderit assumenda officia amet mollitia, natus nam modi alias!
          </p>

          <SearchBar />

          <div className="boxes">
            <div className="box">
              <h1>10+</h1>
              <h2>Years of Experience</h2>
            </div>
            <div className="box">
              <h1>200</h1>
              <h2>Awards Gained</h2>
            </div>
            <div className="box">
              <h1>2000+</h1>
              <h2>Property Ready</h2>
            </div>
          </div>
        </div>
      </div>
      <div className="imgContainer">
        <img src="/bg.png" alt="HomePage" />
      </div>
    </div>
  );
}

export default HomePage;
