const connectToMongo=require('./db');
const express = require('express')
var cors=require('cors');
const app = express()
connectToMongo();
// respond with "hello world" when a GET request is made to the homepage
app.use(cors());
app.use(express.json());

app.use('/api/auth',require('./routes/auth'))
app.use('/api/notes',require('./routes/notes'))




app.post('/', (req, res) => {
  res.send('hello world')
});
app.listen(3001);