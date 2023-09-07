import axios from "axios";

const fileName = "fetch.js";

const BASE_URL = "http://localhost:8000/";

const fetch = async (
  method,
  path,
  data,
  params,
  headers,
  cancelToken,
  ...args
) =>
  new Promise(async (resolve, reject) => {
    // Fetch request start
    if (!method) return reject("Method is a required field.");
    if (!path) return reject("Path is a required field.");
    const options = {
      cancelToken,
      method: method.toUpperCase(),
      baseURL: `${BASE_URL}`,
      url: path,
      data: data || {},
      params: params || {},
      timeout: 250000,
      headers: {
        ...headers,
      },
    };
    axios(options)
      .then((response) => {
        console.log(
          "CONTENT",
          `${fileName}` + " Fetch Request onSuccess :",
          response
        );
        resolve(response);
      })
      .catch(async (err) => {
        console.log("ERROR", `${fileName}` + " Fetch Request onError :", err);
        reject(err.response);
      });
  });

export default fetch;
