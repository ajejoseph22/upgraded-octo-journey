import axios from "axios";
import { apiUrl } from "../util/constants";

export const getQuestions = async () => {
  return (await axios.get(`${apiUrl}/questions`)).data;
};
