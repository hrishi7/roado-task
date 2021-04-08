import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import { Grid,Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  singleRow: {
    margin: "10px",
  },
}));

export const WordCard = (props) => {
  let { singleData } = props;
  const classes = useStyles();
  return (
    <Grid container className={classes.singleRow}>
      <Grid item md={4} xs={12}>
        <Typography variant="body1">sample card title</Typography>
      </Grid>
      <Grid item md={4} xs={12}>
        <Typography variant="body1">meaning</Typography>
      </Grid>
    </Grid>
  );
};
