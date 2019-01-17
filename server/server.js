import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import { dbUser, dbPwd, dbHost, dbPort, dbName } from 'src/config/index.js';
import './models/article';
import article from './routes/article';

const DB_URI = `mongodb://${dbUser}:${dbPwd}@${dbHost}:${dbPort}/${dbName}`;
mongoose.connect(DB_URI, {useNewUrlParser: true}).then(() => {
  console.log('==>DB is connected');
}, (err) => {
  throw (err);
});

const port = 8030;
const app = express();

app.use(cors({
  credentials: true,
  origin: 'http://localhost:3000'
}));
app.use(bodyParser.json());
app.use(express.static('build'));
app.use('/article', article);

app.listen(port, () => {
  console.log('==>Server is running on port %s', port);
});