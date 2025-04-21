import React, { useContext, useState } from "react";
import "./singlePage.scss";
import Slider from "../../components/slider/Slider";
import Map from "../../components/map/Map";
import { singlePostData, userData } from "../../lib/dummyData";
import {
  Bath,
  Bed,
  BedDouble,
  Bookmark,
  BookmarkCheck,
  BookMarked,
  BusFront,
  GraduationCap,
  HandCoins,
  HousePlus,
  MapPin,
  MessageSquareText,
  PawPrint,
  Stethoscope,
} from "lucide-react";
import { useLoaderData, useNavigate } from "react-router-dom";
import DOMPurify from "dompurify";
import { AuthContext } from "../../context/AuthContext";
import apiRequest from "../../lib/apiRequest";

function SinglePage() {
  const post = useLoaderData();
  const [saved, setSaved] = useState(post.isSaved || false);
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();
  // console.log(post.isSaved);

  const handleSave = async () => {
    
    if (!currentUser) {
      navigate("/login");
      return;
    }
    
    try {
      const response = await apiRequest.post("/users/save", {
        postId: post.id,
      });
      // setSaved((prev) => !prev);
      setSaved(response.data.isSaved);
    } catch (error) {
      console.log(error);
      // setSaved((prev) => !prev);
    }
  };

  return (
    <div className="singlePage">
      <div className="details">
        <div className="wrapper">
          <Slider images={post.images} />

          <div className="info">
            <div className="top">
              <div className="post">
                <h1>{post.title}</h1>
                <div className="address">
                  <MapPin className="MapPinicon" />
                  <span>{post.address}</span>
                </div>
                <div className="price">$ {post.price}</div>
              </div>
              <div className="user">
                <img src={post.user.avatar || userData.img} alt="User image" />
                <span>{post.user.username}</span>
              </div>
            </div>
            <div
              className="bottom"
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(post.postDetail.desc),
              }}
            ></div>
          </div>
        </div>
      </div>

      <div className="features">
        <div className="wrapper">
          <div className="contentDet">
            <p className="title">General</p>
            <div className="listVertical">
              <div className="feature">
                <HousePlus />
                <div className="featureText">
                  <span>Utilities</span>
                  {post.postDetail.utilities === "owner" ? (
                    <p>Owner is responsible</p>
                  ) : (
                    <p>Tenant is responsible</p>
                  )}
                </div>
              </div>
              <div className="feature">
                <PawPrint />
                <div className="featureText">
                  <span>Pet policy</span>
                  {post.postDetail.pet === "allowed" ? (
                    <p>Pets allowed</p>
                  ) : (
                    <p>Pets not allowed</p>
                  )}
                </div>
              </div>
              <div className="feature">
                <HandCoins />
                <div className="featureText">
                  <span>Property fees</span>
                  <p>{post.postDetail.income}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="contentDet">
            <p className="title">Room details</p>
            <div className="roomDetailContent">
              <div className="feature">
                <img src="./size.png" alt="" />
                <span>{post.postDetail.size} sqft</span>
              </div>
              <div className="feature">
                <BedDouble />
                <span>{post.bedroom} bedroom</span>
              </div>
              <div className="feature">
                <Bath />
                <span>{post.bathroom} bathroom</span>
              </div>
            </div>
          </div>

          <div className="contentDet">
            <p className="title">Nearby places</p>
            <div className="listHorizontal">
              <div className="feature">
                <GraduationCap />
                <div className="featureText">
                  <span>School</span>
                  <p>
                    {post.postDetail.school > 999
                      ? post.postDetail.school / 1000 + "km"
                      : post.postDetail.school + "m"}{" "}
                    away
                  </p>
                </div>
              </div>
              <div className="feature">
                <BusFront />
                <div className="featureText">
                  <span>Bus stop</span>
                  <p>
                    {post.postDetail.bus > 999
                      ? post.postDetail.bus / 1000 + "km"
                      : post.postDetail.bus + "m"}{" "}
                    away
                  </p>
                </div>
              </div>
              <div className="feature">
                <Stethoscope />
                <div className="featureText">
                  <span>Hospital</span>
                  <p>
                    {post.postDetail.hospital > 999
                      ? post.postDetail.hospital / 1000 + "km"
                      : post.postDetail.hospital + "m"}{" "}
                    away
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="contentDet">
            <p className="title">Location</p>
            <div className="mapContainer">
              <Map items={[post]} />
            </div>
          </div>

          <div className="btns">
            <button>
              <MessageSquareText /> Contact Agent
            </button>
            <button onClick={handleSave} style={{ backgroundColor: saved ? "#fece51" : "white"}}>
              {/* {saved
                ? <BookmarkCheck />
                : <Bookmark />} */}
              {saved ? (
                <>
                  <BookmarkCheck /> Place is saved
                </>
              ) : (
                <>
                  <Bookmark /> Save the place
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SinglePage;
