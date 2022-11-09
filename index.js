const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion } = require("mongodb");
require("dotenv").config();


const app= express()
const port =process.env.PORT || 4000;


//middle 
app.use(cors());
app.use(express.json());


//basic setup
app.get("/", (req, res) => {
  res.send("sever running");
});

app.listen(port, () => {
  console.log(`running${port}`);
});


//database

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.781yldu.mongodb.net/?retryWrites=true&w=majority`;
console.log(uri)
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});
client.connect((err) => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  client.close();
});
