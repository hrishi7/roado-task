import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import { Grid,Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  singleRow: {
    padding: "10px",
  },
}));

export const WordCard = (props) => {
  let { singleData } = props;
  const classes = useStyles();
  return (
    <Grid container className={classes.singleRow}>
      <Grid item md={6} xs={12} align="center">
      {singleData.word}
      </Grid>
      <Grid item md={6} xs={12} align="center">
        {singleData.language}
      </Grid>
    </Grid>
  );
};
