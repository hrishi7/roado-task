import {SEARCH_ALL_WORD,ADD_NEW_WORD } from "./types";
import {getWords,addNewWord} from '../services/dictionaryService'

// getting initial products list
export const searchWords  = (page,limit,query)=> async (dispatch) => {
    let result = await getWords(page,limit,query);
    if(result.success){
        dispatch({
            type: SEARCH_ALL_WORD,
            payload: result.data.data
          })
    }else{
        dispatch({
            type: SEARCH_ALL_WORD,
            payload: []
          })
    }
};

// Create product
export const saveNewWord = (data) => async (dispatch) => {
    let result = await addNewWord(data);
    if(result.success){
        dispatch({
            type: ADD_NEW_WORD,
            payload: result.data.data
          })
    }else{
        dispatch({
            type: ADD_NEW_WORD,
            payload: {}
          })
    }
};