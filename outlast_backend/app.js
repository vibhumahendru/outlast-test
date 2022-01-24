const express = require("express");
const app = express()
const axios = require("axios");
const cors = require('cors')

const PORT = 8080;

app.use(express.json())
app.use(cors()) 

app.listen(PORT, () => console.log("server running"));

app.get("/get-favorites", (req, resp) => {
  let data = [];
  let userId = req.body['user_id']

  axios.get(`http://jsonbase.com/${userId}/books`).then((res) => {
    data = res.data;
    resp.status(200).send(data);
  });
});

app.post("/set-favorites", (req, resp) => {
  let payload = req.body;
  let userId = req.body['user_id']

  axios.put(`http://jsonbase.com/${userId}/books`, payload).then((res) => {
    data = res.data;
    resp.status(201).send(data);
  });
});

app.post("/set-favorites", (req, resp) => {
  let payload = req.body;
  axios.put("http://jsonbase.com/vibhu/books", payload).then((res) => {
    data = res.data;
    resp.status(201).send(data);
  });
});
