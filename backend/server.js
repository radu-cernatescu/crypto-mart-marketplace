const express = require('express');
import DB from './config/db';
import CORS from './middlewares/cors';
import notFound from './middlewares/notFound';
import error from './middlewares/error';
import { restRouter } from './api';

const app = express();

DB.connect();

app.use(express.json());
app.use(CORS.handleCors);
app.use('/api', restRouter);
app.use(notFound);
app.use(error);

app.listen(process.env.PORT || 80);
