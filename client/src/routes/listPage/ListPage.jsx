import React, { Suspense } from "react";
import "./listPage.scss";
import { listData } from "../../lib/dummyData";
import Filter from "../../components/filter/Filter";
import Card from "../../components/card/Card";
import Map from "../../components/map/Map";
import { useLoaderData } from "react-router-dom";

function ListPage() {
  // const data = listData;
  const posts = useLoaderData();
  // const data = useLoaderData();

  return (
    <div className="listPage">
      <div className="listContainer">
        <div className="wrapper">
          <Filter />
          <div className="cardList">
            {posts.map((item) => (
              <Card key={item.id} item={item} />
            ))}
            {/* <Suspense fallback={<p>Loading...</p>}>
              <Await
                resolve={data.postResponse}
                errorElement={<p>Error loading posts!</p>}
              >
                {(postResponse) =>
                  postResponse.data.map((post) => (
                    <Card key={post.id} item={post} />
                  ))
                }
              </Await>
            </Suspense> */}
          </div>
        </div>
      </div>
      <div className="mapContainer">
        <Map items={posts} />
      </div>
    </div>
  );
}

export default ListPage;
