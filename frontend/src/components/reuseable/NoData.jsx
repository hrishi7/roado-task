import React from "react";
import {Typography} from '@material-ui/core'
export const NoData = (props) => {
  /*
   * destructuring all props for easy to use
   */
  const { data, loading } = props;
  return (
    <>
      {loading === false && data.length === 0 && (
        <Typography
          variant="subtitle1"
          gutterBottom
          style={{ textAlign: "center" }}
        >
          No Data Available!
        </Typography>
      )}
    </>
  );
};
