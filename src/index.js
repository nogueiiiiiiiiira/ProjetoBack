//index

const express = require('express');
const routes = require('./controller/routes');
const app = express();
const PORT = 3001;

const cors = require('cors');

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));

app.use(express.json());
app.use(routes);

app.listen(PORT, () => {
    console.log("Server Already")
})