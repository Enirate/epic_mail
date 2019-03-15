import express from 'express';
import cors from 'cors';
import path from 'path';
import morgan from 'morgan';
import bodyParser from'body-parser';
import routes from './routes/v1';

// const messages = require('../routes/message')

const app = express();


app.use(morgan('dev'));
app.use(cors());
app.use(bodyParser.json());

// app.use('/api/v1',messages);
app.use('/', routes);

// const PORT = process.env.PORT || 8080;

const port =  8080;
 const server = app.listen(port, () => {
  console.log(`Server Started at Port: ${port}`);
});

export default server;