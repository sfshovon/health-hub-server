const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.qujfvjg.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
  try {
    client.connect();
    const appointmentOptionCollection =  client.db('healthHub').collection('appointmentOptions');

    app.get('/appointmentOptions', async(req, res) => {
      const query = {};
      const options = await appointmentOptionCollection.find(query).toArray();
      res.send(options);
    })
      
  }

  finally {
    await client.close();
  }
}
run().catch(console.log);

app.get('/', async (req, res) => {
  res.send("Health Hub server is running")
})

app.listen(PORT, () => {
  console.log(`Health Hub server is running at http://localhost:${PORT}`)
})