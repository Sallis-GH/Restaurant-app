import routes from './src/app.js';
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import * as dotenv from 'dotenv';
import fileUpload from 'express-fileupload';
dotenv.config();

const PORT = process.env.PORT || 8080;
const HOST = process.env.HOST || 'localhost';

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.json());
app.use(cors());
app.use(fileUpload());

app.use('/api', routes);

app.listen(PORT, HOST, () => {
  console.log(`Server is running on port: http://${HOST}:${PORT}/ `);
});

export default app;