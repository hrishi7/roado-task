import React, { useEffect, useState } from "react";

import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import { makeStyles } from "@material-ui/core/styles";

/**redux related functions */
import { useSelector, useDispatch } from "react-redux";
import { searchWords, saveNewWord } from "../actions/wordActions";

/** importing Components*/
import { WordDetails } from "./WordDetails";
import { NewWord } from "./NewWord";

/**importing all required reuseable components */
import { Popup } from "./reuseable/Popup";
import { AlertMessage } from "./reuseable/AlertMessage";
import { SearchBox } from "./reuseable/SearchBox";
import { InfiniteList } from "./reuseable/InfiniteList";
import { NoData } from "./reuseable/NoData";

/**styling component */
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
    margin: "1.5%",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: "#f9f6f7",
    "&:hover": {
      backgroundColor: "#e1f4f3",
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
    position: "fixed",
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
}));

export const WordList = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  /**getting redux global state */
  let mydata = useSelector((state) => state);

  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(20);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [openPopup, setOpenPopup] = useState(false);
  const [openPopupForm, setOpenPopupForm] = useState(false);
  const [selecetdData, setSelectedData] = useState(null);
  const [saveLoading, setSaveLoading] = useState(false);

  //state for alert message
  const [open, setOpen] = React.useState(false);
  const [message, setMessage] = React.useState("");

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  useEffect(() => {
    setData(mydata.wordReducer.words);
    if (mydata.wordReducer.error !== "") {
      setMessage(mydata.wordReducer.error);
      setOpen(true);
    }
  }, [mydata]);

  useEffect(() => {
    fetchData();
  }, []);

  /**
   * this function is responsible to call redux action and updating the wordlist
   */
  const fetchData = async () => {
    //call redux action to fetch data
    setLoading(true);
    dispatch(searchWords(page, limit, ""));
    setPage(page + 1);
    setData(mydata.wordReducer.words);
    setLoading(false);
  };

  /**
   * this function is responsible to send added word Asynchronously in backend and fetch the word from oxford api
   * and cacheing for future usage
   * @param {Object} values
   * @param {Function} resetForm
   */
  const addNewWord = (values, resetForm) => {
    setSaveLoading(true);
    dispatch(saveNewWord({ text: values.name }));
    setSaveLoading(false);
    setMessage("Saved Successfully");
    setOpen(true);
    setOpenPopupForm(false);
  };

  /**
   * This function is responsible for opening popup to show clicked word all the details
   * @param {Object} data
   */
  const openInPopup = (data) => {
    setSelectedData(data);
    setOpenPopup(true);
  };

  /**
   * This function is responsible for opening popup to show form to add a new word
   *
   */
  const openInPopupForm = () => {
    setOpenPopupForm(true);
  };

  /**
   * reseting the page to 0 and calling redux action to fetch words with search query
   */
  const searching = (query) => {
    setPage(0);
    dispatch(searchWords(page, limit, `text=${query}`));
  };

  return (
    <div className={classes.root}>
      {/* searching component start */}
      <SearchBox searching={searching} />
      {/* searching component end */}
      {/* infinite list component start */}
      <InfiniteList
        openInPopup={openInPopup}
        data={data}
        fetchData={fetchData}
        hasMore={hasMore}
        loading={loading}
      />
      {/* infinite list component end */}

      {/* Floating Button For Adding new Word start */}
      <Fab
        color="primary"
        aria-label="add"
        className={classes.fab}
        onClick={() => openInPopupForm()}
      >
        <AddIcon />
      </Fab>
      {/* Floating Button For Adding new Word end */}
      {/* Pop up to open Word Detail Component start */}

      <Popup
        title="Word Details"
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
      >
        <WordDetails word={selecetdData} />
      </Popup>
      {/* Pop up to open Word Detail Component end */}
      {/* Pop up to open add word form Component start */}

      <Popup
        title="Add Word"
        openPopup={openPopupForm}
        setOpenPopup={setOpenPopupForm}
      >
        <NewWord addNewWord={addNewWord} loading={saveLoading} />
      </Popup>
      {/* Pop up to open add word form Component start */}

      {/* Nodata & AlertMessage Component start */}
      <NoData />
      <AlertMessage open={open} handleClose={handleClose} message={message} />
      {/* Nodata & AlertMessage Component end */}
    </div>
  );
};
