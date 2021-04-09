import React from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { WordCard } from "./WordCard";
import { Divider } from "@material-ui/core";
export const InfiniteList = (props) => {
  /*
   * destructuring all props for easy to use
   */
  const { openInPopup, data, fetchData, hasMore, loading } = props;
  return (
    <InfiniteScroll
      dataLength={data.length}
      next={fetchData}
      hasMore={hasMore}
      loader={loading && <h4>Loading ... </h4>}
    >
      {data.map((singleData, index) => (
        <div
          key={index}
          style={{ cursor: "pointer" }}
          onClick={() => openInPopup(singleData)}
        >
          <WordCard singleData={singleData} />
          <Divider />
        </div>
      ))}
    </InfiniteScroll>
  );
};
