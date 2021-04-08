import axios from "axios";
import { apiEndpoint } from "../proxy";

export const addNewWord = async (data) => {
  try {
    let url = `${apiEndpoint}/api/v1/words`;
    let result = await axios.post(url,data);
    return {
      success: true,
      data: result.data,
    };
  } catch (error) {
    return {
      success: false,
      data: [],
      message: "Server error while posting data",
    };
  }
};

export const getWords = async (page,limit,query) => {
  try {
    let url = `${apiEndpoint}/api/v1/words/page/${page}/limit/${limit}?${query}`;
    let result = await axios.get(url);
    return {
      success: true,
      data: result.data,
    };
  } catch (error) {
    return {
      success: false,
      data: [],
      message: "Server error while posting data",
    };
  }
};
