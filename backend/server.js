const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;


app.use(cors());
app.use(express.json());


const ticketsRouter = require('./routes/tickets');
app.use('/tickets', ticketsRouter);


app.get('/', (req, res) => {
  res.json({ message: 'DeskFlow API is running (in-memory storage)' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log('Using in-memory storage - data will be lost on restart');
});
