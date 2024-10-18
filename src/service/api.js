import axios from "axios";
// Base da url: https://api.themoviedb.org/3/

//URL DA API:

const api = axios.create({
  baseURL: "https://api.themoviedb.org/3/",
});

export default api;
