import React, { useEffect, useState } from "react";
import {  Typography, Divider } from "@material-ui/core";
import { WordCard } from "./reuseable/WordCard";
import { Popup } from "./reuseable/Popup";
import { WordDetails } from "./WordDetails";
import { NewWord } from "./NewWord";
import InfiniteScroll from "react-infinite-scroll-component";
import { AlertMessage } from "./reuseable/AlertMessage";

import {  makeStyles } from "@material-ui/core/styles";
import InputBase from "@material-ui/core/InputBase";
import SearchIcon from "@material-ui/icons/Search";
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
  search: {
    position: "relative",
    margin:"1.5%",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: '#f9f6f7',
    "&:hover": {
      backgroundColor: '#e1f4f3',
    },
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex",
    },
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
  fab: {
    position: 'fixed',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
}));

export const WordList = () => {
  const classes = useStyles();
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(20);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [openPopup, setOpenPopup] = useState(false);
  const [openPopupForm, setOpenPopupForm] = useState(false);
  const [selecetdData, setSelectedData] = useState(null);

  //alertBox
  const [open, setOpen] = React.useState(false);
  const [message, setMessage] = React.useState("");

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    //call redux action to fetch data
   
    // setLoading(true);
    // let result = await getData(page, limit);
    // setLoading(false);
    // if (result.success) {
    //   setPage(page + 1);
    //   setHasMore(result.data.has_more);
    //   setQuotaMax(result.data.quota_max);
    //   setQuotaRemaining(result.data.quota_remaining);
    //   let prevQuestions = [...questions];
    //   Array.prototype.push.apply(prevQuestions, result.data.items);
    //   setQuestions(prevQuestions);
    // } else {
    //   setOpen(true);
    //   setMessage(result.message);
    // }
  };

  const addNewWord = (values, resetForm) =>{
    console.log(values);
  }

  const openInPopup = (data) => {
    setSelectedData(data);
    setOpenPopup(true);
  };

  const openInPopupForm = () => {
    setOpenPopupForm(true);
    console.log(openPopupForm)
  };

  const searching = (query) =>{
    //call redux action with query
  }

  return (
    <div className={classes.root}>
      <div className={classes.search}>
        <div className={classes.searchIcon}>
          <SearchIcon />
        </div>
        <InputBase
        onChange={(e)=>console.log(e.target.value)}
          placeholder="Search…"
          classes={{
            root: classes.inputRoot,
            input: classes.inputInput,
          }}
          inputProps={{ "aria-label": "search" }}
        />
      </div>

      <InfiniteScroll
        dataLength={data.length}
        next={fetchData}
        hasMore={hasMore}
        loader={loading && <h4>Loading ... </h4>}
      >
        {data.map((singleData, index) => (
          <div key={index} className={classes.singleRow}>
            <WordCard
              onClick={() => openInPopup(singleData)}
              singleData={singleData}
            />
            <Divider />
          </div>
        ))}
      </InfiniteScroll>
      <Fab color="primary" aria-label="add" className={classes.fab} onClick={() => openInPopupForm()}>
        <AddIcon />
      </Fab>
      <Popup
        title="Word Details"
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
      >
        <WordDetails word={selecetdData} />
      </Popup>
      <Popup
        title="Add Word"
        openPopup={openPopupForm}
        setOpenPopup={setOpenPopupForm}
      >
        <NewWord 
          addNewWord={addNewWord} 
          loading={loading}
        />
      </Popup>
      {loading === false && data.length === 0 && (
        <Typography
          variant="subtitle1"
          gutterBottom
          style={{ textAlign: "center" }}
        >
          No Data Available!
        </Typography>
      )}
      <AlertMessage open={open} handleClose={handleClose} message={message} />
    </div>
  );
};
