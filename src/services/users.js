import axios from "axios";
import { apiUrl } from "../util/constants";

export const getUsers = async () => {
  return (await axios.get(`${apiUrl}/users`)).data;
};
