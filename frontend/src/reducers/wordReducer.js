import { ADD_NEW_WORD,SEARCH_ALL_WORD } from "../actions/types";
import isEmpty from '../utils/isEmpty'

    const initialState = {
        words: [],
        error:""
    };
    export default function(state = initialState, action) {
        switch (action.type) {
            case ADD_NEW_WORD:
                if(isEmpty(action.payload)){
                    return {
                        ...state,
                        error:"Server Error while saving word data"
                    };
                }else{
                    return {
                        ...state,
                        error:"",
                        words:[action.payload,...state.words]
                    };
                }
                
            case SEARCH_ALL_WORD:
                if(action.payload.length === 0){
                    return {
                        ...state,
                        // error:"Server Error while fetching words"
                    };
                }else{
                    return {
                        ...state,
                        error:"",
                        words:action.payload
                    };
                }
               
            default:
                return state;
        }
    }
