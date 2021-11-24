const express = require("express");
const app = express()
const axios = require("axios");
const cors = require('cors')

const PORT = 8080;

app.use(express.json())
app.use(cors())

app.listen(PORT, () => console.log("yo"));

app.get("/get-favorites", (req, resp) => {
  let data = [];
  axios.get("http://jsonbase.com/vibhu/books").then((res) => {
    data = res.data;
    resp.status(200).send(data);
  });
});

app.post("/set-favorites", (req, resp) => {
  let payload = req.body;
  axios.put("http://jsonbase.com/vibhu/books", payload).then((res) => {
    data = res.data;
    resp.status(201).send(data);
  });
});
