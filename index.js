const express = require("express");
const cors = require("cors");


const app= express()
const port =process.env.PORT || 4000;


//middle 
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("sever running");
});

app.listen(port, () => {
  console.log(`running${port}`);
});