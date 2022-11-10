const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
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

async function run(){

    try{
        const serviceCollection = client.db('Advisor').collection('services');
        const orderCollection = client.db('Advisor').collection('orders')


        app.get('/services', async(req,res)=>{
            const query = {}
            const cursor = serviceCollection.find(query)
            const services = await cursor.toArray();
            res.send(services);

        });

        app.get('/services/:id', async(req,res)=>{
          const id = req.params.id;
          const query = {_id:ObjectId(id)};
          const service = await serviceCollection.findOne(query);
          res.send(service)


        })


        //orders api

        app.post('/orders',async(req,res)=>{
          const order =req.body;
          const result = await orderCollection.insertOne(order);
          res.send(result)
        })




    }
    finally{

    }

}

run().catch(err =>console.error(err));

