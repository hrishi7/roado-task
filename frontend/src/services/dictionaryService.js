import axios from "axios";
import { apiEndpoint } from "./proxy";

export const addNewWord = async (data) => {
  try {
    let url = `${apiEndpoint}/api/v1/words`;
    let result = await axios.post(data);
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
